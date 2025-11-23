from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile,Routine,Expense,Goal,Event


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    total_spent = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    
    class Meta:
        model = UserProfile
        fields = ['id', 'user', 'major', 'monthly_budget', 'total_spent']


class RoutineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Routine
        fields = ['id', 'title', 'time', 'days', 'category', 'created_at']
        read_only_fields = ['id', 'created_at']


class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = ['id', 'item', 'amount', 'category', 'date', 'created_at']
        read_only_fields = ['id', 'date', 'created_at']


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'title', 'date', 'time', 'location', 'category', 
                  'rsvped', 'is_favorite', 'timing', 'attendees', 'created_at']
        read_only_fields = ['id', 'created_at']


class GoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goal
        fields = ['id', 'title', 'description', 'deadline', 'progress', 
                  'category', 'status', 'completed', 'created_at']
        read_only_fields = ['id', 'created_at']