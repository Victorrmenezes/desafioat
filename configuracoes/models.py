from django.db import models


class Usuario(models.Model):
    nome = models.CharField(max_length=255)
    sobrenome = models.CharField(max_length=255)
    email = models.EmailField()
    cpf = models.CharField(max_length=11)
    data_nascimento = models.DateField()

class Ativo(models.Model):
    sigla = models.CharField(max_length=5)
    nome = models.CharField(max_length=255)
    industria = models. CharField(max_length=255)

class UsuarioAtivo(models.Model):
    ativo = models.ForeignKey(Ativo, on_delete=models.CASCADE)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    low_tunnel = models.DecimalField(max_digits=6, decimal_places=2,null=True)
    top_tunnel = models.DecimalField(max_digits=6, decimal_places=2,null=True)  