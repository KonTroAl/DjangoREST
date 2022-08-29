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
        self.project_dict = {'project_name': 'Project', 'users': [self.admin.id]}
        self.project_dict_fake = {'project_name': 'Fake', 'users': [self.admin.id]}
        self.project = Project.objects.create(project_name='Project')
        self.project.users.add(self.admin)
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
        request = factory.post(self.url, self.project_dict, format=self.format)
        view = ProjectModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    # def test_factory_project_create_admin(self):
    #     factory = APIRequestFactory()
    #     request = factory.post(self.url, self.project_dict, format=self.format)
    #     force_authenticate(request, self.admin)
    #     view = ProjectModelViewSet.as_view({'post': 'create'})
    #     response = view(request)
    #     self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    #APIClient
    def test_client_project_detail(self):
        client = APIClient()
        response = client.get(f'{self.url}{self.project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_client_project_edit_guest(self):
        client = APIClient()
        response = client.put(f'{self.url}{self.project.id}/',self.project_dict_fake, format=self.format)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_client_project_edit_admin(self):
        client = APIClient()
        client.login(username=self.username, password=self.password)
        response = client.put(f'{self.url}{self.project.id}/',self.project_dict_fake, format=self.format)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.project.refresh_from_db()
        self.assertEqual(self.project.project_name, self.project_dict_fake['project_name'])
        client.logout()

    def tearDown(self) -> None:
        pass


class TestToDoViewSet(APITestCase):

    def setUp(self) -> None:
        self.url = '/api/todo/'
        self.username = 'KonTroAl'
        self.password = 'Rjycnfynby1234567'
        self.admin = User.objects.create_superuser(self.username, 'troshenkin.k@yandex.ru', self.password)
        self.project_dict = {'project_name': 'Project', 'users': [self.admin.id]}
        self.project_dict_fake = {'project_name': 'Fake', 'users': [self.admin.id]}
        self.project = Project.objects.create(project_name='Project')
        self.project.users.add(self.admin)
        self.todo = ToDo.objects.create(project=self.project, text='text', user=self.admin)
        self.todo_dict_fake = {'project': self.project.id, 'text': 'text_2', 'user': self.admin.id}

        self.format = 'json'

    def test_testcase_todo_get_list(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_testcase_todo_edit(self):
        self.client.login(username=self.username, password=self.password)
        response = self.client.put(f'{self.url}{self.todo.id}/', self.todo_dict_fake)
        # response = self.client.get(f'{self.url}{self.todo.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.todo.refresh_from_db()
        self.assertEqual(self.todo.text, self.todo_dict_fake['text'])

    def tearDown(self) -> None:
        pass