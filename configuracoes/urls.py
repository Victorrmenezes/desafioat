from django.urls import path
from . import views

urlpatterns = [
    path("manager/", views.list_assets, name='list'),
    path("market/", views.market_assets, name='list'),
    path("delete/<int:id>", views.delete_asset, name='delete'),
    path("add/", views.add_asset, name='add'),
    path("login/", views.login, name = 'login'),
]
