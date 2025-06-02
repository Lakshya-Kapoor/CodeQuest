from models import SubmissionModel
from utils import GCSWrapper
import os
import zipfile

def process_message(message):
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
        folder = f"submissions/{submission_id}"
        os.makedirs(folder, exist_ok=True)

        # Fetch submission code from GCS
        blob_name = f"submissions/{submission_id}"
        download_path = os.path.join(folder, "code")
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
        # Update submission metadata on the basis of the result
        message.ack()
        print(f"Processed {submission_id} successfully.")
    except Exception as e:
        print(f"Error processing {submission_id}:", e)
        message.nack()