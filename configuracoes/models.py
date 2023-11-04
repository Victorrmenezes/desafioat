from django.db import models


class Users(models.Model):
    f_name = models.CharField(max_length=255)
    s_name = models.CharField(max_length=255)
    email = models.EmailField()
    cpf = models.CharField(max_length=11)
    birth_date = models.DateField()

class Assets(models.Model):
    code = models.CharField(max_length=5)
    name = models.CharField(max_length=255)
    industry = models. CharField(max_length=255)

class UserAssets(models.Model):
    asset = models.ForeignKey(Assets, on_delete=models.CASCADE)
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    low_tunnel = models.DecimalField(max_digits=6, decimal_places=2,null=True)
    top_tunnel = models.DecimalField(max_digits=6, decimal_places=2,null=True)  