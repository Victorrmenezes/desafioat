from django.http import HttpResponse
from django.shortcuts import render,redirect, get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Users, Assets, UserAssets
from .serializers import AssetSerializer, UserSerializer, UserAssetSerializer

@api_view(['GET'])
def list_assets(request):

    # SEARCH FOR THE CURRENT USER_ID
    query_user = Users.objects.all()[0]
    user = UserSerializer(query_user) 
    

    query_ativo = Assets.objects.prefetch_related('userassets_set').filter(userassets__user_id=user.data['id'])
    assets = AssetSerializer(query_ativo, many = True)

    query_options = UserAssets.objects.filter(user_id=1)
    userassset=UserAssetSerializer(query_options, many = True)

    query_choices= Assets.objects.all()
    choices = AssetSerializer(query_choices, many = True)
    return Response(choices.data)

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

def delete_asset(request,id):
    return HttpResponse('ok')