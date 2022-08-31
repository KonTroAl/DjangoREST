from django.db import models
from usersapp.models import User

# Create your models here.

class Project(models.Model):
    project_name = models.CharField(max_length=32, unique=True)
    repo_link = models.URLField(blank=True)
    users = models.ManyToManyField(User)

    def __str__(self):
        return self.project_name


class ToDo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    text = models.TextField()
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    data = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

