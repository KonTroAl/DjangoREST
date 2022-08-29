from django.test import TestCase
import json
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APITestCase
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
        self.project_mixer = mixer.blend(Project)
        self.project_dict_fake = {'project_name': 'Fake', 'users': [self.admin.id]}
        self.format = 'json'

    # APIRequestFactory
    def test_factory_project_get_list(self):
        factory = APIRequestFactory()
        request = factory.get(self.url)
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_factory_project_create_guest(self):
        factory = APIRequestFactory()
        request = factory.post(self.url, self.project_dict_fake, format=self.format)
        view = ProjectModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


    #APIClient
    def test_client_project_detail(self):
        client = APIClient()
        response = client.get(f'{self.url}{self.project_mixer.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_client_project_edit_guest(self):
        client = APIClient()
        response = client.put(f'{self.url}{self.project_mixer.id}/',self.project_dict_fake, format=self.format)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_client_project_edit_admin(self):
        client = APIClient()
        client.login(username=self.username, password=self.password)
        response = client.put(f'{self.url}{self.project_mixer.id}/',self.project_dict_fake, format=self.format)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.project_mixer.refresh_from_db()
        self.assertEqual(self.project_mixer.project_name, self.project_dict_fake['project_name'])
        client.logout()

    def tearDown(self) -> None:
        pass


class TestToDoViewSet(APITestCase):

    def setUp(self) -> None:
        self.url = '/api/todo/'
        self.username = 'KonTroAl'
        self.password = 'Rjycnfynby1234567'
        self.admin = User.objects.create_superuser(self.username, 'troshenkin.k@yandex.ru', self.password)
        self.todo_mixer = mixer.blend(ToDo)
        self.todo_dict_fake = {'project': self.todo_mixer.project.id, 'text': 'text_2', 'user': self.todo_mixer.user.id}

    def test_testcase_todo_get_list(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_testcase_todo_edit(self):
        self.client.login(username=self.username, password=self.password)
        response = self.client.put(f'{self.url}{self.todo_mixer.id}/', self.todo_dict_fake)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.todo_mixer.refresh_from_db()
        self.assertEqual(self.todo_mixer.text, self.todo_dict_fake['text'])

    def tearDown(self) -> None:
        pass