# Generated by Django 4.2.7 on 2023-11-11 20:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('configuracoes', '0005_assetprices'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='assets',
            name='industry',
        ),
    ]
