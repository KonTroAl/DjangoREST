from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer
from .models import Project, ToDo

class ProjectHyperlinkedModelSerializer(HyperlinkedModelSerializer):

    class Meta:
        model = Project
        fields = '__all__'

class ToDoModelSerializer(HyperlinkedModelSerializer):

    class Meta:
        model = ToDo
        fields = '__all__'

