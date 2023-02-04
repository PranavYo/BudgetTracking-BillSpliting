from django.db.models.signals import post_save, m2m_changed
from django.contrib.auth.models import User
from django.dispatch import receiver
from .models import ViewFriends, AddFriends, AddBudget, Budget, SinglePayBudget, SplitPayBudget
from django.db.models import F, Q


@receiver(post_save, sender=AddFriends)
def post_save_add_to_friends(sender, instance, created, **kwargs):
    sender_ = instance.sender # accessing the data of Addfriends Model (which is selected by the USER)
    receiver_ = instance.receiver
    # instance have the Json part
    if instance.status == 'accepted':
        sender_.friends.add(receiver_.user)
        receiver_.friends.add(sender_.user)
        sender_.save()
        receiver_.save()
        # Adding the user into their friends LIST of AddFriends MODEL

@receiver(post_save, sender=AddBudget)
def post_save_add_amount(sender, instance, created, **kwargs):
    Budget.objects.filter(user=instance.budget.user).update(budgetofUser=F('budgetofUser') + instance.amount)

@receiver(post_save, sender=SinglePayBudget)
def post_save_singlepay_amount(sender, instance, created, **kwargs):
    Budget.objects.filter(user=instance.budgetForSinglePay.user).update(budgetofUser=F('budgetofUser') - instance.amount)

@receiver(post_save, sender=SplitPayBudget)
def post_save_splitpay_amount(sender, instance, created, **kwargs):
    Budget.objects.filter(user=instance.budgetForSplitPay.user).update(budgetofUser=F('budgetofUser') - instance.amount)


@receiver(m2m_changed, sender=SplitPayBudget.friendsList.through)
def update_budget_for_splitpay(sender, instance, action, **kwargs):
    if action == 'post_add':
        for friend in instance.friendsList.all():
            Budget.objects.filter(user=friend.user).update(budgetofUser=F('budgetofUser') - instance.amount)
    elif action == 'post_remove':
        for friend in instance.friendsList.all():
            Budget.objects.filter(user=friend.user).update(budgetofUser=F('budgetofUser') + instance.amount)