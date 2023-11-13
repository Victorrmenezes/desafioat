import time
from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler
from .models import UserAssets, AssetPrices
from .serializers import SaveAssetPriceSerializer
from yahooquery import Ticker



def send_email():
    print('Email sent')


def schedule_api(item):
    print('ok')
    # tk = Ticker(item.asset.code + '.SA')

    # new_price = {
    #     'asset' : item.asset.id,
    #     'price' : round(tk.history(period='1d')['close'].values[0],4)
    # }
     
    # serializer = SaveAssetPriceSerializer(data=new_price)

    # if serializer.is_valid():
    #     serializer.save()      
    #     print(serializer.data , 'ok')
    # else:
    #     print(serializer.errors)

def start():
    scheduler = BackgroundScheduler()
    
    query = UserAssets.objects.all()

    for q in query:
        scheduler.add_job( lambda q=q:   schedule_api(q), 'interval', seconds=q.refresh_time, max_instances=1)
    scheduler.start()