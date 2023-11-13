from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render,redirect

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from apscheduler.schedulers.background import BackgroundScheduler

from .models import Users, Assets, UserAssets, AssetPrices
from .serializers import AssetSerializer, UserAssetSerializer, SaveUserAssetSerializer, AssetPriceSerializer
from .scheduler import schedule_api

@api_view(['GET'])
def list_assets(request):

    query = UserAssets.objects.filter(user_id=1).select_related('asset')
    userasset=UserAssetSerializer(query, many = True)
    
    return Response(userasset.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def market_assets(request):

    query = Assets.objects.exclude(userassets__user_id=1)
    asset = AssetSerializer(query, many = True)
    return Response(asset.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def asset_details(request,id):
    querya = Assets.objects.filter(userassets__id=id).first()
    asset = AssetSerializer(querya)
    
    query = AssetPrices.objects.filter(asset_id=asset.data['id']).select_related('asset').order_by('-created_at')
    userasset = AssetPriceSerializer(query, many=True)  
    
    return Response(userasset.data, status=status.HTTP_200_OK)

@api_view(['POST'])
def add_asset(request):
    if request.method == 'POST':
        serializer = SaveUserAssetSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()


        query = UserAssets.objects.filter(asset=request.data['id']).first()
        
        schedule_api(query)
        scheduler = BackgroundScheduler()
        scheduler.add_job( lambda q=query:   schedule_api(q), 'interval', minutes=query.refresh_time , max_instances=1)
        scheduler.start()
        return Response(serializer.data,status=status.HTTP_201_CREATED)
    else:
        return Response(status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@csrf_exempt
def delete_asset(request,id):
    try:
        asset = UserAssets.objects.filter(id=id)
        asset.delete()
        return Response({"message": "Asset deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
    except UserAssets.DoesNotExist:
        return Response({"error": "Asset not found."}, status=status.HTTP_404_NOT_FOUND)