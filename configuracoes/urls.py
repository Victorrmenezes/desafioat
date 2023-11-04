from django.urls import path
from . import views

urlpatterns = [
    path("config/", views.lista_ativos, name='config'),
]
