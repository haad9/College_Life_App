from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import UserProfile,Routine,User,Event,Expense,Goal
from.serializers import UserProfileSerializer,RoutineSerializer,ExpenseSerializer,EventSerializer,GoalSerializer
from django.views.generic import TemplateView

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [AllowAny]  # Change to IsAuthenticated in production
    
    @action(detail=False, methods=['get'])
    def current(self, request):
        """Get current user's profile"""
        # In production, use request.user
        profile = self.queryset.first()  # For demo purposes
        if profile:
            serializer = self.get_serializer(profile)
            return Response(serializer.data)
        return Response({'error': 'Profile not found'}, status=404)


class RoutineViewSet(viewsets.ModelViewSet):
    queryset = Routine.objects.all()
    serializer_class = RoutineSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        """Filter routines by user (in production)"""
        # return self.queryset.filter(user=self.request.user)
        return self.queryset  # For demo purposes
    
    def perform_create(self, serializer):
        """Assign routine to current user"""
        # serializer.save(user=self.request.user)
        serializer.save(user=User.objects.first())  # For demo purposes
    
    @action(detail=False, methods=['get'])
    def by_day(self, request):
        """Get routines grouped by day"""
        day = request.query_params.get('day')
        if day:
            routines = self.get_queryset().filter(days__contains=day)
            serializer = self.get_serializer(routines, many=True)
            return Response(serializer.data)
        return Response({'error': 'Day parameter required'}, status=400)


class ExpenseViewSet(viewsets.ModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        """Filter expenses by user"""
        return self.queryset  # For demo
    
    def perform_create(self, serializer):
        serializer.save(user=User.objects.first())
    
    @action(detail=False, methods=['get'])
    def summary(self, request):
        """Get expense summary by category"""
        expenses = self.get_queryset()
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


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        return self.queryset
    
    def perform_create(self, serializer):
        serializer.save(user=User.objects.first())
    
    @action(detail=True, methods=['post'])
    def toggle_rsvp(self, request, pk=None):
        """Toggle RSVP status for an event"""
        event = self.get_object()
        event.rsvped = not event.rsvped
        event.save()
        serializer = self.get_serializer(event)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def toggle_favorite(self, request, pk=None):
        """Toggle favorite status for an event"""
        event = self.get_object()
        event.is_favorite = not event.is_favorite
        event.save()
        serializer = self.get_serializer(event)
        return Response(serializer.data)


class GoalViewSet(viewsets.ModelViewSet):
    queryset = Goal.objects.all()
    serializer_class = GoalSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        return self.queryset
    
    def perform_create(self, serializer):
        serializer.save(user=User.objects.first())
    
    @action(detail=True, methods=['patch'])
    def update_progress(self, request, pk=None):
        """Update goal progress"""
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
    
    @action(detail=True, methods=['post'])
    def toggle_complete(self, request, pk=None):
        """Toggle completion status"""
        goal = self.get_object()
        goal.completed = not goal.completed
        goal.progress = 100 if goal.completed else 0
        goal.save()
        serializer = self.get_serializer(goal)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def by_category(self, request):
        """Get goals filtered by category"""
        category = request.query_params.get('category')
        status_filter = request.query_params.get('status')
        
        goals = self.get_queryset()
        
        if category:
            goals = goals.filter(category=category)
        if status_filter:
            goals = goals.filter(status=status_filter)
        
        serializer = self.get_serializer(goals, many=True)
        return Response(serializer.data)


class SPAView(TemplateView):
    """Serve the frontend Single Page Application index."""
    template_name = "frontend/index.html"
