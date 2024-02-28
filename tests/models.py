from django.db import models
from main.models import Group
from django.contrib.auth.models import User


class Test(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    duration_minutes = models.IntegerField(default=60)
    teacher = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    groups = models.ManyToManyField(Group, related_name='tests')
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()


class Question(models.Model):
    test = models.ForeignKey(Test, on_delete=models.CASCADE)
    text = models.TextField(max_length=300)
    image = models.ImageField(upload_to='question_images', blank=True, null=True)
    explanation = models.TextField(blank=True, null=True)
    points = models.IntegerField(default=1)


class MultipleChoiceOption(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice = models.CharField(max_length=1, choices=[('A', 'A'), ('B', 'B'), ('C', 'C'), ('D', 'D')])
    text = models.CharField(max_length=255)
    is_correct = models.BooleanField(default=False)


class TextAnswer(models.Model):
    question = models.OneToOneField(Question, on_delete=models.CASCADE, primary_key=True)
    expected_answer = models.TextField()
