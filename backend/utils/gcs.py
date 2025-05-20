from google.cloud import storage
from typing import IO

class GCSError(Exception):
    pass

class GCSWrapper:

    @staticmethod
    def upload_file(blobName: str, file: 'IO[bytes]'):
        try:
            client = storage.Client()
            bucket = client.bucket("trial-bucket-213")
            blob = bucket.blob(blobName)
            blob.upload_from_file(file, rewind=True)
        except Exception as e:
            print(e)
            raise GCSError("Failed to upload file")

    @staticmethod
    def delete_file(blobName: str):
        try:
            client = storage.Client()
            bucket = client.bucket("trial-bucket-213")
            blob = bucket.blob(blobName)
            blob.delete()
        except Exception as e:
            print(e)
            raise GCSError("Failed to delete file")
