from django.shortcuts import render
from rest_framework.views import APIView
from .models import Users
from rest_framework.response import Response
from .serializer import UsersSerializer


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


