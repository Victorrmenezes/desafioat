# Generated by Django 4.2.7 on 2023-11-11 20:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('configuracoes', '0006_remove_assets_industry'),
    ]

    operations = [
        migrations.AlterField(
            model_name='assets',
            name='code',
            field=models.CharField(max_length=6),
        ),
    ]
