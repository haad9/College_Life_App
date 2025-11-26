from django.apps import AppConfig
import logging

logger = logging.getLogger(__name__)


class CollegeLifeappConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'college_lifeapp'
    
    def ready(self):
        """Initialize database connection check when app is ready"""
        try:
            from .db_utils import ensure_database_ready
            ensure_database_ready()
        except Exception as e:
            logger.warning(f"Could not verify database connection on startup: {str(e)}")
            # Don't raise exception here to allow app to start even if DB check fails
