from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render,redirect, get_object_or_404
from django.http import HttpResponse
from django.db.models import F

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Users, Assets, UserAssets, AssetPrices
from .serializers import AssetSerializer, UserAssetSerializer, SaveUserAssetSerializer, AssetPriceSerializer


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
    print(asset.data)
    
    query = AssetPrices.objects.filter(asset_id=asset.data['id']).select_related('asset').order_by('-created_at')
    userasset = AssetPriceSerializer(query, many=True)  
    
    return Response(userasset.data, status=status.HTTP_200_OK)

@api_view(['POST'])
def add_asset(request):
    if request.method == 'POST':
        serializer = SaveUserAssetSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data,status=status.HTTP_201_CREATED)
    else:
        return Response(status.HTTP_400_BAD_REQUEST)

def login(request):
    if request.method == 'GET':
        return render(request,'login.html')
    elif request.method == 'POST':
        user_email = request.POST.get('email',None)
        user_password = request.POST.get('password',None)

        query_user = Users.objects.filter(email=user_email)
        user = AssetPriceSerializer(query_user)
        print(user.data)
        return redirect('login')

@api_view(['DELETE'])
@csrf_exempt
def delete_asset(request,id):
    try:
        asset = UserAssets.objects.filter(id=id)
        asset.delete()
        return Response({"message": "Asset deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
    except UserAssets.DoesNotExist:
        return Response({"error": "Asset not found."}, status=status.HTTP_404_NOT_FOUND)