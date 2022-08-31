from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.pagination import LimitOffsetPagination
from .models import Project, ToDo
from .serializers import ProjectModelSerializer, ToDoModelSerializer, ToDoModelSerializerBase
from rest_framework import permissions


# Create your views here.

# Model == Project
class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class ProjectModelViewSet(ModelViewSet):
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectLimitOffsetPagination

    def get_queryset(self):
        project_name = self.request.query_params.get('project_name', '')
        projects = Project.objects.all()
        if project_name:
            projects = projects.filter(project_name__contains=project_name)
        return projects



# Model == To_Do

class ToDoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class ToDoModelViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoModelSerializer
    pagination_class = ToDoLimitOffsetPagination
    filterset_fields = ['project']
    # permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return ToDoModelSerializer
        return ToDoModelSerializerBase