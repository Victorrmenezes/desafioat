from django.http import HttpResponse
from django.shortcuts import render
from .models import Usuario, Ativo, UsuarioAtivo
from .serializers import AtivoSerializer, UsuarioSerializer, UsuarioAtivoSerializer



def lista_ativos(request):

    query_usuario = Usuario.objects.all()[0]
    usuario = UsuarioSerializer(query_usuario)
    
    if request.method == 'GET':
        pass
    elif request.method == 'POST':
        dados = {
            'ativo':request.POST.get('id',None),
            'usuario':1
            }
        
        serializer = UsuarioAtivoSerializer(data=dados)
        serializer.is_valid(raise_exception=True)
        serializer.validated_data
        print(dados)
        try:
            serializer.save()
        except:
            print(':(')
    elif request.method == 'DELETE':
        print(request.data)
        
    

    query_ativo = Ativo.objects.prefetch_related('usuarioativo_set').filter(usuarioativo__usuario_id=usuario.data['id'])
    ativos = AtivoSerializer(query_ativo, many = True)

    query_opcoes = UsuarioAtivo.objects.filter(usuario_id=1)
    usuarioativo=UsuarioAtivoSerializer(query_opcoes, many = True)

    query_escolha = Ativo.objects.all()
    escolhas = AtivoSerializer(query_escolha, many = True)
    return render(request, "config.html", {"nome": usuario.data['nome'] ,'ativos':ativos.data, 'escolhas':escolhas.data, 'details':usuarioativo.data})