from django.db import models


class Users(models.Model):
    f_name = models.CharField(max_length=255)
    s_name = models.CharField(max_length=255)
    email = models.EmailField()
    cpf = models.CharField(max_length=11)
    birth_date = models.DateField()
    password = models.CharField(max_length=255)

class Assets(models.Model):
    code = models.CharField(max_length=10)
    name = models.CharField(max_length=255)

class UserAssets(models.Model):
    asset = models.ForeignKey(Assets, on_delete=models.CASCADE)
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    low_tunnel = models.DecimalField(max_digits=6, decimal_places=2,null=True)
    top_tunnel = models.DecimalField(max_digits=6, decimal_places=2,null=True)  
    refresh_time = models.IntegerField()

class AssetPrices(models.Model):
    asset = models.ForeignKey(Assets, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=6,decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    