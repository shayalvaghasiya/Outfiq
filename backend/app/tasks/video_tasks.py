from app.tasks.celery_app import celery_app

@celery_app.task(bind=True, max_retries=2, name='tasks.process_video')
def process_video_task(self, video_id: str):
    pass
