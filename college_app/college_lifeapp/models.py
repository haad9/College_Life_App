
from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    """Extended user profile for college students"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    major = models.CharField(max_length=100)
    monthly_budget = models.DecimalField(max_digits=10, decimal_places=2, default=800.00)
    
    def __str__(self):
        return f"{self.user.username}'s profile"
    
    @property
    def total_spent(self):
        """Calculate total expenses for current month"""
        return sum(expense.amount for expense in self.expenses.all())


class Routine(models.Model):
    """Student routines/schedule"""
    CATEGORY_CHOICES = [
        ('class', 'Class'),
        ('gym', 'Gym'),
        ('study', 'Study'),
        ('social', 'Social'),
    ]
    
    DAYS_CHOICES = [
        ('Mon', 'Monday'),
        ('Tue', 'Tuesday'),
        ('Wed', 'Wednesday'),
        ('Thu', 'Thursday'),
        ('Fri', 'Friday'),
        ('Sat', 'Saturday'),
        ('Sun', 'Sunday'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='routines')
    title = models.CharField(max_length=200)
    time = models.TimeField()
    days = models.JSONField(default=list)  # Store list of days
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['time']
    
    def __str__(self):
        return f"{self.title} - {self.time}"


class Expense(models.Model):
    """Budget tracking expenses"""
    CATEGORY_CHOICES = [
        ('Food', 'Food'),
        ('Transport', 'Transport'),
        ('Books', 'Books'),
        ('Entertainment', 'Entertainment'),
        ('Other', 'Other'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='expenses')
    item = models.CharField(max_length=200)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    date = models.DateField(auto_now_add=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-date', '-created_at']
    
    def __str__(self):
        return f"{self.item} - ${self.amount}"


class Event(models.Model):
    """Social events and activities"""
    CATEGORY_CHOICES = [
        ('Academic', 'Academic'),
        ('Career', 'Career'),
        ('Sports', 'Sports'),
        ('Cultural', 'Cultural'),
    ]
    
    TIMING_CHOICES = [
        ('today', 'Today'),
        ('upcoming', 'Upcoming'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='events')
    title = models.CharField(max_length=200)
    date = models.DateField()
    time = models.CharField(max_length=50)
    location = models.CharField(max_length=200)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    rsvped = models.BooleanField(default=False)
    is_favorite = models.BooleanField(default=False)
    timing = models.CharField(max_length=20, choices=TIMING_CHOICES, default='upcoming')
    attendees = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['date']
    
    def __str__(self):
        return self.title


class Goal(models.Model):
    """Career planning goals"""
    CATEGORY_CHOICES = [
        ('Internships', 'Internships'),
        ('Job Applications', 'Job Applications'),
        ('Interviews', 'Interviews'),
        ('Networking', 'Networking'),
    ]
    
    STATUS_CHOICES = [
        ('current', 'Current'),
        ('pending', 'Pending'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='goals')
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    deadline = models.DateField()
    progress = models.IntegerField(default=0)  # 0-100
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='current')
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['deadline']
    
    def __str__(self):
        return self.title

