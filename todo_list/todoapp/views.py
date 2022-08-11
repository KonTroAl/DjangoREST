from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Project, ToDo
from .serializers import ProjectHyperlinkedModelSerializer, ToDoModelSerializer

# Create your views here.

class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectHyperlinkedModelSerializer

class ToDoModelViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoModelSerializer
