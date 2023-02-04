from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Note(models.Model): #Transaction
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    body = models.TextField(null=True, blank=True)

    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.body[0:50]

    class Meta:
        ordering = ['created']

class Budget(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    budgetofUser = models.IntegerField(default=0)

    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.user)

    class Meta:
        ordering = ['created']

class AddBudget(models.Model):
    budget = models.ForeignKey(Budget, on_delete=models.CASCADE, related_name='budget')
    amount = models.IntegerField(default=0)

    def __str__(self):
        return str(self.budget.user)

class SinglePayBudget(models.Model):
    budgetForSinglePay = models.ForeignKey(Budget, on_delete=models.CASCADE, related_name='budgetForSinglePay')
    amount = models.IntegerField(default=0)

    def __str__(self):
        return str(self.budgetForSinglePay.user)

class SplitPayBudget(models.Model):
    budgetForSplitPay = models.ForeignKey(Budget, on_delete=models.CASCADE, related_name='budgetForSplitPay')
    friendsList = models.ManyToManyField(Budget, related_name='friendsList', blank=True)
    amount = models.IntegerField(default=0)

    def __str__(self):
        return str(self.budgetForSplitPay.user)

class ViewFriends(models.Model): # Just to display user specific Friend and not to ADD Friends
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    friends = models.ManyToManyField(User, related_name='friends', blank=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.user)

    class Meta:
        ordering = ['created']


STATUS_CHOICES = (
    ('send', 'send'),
    ('accepted', 'accepted'),
)

class AddFriends(models.Model):
    sender = models.ForeignKey(ViewFriends, on_delete=models.CASCADE, related_name='sender')
    receiver = models.ForeignKey(ViewFriends, on_delete=models.CASCADE, related_name='receiver')
    status = models.CharField(max_length=8, choices=STATUS_CHOICES, null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        if(self.created):
            try:
                return str(self.sender.user)
            except ViewFriends.DoesNotExist:
                return ''


    # def add(self):
    #     reciver_friendList = ViewFriends.objects.filter(user=self.reciver)
    #     if(reciver_friendList):
    #         reciver_friendList.model.add_friend(self.sender)
    #         sender_friendList = ViewFriends.objects.filter(user=self.sender)
    #         if(sender_friendList):
    #             sender_friendList.model.add_friend(self.reciver)
    #             self.save()



# class User(models.Model):
#     username = models.TextField(max_length=50)
#     password = models.TextField(null=False, blank=False)
