"""
Database utility functions for the College Life App.
Provides connection checking, health monitoring, and database operations helpers.
"""
from django.db import connection, transaction
from django.db import DatabaseError
from django.conf import settings
import logging

logger = logging.getLogger(__name__)


def check_database_connection():
    """
    Check if the database connection is working.
    
    Returns:
        tuple: (is_connected: bool, error_message: str or None)
    """
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
            cursor.fetchone()
        return True, None
    except DatabaseError as e:
        error_msg = f"Database connection error: {str(e)}"
        logger.error(error_msg)
        return False, error_msg
    except Exception as e:
        error_msg = f"Unexpected error checking database: {str(e)}"
        logger.error(error_msg)
        return False, error_msg


def get_database_info():
    """
    Get information about the current database configuration.
    
    Returns:
        dict: Database configuration information
    """
    db_config = settings.DATABASES.get('default', {})
    return {
        'engine': db_config.get('ENGINE', 'Unknown'),
        'name': db_config.get('NAME', 'Unknown'),
        'host': db_config.get('HOST', 'N/A'),
        'port': db_config.get('PORT', 'N/A'),
    }


def ensure_database_ready():
    """
    Ensure the database is ready for operations.
    Checks connection and logs database info.
    
    Returns:
        bool: True if database is ready, False otherwise
    """
    is_connected, error = check_database_connection()
    if not is_connected:
        logger.error(f"Database not ready: {error}")
        return False
    
    db_info = get_database_info()
    logger.info(f"Database connected: {db_info['engine']} - {db_info['name']}")
    return True


def safe_db_operation(operation, default_return=None):
    """
    Safely execute a database operation with error handling.
    
    Args:
        operation: Callable that performs the database operation
        default_return: Value to return if operation fails
        
    Returns:
        Result of operation or default_return if error occurs
    """
    try:
        return operation()
    except DatabaseError as e:
        logger.error(f"Database operation error: {str(e)}")
        return default_return
    except Exception as e:
        logger.error(f"Unexpected error in database operation: {str(e)}")
        return default_return

