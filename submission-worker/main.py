from concurrent.futures import ThreadPoolExecutor
from google.cloud import pubsub_v1
from dotenv import load_dotenv
import os
from src.process_sub import process_message

load_dotenv()

MAX_CONCURRENT = 1
PROJECT = os.getenv("PROJECT_NAME")
SUBSCRIPTION = os.getenv("SUBSCRIPTION_NAME")

subscriber = pubsub_v1.SubscriberClient()
subscription_path = subscriber.subscription_path(PROJECT, SUBSCRIPTION)
flow_control = pubsub_v1.types.FlowControl(max_messages=MAX_CONCURRENT) # To limit how many messages are pulled


executor = ThreadPoolExecutor(max_workers=MAX_CONCURRENT)
def callback(message):
    # Offload message to the thread pool
    executor.submit(process_message, message)

# Start the subscriber
future = subscriber.subscribe(subscription_path, callback=callback, flow_control=flow_control)
print(f"Listening for messages on {subscription_path}...")

try:
    future.result()
except KeyboardInterrupt:
    print("Shutting down...")
    future.cancel()
