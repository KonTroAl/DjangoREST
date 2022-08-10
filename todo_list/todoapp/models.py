from django.db import models
from usersapp.models import User

# Create your models here.

class Project(models.Model):
    name = models.CharField(max_length=64),
    repo_link = models.URLField(max_length=256, unique=True),
    users = models.ManyToManyField(User)


class ToDo(models.Model):
    project = models.OneToOneField(Project, on_delete=models.CASCADE)
    text = models.TextField()
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    data = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

