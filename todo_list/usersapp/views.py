from django.shortcuts import render
from rest_framework.viewsets import GenericViewSet
from .models import User
from .serializers import UserModelSerializer, UserModelCustomSerializer
from rest_framework import mixins
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer


# Create your views here.

class UserModelViewSet(GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = User.objects.all()
    serializer_class = UserModelSerializer

    def get_serializer_class(self):
        if self.request.version == 'v2.0':
            return UserModelCustomSerializer
        return UserModelSerializer