from django.contrib import admin
from django.urls import path, include
from . import views
from rest_framework import routers

# router = routers.DefaultRouter()
# router.register(r'users', views.UserView, 'users')

urlpatterns = [
    path('get-all-users/', views.AllUsers.as_view(), name='all-users'),
    path('get-one-user/<str:pk>', views.OneUser.as_view(), name='one-user'),
    path('add-user/', views.AddUser.as_view(), name='add-user'),
    path('update-user/<str:pk>', views.UpdateUser.as_view(), name='update-user'),

]