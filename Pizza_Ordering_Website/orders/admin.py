from django.contrib import admin
from .models import general, toppings, ps, orders
# Register your models here.
admin.site.register(general)
admin.site.register(ps)
admin.site.register(toppings)
admin.site.register(orders)
