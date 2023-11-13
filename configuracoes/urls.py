from django.urls import path
from . import views
from .scheduler import start


urlpatterns = [
    path("manager/", views.list_assets, name='list'),
    path("detail/<int:id>", views.asset_details, name='list'),
    path("market/", views.market_assets, name='market_list'),
    path("delete/<int:id>", views.delete_asset, name='delete'),
    path("add/", views.add_asset, name='add'),
]


start()