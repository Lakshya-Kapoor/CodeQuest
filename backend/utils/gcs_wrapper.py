from google.cloud import storage
from typing import IO, Awaitable
import asyncio

def async_wrap(func):
    async def wrapper(*args, **kwargs):
        return await asyncio.to_thread(func, *args, **kwargs)
    return wrapper

class GCSError(Exception):
    pass

class GCSWrapper:

    @staticmethod
    @async_wrap
    def upload_file(blobName: str, file: 'IO[bytes]') -> Awaitable[None]:
        try:
            client = storage.Client()
            bucket = client.bucket("trial-bucket-213")
            blob = bucket.blob(blobName)
            blob.upload_from_file(file, rewind=True)
        except Exception as e:
            print(e)
            raise GCSError("Failed to upload file")

    @staticmethod
    @async_wrap
    def delete_file(blobName: str) -> Awaitable[None]:
        try:
            client = storage.Client()
            bucket = client.bucket("trial-bucket-213")
            blob = bucket.blob(blobName)
            blob.delete()
        except Exception as e:
            print(e)
            raise GCSError("Failed to delete file")
