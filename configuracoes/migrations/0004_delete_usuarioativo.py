# Generated by Django 4.2.7 on 2023-11-03 12:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('configuracoes', '0003_remove_usuarioativo_low_tunnel_and_more'),
    ]

    operations = [
        migrations.DeleteModel(
            name='UsuarioAtivo',
        ),
    ]
