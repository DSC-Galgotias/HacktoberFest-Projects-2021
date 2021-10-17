from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User


class RegisterForm(UserCreationForm):
	email = forms.EmailField()
	first = forms.CharField()
	last = forms.CharField()

	class Meta:
		model = User
		fields = ["username", "first", "last", "email", "password1", "password2"]