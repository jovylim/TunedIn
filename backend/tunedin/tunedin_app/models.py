import uuid
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class AccountManager(BaseUserManager):
    def create_user(self, email, password=None):
        if not email:
            raise ValueError('User must have a valid email.')

        user = self.model(
            email=self.normalize_email(email),
        )
        user.set_password(password)
        user.save(using=self._db)
        return user


class Users(AbstractBaseUser):
    uuid = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )
    email = models.EmailField(verbose_name='email', max_length=100, unique=True, editable=False)
    is_business = models.BooleanField(default=False)
    name = models.CharField(max_length=50)
    profile_picture = models.CharField(max_length=500, blank=True, default='')
    about_me = models.CharField(max_length=100, blank=True, default='')

    objects = AccountManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def __str__(self):
        return self.name


class Posts(models.Model):
    TYPE_CHOICES = [
        ('TEXT', 'Text'),
        ('PHOTO', 'Photo'),
        ('VIDEO', 'Video'),
        ('JOB', 'Job'),
    ]
    uuid = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )
    user = models.ForeignKey(Users, related_name='post_user_uuid', on_delete=models.DO_NOTHING, null=True)
    type = models.CharField(max_length=5, choices=TYPE_CHOICES)
    timestamp = models.DateTimeField(verbose_name='timestamp', auto_now_add=True)
    content = models.CharField(max_length=500)
    like_count = models.IntegerField(default=0)
    comment_count = models.IntegerField(default=0)

    def __str__(self):
        return self.uuid


class PostReactions(models.Model):
    id = models.BigAutoField(primary_key=True)
    TYPE_CHOICES = [
        ('LIKE', 'Like'),
        ('COMMENT', 'Comment'),
    ]
    user = models.ForeignKey(Users, related_name='post_reaction_user_uuid', on_delete=models.DO_NOTHING)
    post = models.ForeignKey(Posts, related_name='post_reaction_post_uuid', on_delete=models.DO_NOTHING)
    type = models.CharField(max_length=7, choices=TYPE_CHOICES)
    comment = models.CharField(max_length=500, blank=True, default='')

    def __str__(self):
        return self.post


class Contacts(models.Model):
    TYPE_CHOICES = [
        ('PHONE', 'Phone'),
        ('EMAIL', 'Email'),
        ('INSTAGRAM', 'Instagram'),
        ('TIKTOK', 'Tiktok'),
        ('YOUTUBE', 'Youtube'),
    ]
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(Users, related_name='contact_user_uuid', on_delete=models.DO_NOTHING, null=True)
    type = models.CharField(max_length=9, choices=TYPE_CHOICES)
    value = models.CharField(max_length=100)

    def __str__(self):
        return self.id


class Connections(models.Model):
    id = models.BigAutoField(primary_key=True)
    TYPE_CHOICES = [
        ('FOLLOWING', 'Following'),
        ('FOLLOWER', 'Follower'),
    ]
    user = models.ForeignKey(Users, related_name='connection_user_uuid', on_delete=models.DO_NOTHING)
    target_user = models.ForeignKey(Users, related_name='connection_target_user_uuid', on_delete=models.DO_NOTHING)
    type = models.CharField(max_length=9, choices=TYPE_CHOICES)

    def __str__(self):
        return self.user


class Experiences(models.Model):
    TYPE_CHOICES = [
        ('EDUCATION', 'Education'),
        ('WORK', 'Work'),
        ('ACHIEVEMENT', 'Achievement'),
    ]
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(Users, related_name='experience_user_uuid', on_delete=models.DO_NOTHING, null=True)
    type = models.CharField(max_length=11, choices=TYPE_CHOICES)
    content = models.CharField(max_length=500)
    start_date = models.DateTimeField(verbose_name='Start Date / Date Achieved')
    end_date = models.DateTimeField(verbose_name='End Date', blank=True, null=True, default=None)

    def __str__(self):
        return self.id


class Messages(models.Model):
    id = models.BigAutoField(primary_key=True)
    sender_user = models.ForeignKey(Users, related_name='message_sender_user_uuid', on_delete=models.DO_NOTHING, null=True)
    receiver_user = models.ForeignKey(Users, related_name='message_receiver_user_uuid', on_delete=models.DO_NOTHING, null=True)
    timestamp = models.DateTimeField(verbose_name='timestamp', auto_now_add=True)
    message = models.CharField(max_length=500)

    def __str__(self):
        return self.id