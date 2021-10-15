from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
	path("register/", views.register, name="register"),
	path("topping", views.topping, name="topping"),
	path("cart", views.cart, name="cart"),
	path("buy", views.buy, name="buy")
]
