from rest_framework.serializers import ModelSerializer
from .models import Note, ViewFriends, AddFriends, Budget, AddBudget, SinglePayBudget, SplitPayBudget
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework.authtoken.views import Token
from rest_framework.response import Response


class NoteSerializer(ModelSerializer): # Actually a TransactionSerializer
    class Meta:
        model = Note
        fields = '__all__'

class BudgetSerializer(ModelSerializer): # Actually a TransactionSerializer
    class Meta:
        model = Budget
        fields = '__all__'

class AddBudgetSerializer(ModelSerializer): # Actually a TransactionSerializer
    class Meta:
        model = AddBudget
        fields = '__all__'

class SinglePayBudgetSerializer(ModelSerializer): # Actually a TransactionSerializer
    class Meta:
        model = SinglePayBudget
        fields = '__all__'

class SplitPayBudgetSerializer(ModelSerializer): # Actually a TransactionSerializer
    class Meta:
        model = SplitPayBudget
        fields = '__all__'

class FriendsSerializer(ModelSerializer):
    class Meta:
        model = ViewFriends
        fields = '__all__'


class AddFriendsSerializer(ModelSerializer):
    class Meta:
        model = AddFriends
        fields = '__all__'

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

        extra_kwargs = {
            'password': {
                'write_only': True,
                'required': True
            }
        }
    
    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['password'])
        user.password = make_password(validated_data['password']) # to hash the password
        Token.objects.create(user=user)
        ViewFriends.objects.create(user=user)
        Budget.objects.create(user=user)
        user.save()
        return user

