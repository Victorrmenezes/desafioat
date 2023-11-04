from django.http import HttpResponse
from django.shortcuts import render,redirect
from .models import Users, Assets, UserAssets
from .serializers import AssetSerializer, UserSerializer, UserAssetSerializer



def list_assets(request):

    # SEARCH FOR THE CURRENT USER_ID
    query_user = Users.objects.all()[0]
    user = UserSerializer(query_user)
    
    if request.method == 'GET':
        pass

    elif request.method == 'DELETE':
        print(request.data)
        
    

    query_ativo = Assets.objects.prefetch_related('userassets_set').filter(userassets__user_id=user.data['id'])
    assets = AssetSerializer(query_ativo, many = True)

    query_options = UserAssets.objects.filter(user_id=1)
    userassset=UserAssetSerializer(query_options, many = True)

    query_choices= Assets.objects.all()
    choices = AssetSerializer(query_choices, many = True)
    return render(request, "config.html", {"name": user.data['f_name'] ,'assets':assets.data, 'choices':choices.data, 'details':userassset.data})

def add_asset(request):
    if request.method == 'POST':
        data_asset = {
            'asset':int(request.POST.get('id',0)),
            'user':1,
            'low_tunnel':float(request.POST.get('low_tunnel',0)),
            'top_tunnel':float(request.POST.get('top_tunnel',0))
            }
        print(data_asset)
        serializer = UserAssetSerializer(data=data_asset)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        list_assets(request)
        return HttpResponse('ok')
    else:
        return HttpResponse('Other Method')
    
def login(request):
    if request.method == 'GET':
        return render(request,'login.html')
    elif request.method == 'POST':
        email = request.POST.get('email',None)
        password = request.POST.get('password',None)
        print(email)
        print(password)
        return redirect('list')

    