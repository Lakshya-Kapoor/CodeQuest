from google.cloud import pubsub_v1
from dotenv import load_dotenv
import os
from utils import process_message, connect_db

load_dotenv()

# Connecting to MongoDB
connect_db()

MAX_CONCURRENT = 3
PROJECT = os.getenv("GCP_PROJECT_NAME")
SUBSCRIPTION = os.getenv("GCP_SUBSCRIPTION_NAME")

subscriber = pubsub_v1.SubscriberClient()
subscription_path = subscriber.subscription_path(PROJECT, SUBSCRIPTION)
flow_control = pubsub_v1.types.FlowControl(max_messages=MAX_CONCURRENT) 

# Start the subscriber
future = subscriber.subscribe(subscription_path, callback=process_message, flow_control=flow_control)
print(f"Listening for messages on {subscription_path}...")

try:
    future.result()
except KeyboardInterrupt:
    print("Shutting down...")
    future.cancel()
