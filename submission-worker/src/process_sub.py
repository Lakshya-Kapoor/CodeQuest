def process_message(message):
    try:
        submission_id = message.data.decode()
        # Process message
        # Fetch submission metadata from database
        # Fetch submission code from GCS
        # Build and run appropriate Docker image
        # Update submission metadata on the basis of the result
        message.ack()
    except Exception as e:
        print(f"Error processing {submission_id}:", e)
        message.nack()