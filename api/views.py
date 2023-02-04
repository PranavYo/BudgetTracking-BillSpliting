from django.http import response
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.serializers import Serializer
from .models import Note, ViewFriends, AddFriends, Budget, AddBudget, SinglePayBudget, SplitPayBudget
from django.contrib.auth.models import User
from .serializers import NoteSerializer, UserSerializer, FriendsSerializer, AddFriendsSerializer, BudgetSerializer, AddBudgetSerializer, SinglePayBudgetSerializer, SplitPayBudgetSerializer
from api import serializers
from .utils import updateNote, getNoteDetail, deleteNote, getNotesList, createNote
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import make_password
from rest_framework.authtoken.views import Token
# Create your views here.


class TransViewSet(viewsets.ModelViewSet): #helps in CRUD operations
    # queryset = Note.objects.all()
    def get_queryset(self): # To display a specific content
        user = self.request.user
        queryset = Note.objects.filter(user=user)
        return queryset
    
    serializer_class = NoteSerializer
    authentication_classes = (TokenAuthentication  ,  )

    def perform_create(self, serializer): # To create Transactions/Notes for specific user
        if self.request and hasattr(self.request, "user"):
            requested_user = self.request.user
        serializer.save(user=requested_user)


class FriendsViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        if self.request and hasattr(self.request, "user"):
            user = self.request.user
            queryset = ViewFriends.objects.filter(user=user)
            return queryset
    serializer_class = FriendsSerializer
    authentication_classes = (TokenAuthentication, )

class BudgetViewSet(viewsets.ModelViewSet):
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer

    authentication_classes = (TokenAuthentication, )

class AddBudgetViewSet(viewsets.ModelViewSet):
    queryset = AddBudget.objects.all()
    serializer_class = AddBudgetSerializer
    authentication_classes = (TokenAuthentication, )

class SinglePayBudgetViewSet(viewsets.ModelViewSet):
    queryset = SinglePayBudget.objects.all()
    serializer_class = SinglePayBudgetSerializer
    authentication_classes = (TokenAuthentication, )

class SplitPayBudgetViewSet(viewsets.ModelViewSet):
    queryset = SplitPayBudget.objects.all()
    serializer_class = SplitPayBudgetSerializer
    authentication_classes = (TokenAuthentication, )

class AddFriendViewSet(viewsets.ModelViewSet):
    queryset = AddFriends.objects.all()
    serializer_class = AddFriendsSerializer
    authentication_classes = (TokenAuthentication, )


class UserViewSet(viewsets.ModelViewSet): #helps in CRUD operations
    queryset = User.objects.all()
    serializer_class = UserSerializer

class AllUsersInFriendsViewSet(viewsets.ModelViewSet):
    queryset = ViewFriends.objects.all()
    serializer_class = FriendsSerializer

class GetIdViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        if self.request and hasattr(self.request, "user"):
            user = self.request.user
            queryset = User.objects.get(username=user.username)
            return queryset
    serializer_class = UserSerializer
    authentication_classes = (TokenAuthentication, )

    # def perform_create(self, serializer):
    #     username = self.request.data.get("username", None)
    #     password = self.request.data.get("password", None)
    #     user = User.objects.create_user(username, password)
    #     user.password = make_password(password)
    #     Token.objects.create(user=user)
    #     return user
