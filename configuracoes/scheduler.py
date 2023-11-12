import time
from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler
from .models import UserAssets
from .serializers import UserAssetSerializer

def send_email():
    print('Email sent')


def schedule_api(item):
    # query = UserAssets.objects.all()
    # a = UserAssetSerializer(query, many=True)
    # print(a.data)
    print(item,datetime.now())

def start():
    scheduler = BackgroundScheduler()
    
    query = UserAssets.objects.all()
    a = UserAssetSerializer(query, many=True)
    
    for l in query:
        print(l.refresh_time)
        scheduler.add_job( lambda l=l:   schedule_api(l.asset.code), 'interval', seconds=l.refresh_time)
    scheduler.start()