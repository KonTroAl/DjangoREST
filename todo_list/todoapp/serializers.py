from rest_framework.relations import HyperlinkedIdentityField, HyperlinkedRelatedField
from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer
from .models import Project, ToDo

class ProjectModelSerializer(ModelSerializer):
    # users = HyperlinkedRelatedField(many=True, view_name='user-detail', read_only=True)

    class Meta:
        model = Project
        fields = '__all__'

class ToDoModelSerializerBase(ModelSerializer):

    class Meta:
        model = ToDo
        exclude = ('is_active',)


class ToDoModelSerializer(ModelSerializer):
    project = ProjectModelSerializer()

    class Meta:
        model = ToDo
        exclude = ('is_active',)