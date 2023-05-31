from rest_framework import serializers
from .models import *


class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'


class PostsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Posts
        fields = '__all__'


class PostReactionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostReactions
        fields = '__all__'


class ContactsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contacts
        fields = '__all__'


class ConnectionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Connections
        fields = '__all__'


class ExperiencesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experiences
        fields = '__all__'


class MessagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Messages
        fields = '__all__'
