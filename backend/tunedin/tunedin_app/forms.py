# from django import forms
# from django.contrib.auth.forms import UserCreationForm
# from django.contrib.auth.models import User
#
#
# class NewUserForm(UserCreationForm):
#     email = forms.EmailField(required=True)
#     name = forms.CharField(required=True)
#
#     class Meta:
#         model = User
#         fields = ("name", "email", "password1", "password2")
#
#     def save(self, commit=True):
#         user = super(NewUserForm, self).save(commit=False)
#         user.email = self.cleaned_data['email']
#         if commit:
#             user.save()
#         return user
