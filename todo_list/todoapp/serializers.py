from rest_framework.relations import HyperlinkedIdentityField, HyperlinkedRelatedField
from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer
from .models import Project, ToDo
from usersapp.serializers import UserModelCustomSerializer

class ProjectModelSerializer(ModelSerializer):
    # users = HyperlinkedRelatedField(many=True, view_name='user-detail', read_only=True)

    class Meta:
        model = Project
        fields = '__all__'


class ToDoModelSerializer(ModelSerializer):
    # project = ProjectModelSerializer()
    # user = UserModelCustomSerializer()

    class Meta:
        model = ToDo
        exclude = ('is_active',)