from django.contrib import admin
from .models import UserProfile, Routine, Expense, Event, Goal

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'major', 'monthly_budget', 'total_spent']
    search_fields = ['user__username', 'major']


@admin.register(Routine)
class RoutineAdmin(admin.ModelAdmin):
    list_display = ['title', 'user', 'time', 'category', 'created_at']
    list_filter = ['category', 'days']
    search_fields = ['title', 'user__username']


@admin.register(Expense)
class ExpenseAdmin(admin.ModelAdmin):
    list_display = ['item', 'user', 'amount', 'category', 'date']
    list_filter = ['category', 'date']
    search_fields = ['item', 'user__username']


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ['title', 'user', 'date', 'category', 'rsvped']
    list_filter = ['category', 'timing', 'rsvped']
    search_fields = ['title', 'location']


@admin.register(Goal)
class GoalAdmin(admin.ModelAdmin):
    list_display = ['title', 'user', 'category', 'progress', 'completed', 'deadline']
    list_filter = ['category', 'status', 'completed']
    search_fields = ['title', 'description']


