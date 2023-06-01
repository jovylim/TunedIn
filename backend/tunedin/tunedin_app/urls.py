from django.contrib import admin
from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path('seed-users/', views.SeedUsers.as_view(), name='seed-users'),
    path('get-all-users/', views.AllUsers.as_view(), name='all-users'),
    path('get-one-user/<str:pk>', views.OneUser.as_view(), name='one-user'),
    path('add-user/', views.AddUser.as_view(), name='add-user'),
    path('update-user/<str:pk>', views.UpdateUser.as_view(), name='update-user'),
    path('seed-posts/', views.SeedPosts.as_view(), name='seed-posts'),
    path('get-all-posts/', views.AllPosts.as_view(), name='all-posts'),
    path('get-all-job-posts/', views.AllJobPosts.as_view(), name='all-job-posts'),
    path('get-one-user-posts/<str:pk>', views.OneUserPosts.as_view(), name='one-user-posts'),
    path('get-one-post/<str:pk>', views.OnePost.as_view(), name='one-post'),
    path('add-post/', views.AddPost.as_view(), name='add-post'),
    path('delete-post/<str:pk>', views.DeletePost.as_view(), name='delete-post'),
    path('get-one-post-post-reactions/<str:pk>', views.OnePostPostReactions.as_view(), name='one-post-post-reactions'),
    path('add-post-reaction/', views.AddPostReaction.as_view(), name='add-post-reaction'),
    path('delete-post-reaction/<str:pk>', views.DeletePostReaction.as_view(), name='delete-post-reaction'),
    path('get-one-user-contacts/<str:pk>', views.OneUserContacts.as_view(), name='one-user-contacts'),
    path('add-contact/', views.AddContact.as_view(), name='add-contact'),
    path('update-contact/<str:pk>', views.UpdateContact.as_view(), name='update-contact'),
    path('delete-contact/<str:pk>', views.DeleteContact.as_view(), name='delete-contact'),
    path('get-one-user-connections/<str:pk>', views.OneUserConnections.as_view(), name='one-user-connections'),
    path('add-connection/', views.AddConnection.as_view(), name='add-connection'),
    path('delete-connection/<str:pk>', views.DeleteConnection.as_view(), name='delete-connection'),
    path('get-one-user-experiences/<str:pk>', views.OneUserExperiences.as_view(), name='one-user-experiences'),
    path('add-experience/', views.AddExperience.as_view(), name='add-experience'),
    path('update-experience/<str:pk>', views.UpdateExperience.as_view(), name='update-experience'),
    path('delete-experience/<str:pk>', views.DeleteExperience.as_view(), name='delete-experience'),
    path('get-one-user-sent-messages/<str:pk>', views.OneUserSentMessages.as_view(), name='one-user-sent-messages'),
    path('get-one-user-received-messages/<str:pk>', views.OneUserReceivedMessages.as_view(), name='one-user-received-messages'),
    path('add-message/', views.AddMessage.as_view(), name='add-message'),
    path('token/', views.CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
