from app.tasks.celery_app import celery_app

@celery_app.task(bind=True, max_retries=3, name='tasks.process_generation')
def process_generation_task(self, generation_id: str):
    pass

@celery_app.task(name='tasks.retry_generation')
def retry_generation_task(generation_id: str):
    pass
