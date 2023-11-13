import time
from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler
from yahooquery import Ticker
from django.core.mail import send_mail
from .models import UserAssets, AssetPrices
from .serializers import SaveAssetPriceSerializer


def send_email(item,msg,price):
    message = f"""
                Olá investidor,

                O ativo {item.asset.code} que você está monitorando está em posição de {msg} com a cotação de:
                R$ {price:.2f}
                """
    # try:
    #     send_mail(
    #         'Alteração em ativo monitorado',
    #         message,
    #         'victorrmenezes9@gmail.com',
    #         ['victorrmenezes9@gmail.com'],
    #     )
    # except Exception as e:
    #     print(e)


def schedule_api(item):

    tk = Ticker(item.asset.code + '.SA')

    last_price = tk.history(period='1d')['close'].values[0]
    

    if last_price < item.low_tunnel:
        send_email(item,'compra',last_price)
    elif last_price > item.top_tunnel:
        send_email(item,'venda',last_price)
    else:
        pass

    new_price = {
        'asset' : item.asset.id,
        'price' : round(last_price,4)
    }
     
    serializer = SaveAssetPriceSerializer(data=new_price)

    if serializer.is_valid():
        pass
        # serializer.save()
    else:
        print(serializer.errors)

def start():
    scheduler = BackgroundScheduler()
    
    query = UserAssets.objects.all()

    for q in query:
        scheduler.add_job( lambda q=q:   schedule_api(q), 'interval', minutes=q.refresh_time , max_instances=1)
    scheduler.start()