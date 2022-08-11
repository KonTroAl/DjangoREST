from django.db import models
from usersapp.models import User

# Create your models here.

class Project(models.Model):
    project_name = models.CharField(max_length=150, default='temp')
    repo_link = models.URLField(max_length=256, default='repo_link')
    users = models.ManyToManyField(User)

    def __str__(self):
        return self.project_name


class ToDo(models.Model):
    project = models.ManyToManyField(Project)
    text = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    data = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

