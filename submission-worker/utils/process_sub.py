from models import SubmissionModel
from .gcs_wrapper import GCSWrapper
from .judge import judge_submission
import os
import zipfile
from docker import DockerClient
import shutil

extension = {
    "python": "py",
    "cpp": "cpp",
}

def process_message(message, docker_client: DockerClient):
    try:
        submission_id = message.data.decode()
        print(f"Processing submission {submission_id}...")
        
        # Fetch submission metadata from database
        submission: SubmissionModel = SubmissionModel.objects(id=submission_id).first()
        if submission.status != "pending":
            print(f"Submission {submission_id} already processed")
            message.ack()
            return
        
        # Setting up directory for downloading files
        folder = f"tmp/{submission_id}"
        os.makedirs(folder, exist_ok=True)

        # Fetch submission code from GCS
        blob_name = f"submissions/{submission_id}"
        download_path = os.path.join(folder, f"code.{extension[submission.language]}")
        GCSWrapper.download_file(blob_name, download_path)

        # Fetch problem testcases from GCS
        problem_id = str(submission.problem.id)
        blob_name = f"problems/{problem_id}"
        download_path = os.path.join(folder, "problem.zip")
        GCSWrapper.download_file(blob_name, download_path)

        # Extract the problem.zip into the folder
        with zipfile.ZipFile(download_path, 'r') as zip:
            zip.extractall(folder)

        # Build and run appropriate Docker image
        status = judge_submission(submission, docker_client)
        
        # Update submission metadata on the basis of the result
        if status == "AC":
            submission.status = "accepted"
        elif status == "WA":
            submission.status = "wrong answer"
        elif status == "ER":
            submission.status = "error"
        elif status == "TLE":
            submission.status = "time limit exceeded"
        elif status == "MLE":
            submission.status = "memory limit exceeded"
        submission.save()
        
        message.ack()
        print(f"Processed {submission_id} successfully.")
    except Exception as e:
        print(f"Error processing {submission_id}:", e)
        message.nack()

    finally:
        # Delete the folder created for the submission
        try:
            if os.path.exists(folder):
                shutil.rmtree(folder)
        except Exception as cleanup_error:
            print(f"Error cleaning up folder {folder}:", cleanup_error)
