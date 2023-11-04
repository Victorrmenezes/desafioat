from rest_framework import serializers
from .models import Ativo, Usuario, UsuarioAtivo


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model= Usuario
        fields = ['id','nome','email']


class AtivoSerializer(serializers.ModelSerializer):
    class Meta:
        model= Ativo
        fields = ['id','sigla','nome','industria']

class UsuarioAtivoSerializer(serializers.ModelSerializer):
    class Meta:
        model= UsuarioAtivo
        fields = ['ativo','usuario']

