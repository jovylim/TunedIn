from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from .models import *
from rest_framework.response import Response
from .serializer import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['company'] = 'TunedIn',

        return token


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class AllUsers(APIView):
    def get(self, request):
        users = Users.objects.all()
        serializer = UsersSerializer(users, many=True)
        return Response(serializer.data)


class OneUser(APIView):
    def post(self, request, pk):
        user = Users.objects.get(uuid=pk)
        serializer = UsersSerializer(user, many=False)
        return Response(serializer.data)


class AddUser(APIView):
    authentication_classes = []
    def put(self, request):
        new_user = Users.objects.create_user(name=request.data['name'], email=request.data['email'], password=request.data['password'])
        new_user.save()
        return Response('created')


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
        posts = Posts.objects.filter(type='JOB')
        serializer = PostsSerializer(posts, many=True)
        return Response(serializer.data)


class OneUserPosts(APIView):
    def get(self, request, pk):
        posts = Posts.objects.filter(user=pk)
        serializer = PostsSerializer(posts, many=True)
        return Response(serializer.data)


class OnePost(APIView):
    def post(self, request, pk):
        user = Posts.objects.get(uuid=pk)
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
    permission_classes = (IsAuthenticated,)
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


class OneUserFollowers(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, pk):
        connections = Connections.objects.filter(target_user=pk)
        serializer = ConnectionsSerializer(connections, many=True)
        return Response(serializer.data)


class OneUserFollowing(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, pk):
        connections = Connections.objects.filter(user=pk)
        serializer = ConnectionsSerializer(connections, many=True)
        return Response(serializer.data)


class AddConnection(APIView):
    permission_classes = (IsAuthenticated,)
    def put(self, request):
        serializer = ConnectionsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)


class DeleteConnection(APIView):
    permission_classes = (IsAuthenticated,)
    def delete(self, request, pk):
        connection = Connections.objects.get(id=pk)
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
        serializer = ExperiencesSerializer(instance=experience, data=request.data, partial=True)
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


class SeedUsers(APIView):
    def get(self, request):
        Users.objects.all().delete()
        user_one = Users.objects.create_user(name='John Tan', email='john@gmail.com', password='johnpassword',
                                             profile_picture='../../pictures/johnprofilepic.jpg',
                                             about_me='accountant by day, dancer by night')
        user_one.save()
        user_two = Users.objects.create_user(name='Cindy Loo', email='cindy@gmail.com', password='cindypassword',
                                             profile_picture='../../pictures/cindyprofilepic.jpeg',
                                             about_me='wannabe singer song writer')
        user_two.save()
        user_three = Users.objects.create_user(name='Tessy', email='tessy@gmail.com', password='tessypassword',
                                               profile_picture='../../pictures/tessyprofilepic.jpeg',
                                               about_me='professional guitarist')
        user_three.save()
        user_four = Users.objects.create_user(name='Thomas Choo', email='thomas@gmail.com', password='thomaspassword',
                                              profile_picture='../../pictures/thomasprofilepic.jpeg',
                                              about_me='heavy metal drummer!!!!!!!!! rock on!!!!!!!!')
        user_four.save()
        business_one = Users.objects.create_user(name='The Dance Company', is_business=True, email='thedancecompany@gmail.com',
                                                 password='thedancecompanypassword',
                                                 profile_picture='../../pictures/thedancecompanyprofilepic.png',
                                                 about_me='dance your heart away with us today!')
        business_one.save()
        business_two = Users.objects.create_user(name='Music Works', is_business=True, email='musicworks@gmail.com',
                                                 password='musicworkspassword',
                                                 profile_picture='../../pictures/musicworksprofilepic.jpeg',
                                                 about_me='we love scouting local talent. drop us a DM if you wanna connect and collab!')
        business_two.save()
        return HttpResponse('created')


class SeedPosts(APIView):
    def get(self, request):
        Posts.objects.all().delete()
        post_one = Posts(user=Users.objects.get(uuid='36e1189c-782c-40eb-85df-312f96fe1b2b'), type='TEXT',
                         content='hello everyone! i am John, i work as an accountant in the day, but i love to dance the night away!')
        post_one.save()
        post_two = Posts(user=Users.objects.get(uuid='36e1189c-782c-40eb-85df-312f96fe1b2b'), type='TEXT',
                         content='so tired but i am practicing day and night. so excited for my upcoming live show. deets released soon!')
        post_two.save()
        post_three = Posts(user=Users.objects.get(uuid='36e1189c-782c-40eb-85df-312f96fe1b2b'), type='PHOTO',
                           content='i will be performing tonight! catch me live!',
                           link='../../pictures/danceposter.jpeg')
        post_three.save()
        post_four = Posts(user=Users.objects.get(uuid='36e1189c-782c-40eb-85df-312f96fe1b2b'), type='VIDEO',
                         content='my inspiration, my model, my idol...', link='https://www.youtube.com/watch?v=zV1qLYukTH8')
        post_four.save()
        post_five = Posts(user=Users.objects.get(uuid='36e1189c-782c-40eb-85df-312f96fe1b2b'), type='TEXT',
                         content='performance was a failure!!!!! :(')
        post_five.save()
        post_six = Posts(user=Users.objects.get(uuid='8f0770aa-c285-4dc6-b87a-ea6c377d13af'), type='JOB',
                         content='need a new dancer. our previous one rage quit halfway during the show! serious candidates only! you will only be paid in exposure!')
        post_six.save()
        return HttpResponse('created')


class SeedContacts(APIView):
    def get(self, request):
        Contacts.objects.all().delete()
        contact_one = Contacts(user=Users.objects.get(uuid='36e1189c-782c-40eb-85df-312f96fe1b2b'), type='INSTAGRAM',
                               value='@johntandances')
        contact_one.save()
        contact_two = Contacts(user=Users.objects.get(uuid='36e1189c-782c-40eb-85df-312f96fe1b2b'), type='TIKTOK',
                               value='@johntandancing')
        contact_two.save()
        contact_three = Contacts(user=Users.objects.get(uuid='8f0770aa-c285-4dc6-b87a-ea6c377d13af'), type='INSTAGRAM',
                               value='@thedancecompany')
        contact_three.save()
        contact_four = Contacts(user=Users.objects.get(uuid='5a694ec5-0bae-4df6-a1b5-47482e8a7d4d'), type='INSTAGRAM',
                                 value='@cindyrockstar')
        contact_four.save()
        return HttpResponse('created')


class SeedConnections(APIView):
    def get(self, request):
        Connections.objects.all().delete()
        connection_one = Connections(user=Users.objects.get(uuid='5a694ec5-0bae-4df6-a1b5-47482e8a7d4d'),
                                     target_user=Users.objects.get(uuid='36e1189c-782c-40eb-85df-312f96fe1b2b'),
                                     type='FOLLOWING')
        connection_one.save()
        connection_two = Connections(user=Users.objects.get(uuid='36e1189c-782c-40eb-85df-312f96fe1b2b'),
                                     target_user=Users.objects.get(uuid='8f0770aa-c285-4dc6-b87a-ea6c377d13af'),
                                     type='FOLLOWING')
        connection_two.save()
        connection_three = Connections(user=Users.objects.get(uuid='5d64d525-731e-4d05-a245-aeeb16ae2f24'),
                                     target_user=Users.objects.get(uuid='36e1189c-782c-40eb-85df-312f96fe1b2b'),
                                     type='FOLLOWING')
        connection_three.save()
        connection_four = Connections(user=Users.objects.get(uuid='36e1189c-782c-40eb-85df-312f96fe1b2b'),
                                     target_user=Users.objects.get(uuid='8405a856-3a44-4796-936c-c344a897e76b'),
                                     type='FOLLOWING')
        connection_four.save()
        return HttpResponse('created')


class SeedExperiences(APIView):
    def get(self, request):
        Experiences.objects.all().delete()
        experience_one = Experiences(user=Users.objects.get(uuid='36e1189c-782c-40eb-85df-312f96fe1b2b'),
                                     type='ACHIEVEMENT',
                                     content='Grade 1 in Ballet',
                                     start_date='2022-01-01')
        experience_one.save()
        experience_two = Experiences(user=Users.objects.get(uuid='36e1189c-782c-40eb-85df-312f96fe1b2b'),
                                     type='ACHIEVEMENT',
                                     content='Grade 2 in Ballet',
                                     start_date='2022-05-01')
        experience_two.save()
        experience_three = Experiences(user=Users.objects.get(uuid='36e1189c-782c-40eb-85df-312f96fe1b2b'),
                                     type='ACHIEVEMENT',
                                     content='Grade 3 in Ballet',
                                     start_date='2022-10-01')
        experience_three.save()
        experience_four = Experiences(user=Users.objects.get(uuid='36e1189c-782c-40eb-85df-312f96fe1b2b'),
                                     type='ACHIEVEMENT',
                                     content='Grade 4 in Ballet',
                                     start_date='2023-01-01')
        experience_four.save()
        experience_four = Experiences(user=Users.objects.get(uuid='36e1189c-782c-40eb-85df-312f96fe1b2b'),
                                     type='WORK',
                                     content='Joined The Dance Company',
                                     start_date='2023-02-01')
        experience_four.save()
        experience_five = Experiences(user=Users.objects.get(uuid='36e1189c-782c-40eb-85df-312f96fe1b2b'),
                                     type='ACHIEVEMENT',
                                     content='Grade 5 in Ballet',
                                     start_date='2023-04-01')
        experience_five.save()
        return HttpResponse('created')


class SeedPostReactions(APIView):
    def get(self, request):
        PostReactions.objects.all().delete()
        reaction_one = PostReactions(user=Users.objects.get(uuid='36e1189c-782c-40eb-85df-312f96fe1b2b'),
                                     post=Posts.objects.get(uuid='d2fd289b-2bde-424d-b947-9e10c46805da'),
                                     type='LIKE')
        reaction_one.save()
        reaction_two = PostReactions(user=Users.objects.get(uuid='5a694ec5-0bae-4df6-a1b5-47482e8a7d4d'),
                                     post=Posts.objects.get(uuid='d2fd289b-2bde-424d-b947-9e10c46805da'),
                                     type='LIKE')
        reaction_two.save()
        reaction_three = PostReactions(user=Users.objects.get(uuid='5d64d525-731e-4d05-a245-aeeb16ae2f24'),
                                     post=Posts.objects.get(uuid='d2fd289b-2bde-424d-b947-9e10c46805da'),
                                     type='LIKE')
        reaction_three.save()
        reaction_four = PostReactions(user=Users.objects.get(uuid='5a694ec5-0bae-4df6-a1b5-47482e8a7d4d'),
                                     post=Posts.objects.get(uuid='d2fd289b-2bde-424d-b947-9e10c46805da'),
                                     type='COMMENT',
                                     comment='oh no!!! what happened?!')
        reaction_four.save()
        return HttpResponse('created')



