from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from .models import general, ps, toppings, cartItem, orders
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.urls import reverse
from .forms import RegisterForm
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

# Create your views here.
def index(request):
	if not request.user.is_authenticated:
		return render(request, "orders/login.html", {"message": None})
	if request.method =="POST":
		x = request.POST.getlist("items[]")
		i = 0
		l = 0
		k = 0
		name = []
		need = []
		flag = False
		pk = []
		price = []
		f = 0
		while i < len(x):
			l = x[i].find(',')
			pk.append(x[i][0: l])
			k = x[i].find(',', l+1, len(x[i]))
			price.append(float(x[i][l + 2: k]))
			name.append(x[i][k + 2 : len(x[i])])
			i = i + 1
		for item in name:
			if item == "1 topping" or item =="2 toppings" or item == "3 toppings" or item == "1 item" or item == "2 items" or item == "3 items":
				need.append(item)
				flag = True
			else:
				o = cartItem.objects.create(
					name = item,
					user = request.session['user'],
					key = pk[f],
					price = price[f]
					)
			f = f+1
		if flag == True:
			request.session['need'] = need
			request.session['items'] = name
			request.session['key'] = pk
			request.session['price'] = price
			return HttpResponseRedirect(reverse("topping"))
		else:
			return HttpResponseRedirect(reverse("cart"))
	context = {
		"regular": general.objects.filter(typer="regular"),
		"sicilian": general.objects.filter(typer="sicilian"),
		"dinner": general.objects.filter(typer="dinner"),
		"pasta": ps.objects.filter(typer="pasta"),
		"salad": ps.objects.filter(typer="salad"),
		"toppings": toppings.objects.all(),
		"subs": general.objects.filter(typer="sub")

	}
	return render(request, "orders/menu.html", context)

def login_view(request):
	if request.method == "POST":
		username = request.POST["username"]
		password = request.POST["password"]
		request.session['user'] = username
		user = authenticate(request, username=username, password=password)
		if user is not None:
			login(request, user)
			return HttpResponseRedirect(reverse("index"))
		else:
			return render(request, "orders/login.html", {"message": "Invalid credentials."})
	return render(request, "orders/login.html")

def logout_view(request):
    logout(request)
    return render(request, "orders/login.html", {"message": "Logged Out"})

def register(response):
	if response.method == "POST":
		form = RegisterForm(response.POST)
		if form.is_valid():
			form.save()
		return render(response, "orders/login.html", {"message": "Registered"})
	else:
		form = RegisterForm()
	return render(response, "orders/register.html", {"form":form})


def topping(request):
	if request.method == "POST":
		need = request.session['need']
		index = request.session['items'].index(request.session['need'][0])
		add = request.POST.getlist("topping")
		if len(add) != request.session['number']:
			context = {
				"toppings": toppings.objects.all(),
				"number": request.session['number']
			}
			return render(request, "orders/topping.html", context)
		add.append(request.session['items'][index])
		request.session['items'].insert(index, add)
		o = cartItem.objects.create(
			name = add,
			user = request.session['user'],
			key = request.session['key'][index],
			price = request.session['price'][index]
		)
		request.session['items'].pop(index + 1)
		need.pop(0)
		request.session['need'] = need
	need = request.session['need']
	if len(need) == 0:
		return HttpResponseRedirect(reverse("cart"))
	if need[0] == "1 item" or need[0] == "1 topping":
		context = {
			"toppings": toppings.objects.all(),
			"number": 1
		}
		request.session['number'] = 1
		return render(request, "orders/topping.html", context)
	if need[0] == "2 items" or need[0] == "2 toppings":
		context = {
			"toppings": toppings.objects.all(),
			"number": 2
		}
		request.session['number'] = 2
		return render(request, "orders/topping.html", context)
	if need[0] == "3 items" or need[0] == "3 toppings":
		context = {
			"toppings": toppings.objects.all(),
			"number": 3
		}
		request.session['number'] = 3
		return render(request, "orders/topping.html", context)

def cart(request):
	if request.method == "POST":
		cost = 0
		x = 0
		b = cartItem.objects.filter(user = request.session['user']).all()
		for item in b:
			food = item.name
			idr = item.key	
			h = general.objects.filter(name = food)
			flag = False
			for itemk in h:
				if  int(idr) == int(itemk.pk):
					cost = cost + item.price
					flag = True
					#typer = itmek.typer
				else:
					for itemr in ps.objects.filter(name = food):
						cost = cost + itemr.price
						#typer = itemr.type
			x = x + 1
		u = []
		n = []
		t = cartItem.objects.filter(user = request.session['user']).all()
		for item in t:
			if item.name[0] == '[':
				k = (item.name).strip('][').split(', ')
				u.insert(0, k)
			else:
				n.append(item.name)
		i = 0
		while i < len(u):
			j = 0
			while j < len(u[i]):
				u[i][j] = u[i][j].strip("'")
				j = j + 1
			i = i + 1
		context = {
			"normal": n,
			"toppings": u,
			"price": cost
		}

		return render(request, "orders/confirm.html", context)

	u = []
	n = []
	t = cartItem.objects.filter(user = request.session['user']).all()
	for item in t:
		if item.name[0] == '[':
			k = (item.name).strip('][').split(', ')
			u.insert(0, k)
		else:
			n.append(item.name)
	i = 0
	while i < len(u):
		j = 0
		while j < len(u[i]):
			u[i][j] = u[i][j].strip("'")
			j = j + 1
		i = i + 1
	context = {
		"normal": n,
		"toppings": u
	}
	return render(request, "orders/cart.html", context)


def buy(request):
	if request.method == "POST":
		b = cartItem.objects.filter(user = request.session['user']).all()
		for item in b:
			lm = item.name
			flag = False
			h = general.objects.filter(name = item.name)
			for itemr in h:
				if itemr.pk == item.key:
					orders.objects.create(
						name = lm,
						user = request.session['user'],
						typer = itemr.typer,
						price = item.price
					)
					flag == True
			if flag == False:
				lm = item.name
				flag2 = False
				l = ps.objects.filter(name = item.name)
				for itemk in l:
					if l != None:
						orders.objects.create(
							name = lm,
							user = request.session['user'],
							typer = itemk.typer,
							price = item.price
						)
				if item.name[0] == '[':
					h = general.objects.filter(pk = item.key)
					for itemi in h:
						jasf = itemi.typer
					orders.objects.create(
						name = lm,
						user = request.session['user'],
						typer = jasf,
						price = item.price
					)
		cartItem.objects.filter(user = request.session['user']).all().delete()
		email = User.objects.get(username= request.session['user']).email
		message = Mail(
		from_email='Raaghav.Agarwal@gmail.com',
		to_emails= email,
		subject='Thanks For Your Order',
		html_content='<strong>Thanks for your order have a nice day</strong>')
		try:
			sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
			response = sg.send(message)
			print(response.status_code)
			print(response.body)
			print(response.headers)
		except Exception as e:
				print(e.body)
	return render(request, "orders/thanks.html")











