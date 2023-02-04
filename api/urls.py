from django.urls import path
from rest_framework.routers import DefaultRouter
from . import views
from .views import UserViewSet, TransViewSet, FriendsViewSet, AddFriendViewSet, GetIdViewSet, AllUsersInFriendsViewSet, BudgetViewSet, AddBudgetViewSet, SinglePayBudgetViewSet, SplitPayBudgetViewSet
from django.conf.urls import include

router = DefaultRouter()
router.register('users', UserViewSet)
router.register('transactions', TransViewSet, basename='transactions') # Notes
router.register('friends', FriendsViewSet, basename='friends')
router.register('allusersinfriendsviewset', AllUsersInFriendsViewSet, basename='allusersinfriendsviewset')
router.register('addfriend', AddFriendViewSet, basename='addfriend')
router.register('getid', GetIdViewSet, basename='getid')
router.register('budget', BudgetViewSet, basename='budget')
router.register('addbudget', AddBudgetViewSet, basename='addbudget')
router.register('singlepaybudget', SinglePayBudgetViewSet, basename='singlepaybudget')
router.register('splitpaybudget', SplitPayBudgetViewSet, basename='splitpaybudget')

urlpatterns = [
    # path('', views.getRoutes, name="routes"),
    # path('notes/', views.getNotes, name="notes"),
    # path('notes/create/', views.createNote, name="create-note"),
    #path('notes/<str:pk>/update/', views.updateNote, name="update-note"),
    #path('notes/<str:pk>/delete/', views.deleteNote, name="delete-note"),
    # path('notes/<str:pk>/', views.getNote, name="note"),


    path('', include(router.urls)),
]
