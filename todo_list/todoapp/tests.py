from django.test import TestCase
import json
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from usersapp.models import User
from .views import ProjectModelViewSet, ToDoModelViewSet
from .models import Project, ToDo

# Create your tests here.

class TestProjectViewSet(TestCase):

    def setUp(self) -> None:
        self.url = '/api/projects/'
        self.username = 'KonTroAl'
        self.password = 'Rjycnfynby1234567'
        self.admin = User.objects.create_superuser(self.username, 'troshenkin.k@yandex.ru', self.password)
        self.project = {'project_name': 'Project', 'users': [self.admin.id]}
        self.format = 'json'

    def test_factory_project_get_list(self):
        factory = APIRequestFactory()
        request = factory.get(self.url)
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_factory_project_create_guest(self):
        factory = APIRequestFactory()
        request = factory.post(self.url, self.project, format=self.format)
        view = ProjectModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_factory_project_create_admin(self):
        factory = APIRequestFactory()
        request = factory.post(self.url, self.project, format=self.format)
        force_authenticate(request,self.admin)
        view = ProjectModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def tearDown(self) -> None:
        pass


