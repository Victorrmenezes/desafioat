from rest_framework import serializers
from .models import Assets,Users,UserAssets, AssetPrices


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model= Users
        fields = ['id','f_name','email']


class AssetSerializer(serializers.ModelSerializer):
    class Meta:
        model= Assets
        fields = ['id','code','name']

class UserAssetSerializer(serializers.ModelSerializer):
    class Meta:
        model= UserAssets
        fields = ['id','asset','user','low_tunnel','top_tunnel','refresh_time']
    
    asset = AssetSerializer()

class SaveUserAssetSerializer(serializers.ModelSerializer):
    class Meta:
        model= UserAssets
        fields = ['asset','user','low_tunnel','top_tunnel','refresh_time']

class SaveAssetPriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssetPrices
        fields = ['id','asset','price']

class AssetPriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssetPrices
        fields = ['id','asset','price','created_at']
    asset = AssetSerializer()
