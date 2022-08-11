from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer
from .models import Project, ToDo

class ProjectHyperlinkedModelSerializer(ModelSerializer):

    class Meta:
        model = Project
        fields = '__all__'

class ToDoModelSerializer(ModelSerializer):

    class Meta:
        model = ToDo
        fields = '__all__'

