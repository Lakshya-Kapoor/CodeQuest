from google.cloud import storage
from typing import IO
import os

class GCSError(Exception):
    pass

class GCSWrapper:

    @staticmethod
    def upload_file(blob_name: str, file: 'IO[bytes]') -> None:
        try:
            client = storage.Client()
            bucket = client.bucket(os.getenv("GCP_BUCKET_NAME"))
            blob = bucket.blob(blob_name)
            blob.upload_from_file(file, rewind=True)
        except Exception as e:
            print(e)
            raise GCSError("Failed to upload file")

    @staticmethod
    def delete_file(blob_name: str) -> None:
        try:
            client = storage.Client()
            bucket = client.bucket(os.getenv("GCP_BUCKET_NAME"))
            blob = bucket.blob(blob_name)
            blob.delete()
        except Exception as e:
            print(e)
            raise GCSError("Failed to delete file")

    @staticmethod
    def read_file(blob_name: str) -> str:
        try:
            client = storage.Client()
            bucket = client.bucket(os.getenv("GCP_BUCKET_NAME"))
            blob = bucket.blob(blob_name)
            return blob.download_as_text()
        except Exception as e:
            print(e)
            raise GCSError("Failed to read file")

    @staticmethod
    def download_file(blob_name: str, download_path: str) -> str:
        try:
            client = storage.Client()
            bucket = client.bucket(os.getenv("GCP_BUCKET_NAME"))
            blob = bucket.blob(blob_name)
            blob.download_to_filename(download_path)
        except Exception as e:
            print(e)
            raise GCSError("Failed to download file")