from django.http import HttpResponse
from django.shortcuts import render,redirect, get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from .models import Users, Assets, UserAssets
from .serializers import AssetSerializer, UserSerializer, UserAssetSerializer

@api_view(['GET'])
def list_assets(request):

    # SEARCH FOR THE CURRENT USER_ID
    # query_user = Users.objects.all()[0]
    # user = UserSerializer(query_user) 
    

    # query_ativo = Assets.objects.prefetch_related('userassets_set').filter(userassets__user_id=user.data['id'])
    # assets = AssetSerializer(query_ativo, many = True)

    query_options = UserAssets.objects.filter(user_id=1).select_related('asset')
    userasset=UserAssetSerializer(query_options, many = True)

    return Response(userasset.data, status=status.HTTP_200_OK)

@api_view(['POST'])
def add_asset(request):
    if request.method == 'POST':
        data_asset = {
            'asset':int(request.POST.get('id',0)),
            'user':1,
            'low_tunnel':float(request.POST.get('low_tunnel',0)),
            'top_tunnel':float(request.POST.get('top_tunnel',0)),
            'refresh_time':int(request.POST.get('refresh_time',5))
            }
        print(data_asset)
        serializer = UserAssetSerializer(data=data_asset)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return redirect('list')
    else:
        return redirect('list')

def login(request):
    if request.method == 'GET':
        return render(request,'login.html')
    elif request.method == 'POST':
        user_email = request.POST.get('email',None)
        user_password = request.POST.get('password',None)

        query_user = Users.objects.filter(email=user_email)
        user = UserAssetSerializer(query_user)
        print(user.data)
        return redirect('login')

@api_view(['DELETE'])
@csrf_exempt
def delete_asset(request,id):
    try:
        order = UserAssets.objects.filter(id=id)
        order.delete()
        return Response({"message": "Order deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
    except UserAssets.DoesNotExist:
        return Response({"error": "Order not found."}, status=status.HTTP_404_NOT_FOUND)