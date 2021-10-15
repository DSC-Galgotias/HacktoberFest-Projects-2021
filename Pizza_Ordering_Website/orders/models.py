from django.db import models
from django.contrib.contenttypes.fields import GenericRelation
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType

# Create your models here.
class cartItem(models.Model):
    name = models.CharField(max_length=300)
    user = models.CharField(max_length=100)
    key = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
    	return f"{self.name} user = {self.user}"

class general(models.Model):
	name = models.CharField(max_length=300)
	small = models.DecimalField(max_digits=10, decimal_places=2)
	large = models.DecimalField(max_digits=10, decimal_places=2)
	typer = models.CharField(max_length=300)
	def __str__(self):
		return f"{self.name} small = {self.small} large = {self.large}"

class toppings(models.Model):
	name = models.CharField(max_length=300)
	def __str__(self):
		return f"{self.name}"

class ps(models.Model):
	name = models.CharField(max_length=300)
	price = models.DecimalField(max_digits=10, decimal_places=2)
	typer = models.CharField(max_length=300)
	def __str__(self):
		return f"{self.name} price = {self.price}"

class orders(models.Model):
	name = models.CharField(max_length=300)
	typer = models.CharField(max_length=300)
	price = models.DecimalField(max_digits=10, decimal_places=2)
	user = models.CharField(max_length=100)
	def __str__(self):
		return f"{self.user} ordered a {self.typer} called {self.name} for {self.price}"