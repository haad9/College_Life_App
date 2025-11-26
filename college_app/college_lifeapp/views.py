from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from django.db import DatabaseError, transaction
from django.core.exceptions import ValidationError
from .models import UserProfile, Routine, User, Event, Expense, Goal
from .serializers import UserProfileSerializer, RoutineSerializer, ExpenseSerializer, EventSerializer, GoalSerializer
from django.views.generic import TemplateView
from .db_utils import check_database_connection, get_database_info, safe_db_operation
import logging

logger = logging.getLogger(__name__)

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [AllowAny]  # Change to IsAuthenticated in production
    
    def list(self, request, *args, **kwargs):
        """List all user profiles with database error handling"""
        try:
            return super().list(request, *args, **kwargs)
        except DatabaseError as e:
            logger.error(f"Database error in UserProfileViewSet.list: {str(e)}")
            return Response(
                {'error': 'Database error occurred while fetching profiles'},
                status=status.HTTP_503_SERVICE_UNAVAILABLE
            )
    
    def retrieve(self, request, *args, **kwargs):
        """Retrieve a user profile with database error handling"""
        try:
            return super().retrieve(request, *args, **kwargs)
        except DatabaseError as e:
            logger.error(f"Database error in UserProfileViewSet.retrieve: {str(e)}")
            return Response(
                {'error': 'Database error occurred while fetching profile'},
                status=status.HTTP_503_SERVICE_UNAVAILABLE
            )
    
    def create(self, request, *args, **kwargs):
        """Create a user profile with database error handling"""
        try:
            return super().create(request, *args, **kwargs)
        except (DatabaseError, ValidationError) as e:
            logger.error(f"Database error in UserProfileViewSet.create: {str(e)}")
            return Response(
                {'error': 'Database error occurred while creating profile'},
                status=status.HTTP_503_SERVICE_UNAVAILABLE
            )
    
    @action(detail=False, methods=['get'])
    def current(self, request):
        """Get current user's profile"""
        try:
            # In production, use request.user
            profile = safe_db_operation(
                lambda: self.queryset.first(),
                None
            )
            if profile:
                serializer = self.get_serializer(profile)
                return Response(serializer.data)
            return Response({'error': 'Profile not found'}, status=404)
        except Exception as e:
            logger.error(f"Error in current profile: {str(e)}")
            return Response(
                {'error': 'Error fetching current profile'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class RoutineViewSet(viewsets.ModelViewSet):
    queryset = Routine.objects.all()
    serializer_class = RoutineSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        """Filter routines by user (in production)"""
        try:
            # return self.queryset.filter(user=self.request.user)
            return self.queryset  # For demo purposes
        except DatabaseError as e:
            logger.error(f"Database error in RoutineViewSet.get_queryset: {str(e)}")
            return Routine.objects.none()
    
    def perform_create(self, serializer):
        """Assign routine to current user"""
        try:
            # serializer.save(user=self.request.user)
            user = safe_db_operation(
                lambda: User.objects.first(),
                None
            )
            if user:
                serializer.save(user=user)
            else:
                raise ValidationError("No user found in database")
        except (DatabaseError, ValidationError) as e:
            logger.error(f"Database error in RoutineViewSet.perform_create: {str(e)}")
            raise
    
    @action(detail=False, methods=['get'])
    def by_day(self, request):
        """Get routines grouped by day"""
        try:
            day = request.query_params.get('day')
            if day:
                routines = safe_db_operation(
                    lambda: self.get_queryset().filter(days__contains=day),
                    Routine.objects.none()
                )
                serializer = self.get_serializer(routines, many=True)
                return Response(serializer.data)
            return Response({'error': 'Day parameter required'}, status=400)
        except Exception as e:
            logger.error(f"Error in by_day: {str(e)}")
            return Response(
                {'error': 'Error fetching routines by day'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class ExpenseViewSet(viewsets.ModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        """Filter expenses by user"""
        try:
            return self.queryset  # For demo
        except DatabaseError as e:
            logger.error(f"Database error in ExpenseViewSet.get_queryset: {str(e)}")
            return Expense.objects.none()
    
    def perform_create(self, serializer):
        try:
            user = safe_db_operation(
                lambda: User.objects.first(),
                None
            )
            if user:
                serializer.save(user=user)
            else:
                raise ValidationError("No user found in database")
        except (DatabaseError, ValidationError) as e:
            logger.error(f"Database error in ExpenseViewSet.perform_create: {str(e)}")
            raise
    
    @action(detail=False, methods=['get'])
    def summary(self, request):
        """Get expense summary by category"""
        try:
            expenses = safe_db_operation(
                lambda: list(self.get_queryset()),
                []
            )
            summary = {}
            total = 0
            
            for expense in expenses:
                category = expense.category
                if category not in summary:
                    summary[category] = 0
                summary[category] += float(expense.amount)
                total += float(expense.amount)
            
            return Response({
                'by_category': summary,
                'total': total
            })
        except Exception as e:
            logger.error(f"Error in expense summary: {str(e)}")
            return Response(
                {'error': 'Error calculating expense summary'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        try:
            return self.queryset
        except DatabaseError as e:
            logger.error(f"Database error in EventViewSet.get_queryset: {str(e)}")
            return Event.objects.none()
    
    def perform_create(self, serializer):
        try:
            user = safe_db_operation(
                lambda: User.objects.first(),
                None
            )
            if user:
                serializer.save(user=user)
            else:
                raise ValidationError("No user found in database")
        except (DatabaseError, ValidationError) as e:
            logger.error(f"Database error in EventViewSet.perform_create: {str(e)}")
            raise
    
    @action(detail=True, methods=['post'])
    def toggle_rsvp(self, request, pk=None):
        """Toggle RSVP status for an event"""
        try:
            event = self.get_object()
            event.rsvped = not event.rsvped
            event.save()
            serializer = self.get_serializer(event)
            return Response(serializer.data)
        except (DatabaseError, ValidationError) as e:
            logger.error(f"Database error in toggle_rsvp: {str(e)}")
            return Response(
                {'error': 'Error updating RSVP status'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    @action(detail=True, methods=['post'])
    def toggle_favorite(self, request, pk=None):
        """Toggle favorite status for an event"""
        try:
            event = self.get_object()
            event.is_favorite = not event.is_favorite
            event.save()
            serializer = self.get_serializer(event)
            return Response(serializer.data)
        except (DatabaseError, ValidationError) as e:
            logger.error(f"Database error in toggle_favorite: {str(e)}")
            return Response(
                {'error': 'Error updating favorite status'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class GoalViewSet(viewsets.ModelViewSet):
    queryset = Goal.objects.all()
    serializer_class = GoalSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        try:
            return self.queryset
        except DatabaseError as e:
            logger.error(f"Database error in GoalViewSet.get_queryset: {str(e)}")
            return Goal.objects.none()
    
    def perform_create(self, serializer):
        try:
            user = safe_db_operation(
                lambda: User.objects.first(),
                None
            )
            if user:
                serializer.save(user=user)
            else:
                raise ValidationError("No user found in database")
        except (DatabaseError, ValidationError) as e:
            logger.error(f"Database error in GoalViewSet.perform_create: {str(e)}")
            raise
    
    @action(detail=True, methods=['patch'])
    def update_progress(self, request, pk=None):
        """Update goal progress"""
        try:
            goal = self.get_object()
            progress = request.data.get('progress')
            
            if progress is not None:
                goal.progress = int(progress)
                if goal.progress >= 100:
                    goal.completed = True
                else:
                    goal.completed = False
                goal.save()
                
            serializer = self.get_serializer(goal)
            return Response(serializer.data)
        except (DatabaseError, ValidationError) as e:
            logger.error(f"Database error in update_progress: {str(e)}")
            return Response(
                {'error': 'Error updating goal progress'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    @action(detail=True, methods=['post'])
    def toggle_complete(self, request, pk=None):
        """Toggle completion status"""
        try:
            goal = self.get_object()
            goal.completed = not goal.completed
            goal.progress = 100 if goal.completed else 0
            goal.save()
            serializer = self.get_serializer(goal)
            return Response(serializer.data)
        except (DatabaseError, ValidationError) as e:
            logger.error(f"Database error in toggle_complete: {str(e)}")
            return Response(
                {'error': 'Error toggling goal completion'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    @action(detail=False, methods=['get'])
    def by_category(self, request):
        """Get goals filtered by category"""
        try:
            category = request.query_params.get('category')
            status_filter = request.query_params.get('status')
            
            goals = self.get_queryset()
            
            if category:
                goals = goals.filter(category=category)
            if status_filter:
                goals = goals.filter(status=status_filter)
            
            serializer = self.get_serializer(goals, many=True)
            return Response(serializer.data)
        except (DatabaseError, ValidationError) as e:
            logger.error(f"Database error in by_category: {str(e)}")
            return Response(
                {'error': 'Error fetching goals by category'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class DatabaseHealthView(APIView):
    """API endpoint to check database health and connection status"""
    permission_classes = [AllowAny]
    
    def get(self, request):
        """Get database health status"""
        is_connected, error = check_database_connection()
        db_info = get_database_info()
        
        response_data = {
            'status': 'healthy' if is_connected else 'unhealthy',
            'connected': is_connected,
            'database_info': db_info,
        }
        
        if error:
            response_data['error'] = error
        
        status_code = status.HTTP_200_OK if is_connected else status.HTTP_503_SERVICE_UNAVAILABLE
        return Response(response_data, status=status_code)


class SPAView(TemplateView):
    """Serve the frontend Single Page Application index."""
    template_name = "frontend/index.html"
