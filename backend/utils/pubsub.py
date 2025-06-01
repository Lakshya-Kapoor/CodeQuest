from google.cloud import pubsub_v1
import os
import asyncio
from typing import Awaitable

class PubSubError(Exception):
    pass

def async_wrap(func):
    async def wrapper(*args, **kwargs):
        return await asyncio.to_thread(func, *args, **kwargs)
    return wrapper

@async_wrap
def pubsub_publish(message: bytes, **custom_attributes) -> Awaitable[None]:
    try:
        publisher = pubsub_v1.PublisherClient()
        topic_name = os.getenv("GOOGLE_PUBSUB_TOPIC_NAME")
        future = publisher.publish(topic_name, message, **custom_attributes)
        future.result()  # Wait for the publish to complete
    except Exception as e:
        print(e)
        raise PubSubError("Failed to publish message to Pub/Sub") from e