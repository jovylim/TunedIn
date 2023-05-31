# Generated by Django 4.2.1 on 2023-05-31 10:13

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Users',
            fields=[
                ('uuid', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('is_business', models.BooleanField(default=False)),
                ('name', models.CharField(max_length=50)),
                ('profile_picture', models.CharField(blank=True, default='', max_length=500)),
                ('about_me', models.CharField(blank=True, default='', max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Posts',
            fields=[
                ('uuid', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('type', models.CharField(choices=[('TEXT', 'Text'), ('PHOTO', 'Photo'), ('VIDEO', 'Video'), ('JOB', 'Job')], max_length=5)),
                ('content', models.CharField(max_length=500)),
                ('like_count', models.IntegerField(default=0)),
                ('comment_count', models.IntegerField(default=0)),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='post_user_uuid', to='tunedin_app.users')),
            ],
        ),
        migrations.CreateModel(
            name='PostReactions',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('type', models.CharField(choices=[('LIKE', 'Like'), ('COMMENT', 'Comment')], max_length=7)),
                ('comment', models.CharField(blank=True, default='', max_length=500)),
                ('post', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='post_reaction_post_uuid', to='tunedin_app.posts')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='post_reaction_user_uuid', to='tunedin_app.users')),
            ],
        ),
        migrations.CreateModel(
            name='Messages',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('timestamp', models.DateTimeField(auto_now_add=True, verbose_name='timestamp')),
                ('message', models.CharField(max_length=500)),
                ('receiver_user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='message_receiver_user_uuid', to='tunedin_app.users')),
                ('sender_user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='message_sender_user_uuid', to='tunedin_app.users')),
            ],
        ),
        migrations.CreateModel(
            name='Experiences',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('type', models.CharField(choices=[('EDUCATION', 'Education'), ('WORK', 'Work'), ('ACHIEVEMENT', 'Achievement')], max_length=11)),
                ('content', models.CharField(max_length=500)),
                ('start_date', models.DateTimeField(verbose_name='Start Date / Date Achieved')),
                ('end_date', models.DateTimeField(blank=True, default='', verbose_name='End Date')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='experience_user_uuid', to='tunedin_app.users')),
            ],
        ),
        migrations.CreateModel(
            name='Contacts',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('type', models.CharField(choices=[('PHONE', 'Phone'), ('EMAIL', 'Email'), ('INSTAGRAM', 'Instagram'), ('TIKTOK', 'Tiktok'), ('YOUTUBE', 'Youtube')], max_length=9)),
                ('value', models.CharField(max_length=100)),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='contact_user_uuid', to='tunedin_app.users')),
            ],
        ),
        migrations.CreateModel(
            name='Connections',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('type', models.CharField(choices=[('FOLLOWING', 'Following'), ('FOLLOWER', 'Follower')], max_length=9)),
                ('target_user', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='connection_target_user_uuid', to='tunedin_app.users')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='connection_user_uuid', to='tunedin_app.users')),
            ],
        ),
    ]
