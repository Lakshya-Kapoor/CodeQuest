from pathlib import Path
from models import SubmissionModel
import docker
from typing import TypedDict, Literal

class ContainerConfig(TypedDict):
    language: Literal["python", "cpp"]
    timeLimit: int
    memoryLimit: int

image = {
    "python": "python-runner",
    "cpp": "cpp-runner",
}

def command(language: str, timeLimit: int) -> str:
    if language == "python":
        return f"timeout {timeLimit}s python3 code.py"
    elif language == "cpp":
        return f"timeout {timeLimit}s g++ code.cpp -o /tmp/code && timeout {timeLimit}s /tmp/code"
    else:
        raise ValueError(f"Unsupported language: {language}")

def judge_testcase(submission_folder:Path, testcase_path: Path, output_path: Path, docker_client: docker.DockerClient, config: ContainerConfig):
    (submission_folder / "input.txt").write_text(testcase_path.read_text())

    mount_path = Path("/home/lakshya-kapoor/Projects/Code-Quest/submission-worker") / submission_folder

    memoryLimit = config["memoryLimit"]
    timeLimit = config["timeLimit"]
    language = config["language"]

    try:
        container = docker_client.containers.run(
            image=image[language],
            command=["sh", "-c", f"{command(language, timeLimit)} < input.txt"],
            volumes={
                str(mount_path): {"bind": "/app", "mode": "ro"}
            },
            network_mode="none",
            mem_limit=f"{memoryLimit}m",
            cpu_quota=100000,
            cpu_period=100000,
            pids_limit=64,
            tty=False,
            stdin_open=True,
            detach=True,
            remove=False,
            stdout=True,
            stderr=True
        )
        
        exit_status = container.wait()
        std_out = container.logs(stderr=False).decode().strip()
        std_err = container.logs(stdout=False).decode().strip()
        expected_output = output_path.read_text().strip()
        container.remove()

        print(container.attrs["State"])
        print(f"Exit Status: {exit_status}")
        print(f"Error: {std_err}")
        print(f"Output: {std_out}")
        print(f"Expected Output: {expected_output}")

        if exit_status["StatusCode"] == 0:
            # Container ran successfully
            if std_out == expected_output:
                status = "AC"
            else:
                status = "WA"
        else:
            status = "ER"
            if exit_status["StatusCode"] == 1:
                status = "ER"
            elif exit_status["StatusCode"] == 124:
                status = "TLE"
            elif exit_status["StatusCode"] == 137:
                status = "MLE"

    except Exception as e:
        print(f"Error occurred: {e}")
        status = "ER"

    return status

def judge_submission(submission: SubmissionModel, docker_client: docker.DockerClient):
    submission_folder = Path(f"tmp/{submission.id}")
    problem_folder = submission_folder / "problem"
    input_folder = problem_folder / "inputs"
    output_folder = problem_folder / "outputs"

    # Extract the problem timeLimit and memory limit from the submission
    config: ContainerConfig = {
        "language": submission.language,
        "timeLimit": submission.problem.timeLimit,
        "memoryLimit": submission.problem.memoryLimit
    }

    for testcase_path in input_folder.glob("*"):
        if testcase_path.is_file():
            output_path = output_folder / testcase_path.name
            status = judge_testcase(submission_folder, testcase_path, output_path, docker_client, config)
            if status != "AC":
                return status
    return "AC"  # All test cases passed