# Generated by Django 4.2.7 on 2023-11-12 19:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('configuracoes', '0009_alter_assetprices_price'),
    ]

    operations = [
        migrations.AlterField(
            model_name='assetprices',
            name='price',
            field=models.DecimalField(decimal_places=6, max_digits=10),
        ),
    ]