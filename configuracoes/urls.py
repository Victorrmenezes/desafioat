from django.urls import path
from . import views

urlpatterns = [
    path("manager/", views.list_assets, name='list'),
    path("del/<int:id>", views.delete_asset, name='delete'),
    path("manager/add", views.add_asset, name='add'),
    path("login/", views.login, name = 'login'),
]
