from django.shortcuts import render
from rest_framework.views import APIView
from .models import *
from rest_framework.response import Response
from .serializer import *


class AllUsers(APIView):
    def get(self, request):
        users = Users.objects.all()
        serializer = UsersSerializer(users, many=True)
        return Response(serializer.data)


class OneUser(APIView):
    def post(self, request, pk):
        user = Users.object.get(uuid=pk)
        serializer = UsersSerializer(user, many=False)
        return Response(serializer.data)


class AddUser(APIView):
    def put(self, request):
        serializer = UsersSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)


class UpdateUser(APIView):
    def patch(self, request, pk):
        user = Users.objects.get(uuid=pk)
        serializer = UsersSerializer(instance=user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)


class AllPosts(APIView):
    def get(self, request):
        posts = Posts.objects.all()
        serializer = PostsSerializer(posts, many=True)
        return Response(serializer.data)


class AllJobPosts(APIView):
    def get(self, request):
        posts = Posts.objects.filter(type='Job')
        serializer = PostsSerializer(posts, many=True)
        return Response(serializer.data)


class OneUserPosts(APIView):
    def get(self, request, pk):
        posts = Posts.objects.filter(user=pk)
        serializer = PostsSerializer(posts, many=True)
        return Response(serializer.data)


class OnePost(APIView):
    def post(self, request, pk):
        user = Posts.object.get(uuid=pk)
        serializer = PostsSerializer(user, many=False)
        return Response(serializer.data)


class AddPost(APIView):
    def put(self, request):
        serializer = PostsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)


class DeletePost(APIView):
    def delete(self, request, pk):
        post = Posts.objects.get(uuid=pk)
        post.delete()
        return Response('post deleted')


class OnePostPostReactions(APIView):
    def get(self, request, pk):
        reactions = PostReactions.objects.filter(post=pk)
        serializer = PostReactionsSerializer(reactions, many=True)
        return Response(serializer.data)


class AddPostReaction(APIView):
    def put(self, request):
        serializer = PostReactionsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)


class DeletePostReaction(APIView):
    def delete(self, request, pk):
        reaction = PostReactions.objects.get(id=pk)
        reaction.delete()
        return Response('reaction deleted')


class OneUserContacts(APIView):
    def get(self, request, pk):
        contacts = Contacts.objects.filter(user=pk)
        serializer = ContactsSerializer(contacts, many=True)
        return Response(serializer.data)


class AddContact(APIView):
    def put(self, request):
        serializer = ContactsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)


class UpdateContact(APIView):
    def patch(self, request, pk):
        contact = Contacts.objects.get(id=pk)
        serializer = ContactsSerializer(instance=contact, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)


class DeleteContact(APIView):
    def delete(self, request, pk):
        contact = Contacts.objects.get(id=pk)
        contact.delete()
        return Response('contact deleted')


class OneUserConnections(APIView):
    def get(self, request, pk):
        connections = Connections.objects.filter(user=pk)
        serializer = ConnectionsSerializer(connections, many=True)
        return Response(serializer.data)


class AddConnection(APIView):
    def put(self, request):
        serializer = ConnectionsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)


class DeleteConnection(APIView):
    def delete(self, request, pk):
        connection = Experiences.objects.get(id=pk)
        connection.delete()
        return Response('connection deleted')


class OneUserExperiences(APIView):
    def get(self, request, pk):
        experiences = Experiences.objects.filter(user=pk)
        serializer = ExperiencesSerializer(experiences, many=True)
        return Response(serializer.data)


class AddExperience(APIView):
    def put(self, request):
        serializer = ExperiencesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)


class UpdateExperience(APIView):
    def patch(self, request, pk):
        experience = Experiences.objects.get(id=pk)
        serializer = ContactsSerializer(instance=experience, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)


class DeleteExperience(APIView):
    def delete(self, request, pk):
        experience = Experiences.objects.get(id=pk)
        experience.delete()
        return Response('experience deleted')


class OneUserSentMessages(APIView):
    def get(self, request, pk):
        messages = Messages.objects.filter(sender_user=pk)
        serializer = MessagesSerializer(messages, many=True)
        return Response(serializer.data)


class OneUserReceivedMessages(APIView):
    def get(self, request, pk):
        messages = Messages.objects.filter(receiver_user=pk)
        serializer = MessagesSerializer(messages, many=True)
        return Response(serializer.data)


class AddMessage(APIView):
    def put(self, request):
        serializer = MessagesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)