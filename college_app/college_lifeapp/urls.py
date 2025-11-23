from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserProfileViewSet,RoutineViewSet,ExpenseViewSet,EventViewSet,GoalViewSet

router = DefaultRouter()
router.register(r'profiles', UserProfileViewSet, basename='profile')
router.register(r'routines', RoutineViewSet, basename='routine')
router.register(r'expenses', ExpenseViewSet, basename='expense')
router.register(r'events', EventViewSet, basename='event')
router.register(r'goals', GoalViewSet, basename='goal')

urlpatterns = [
    path('api/', include(router.urls)),
]
