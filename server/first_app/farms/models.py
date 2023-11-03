from django.db import models

class Farms(models.Model):
    name = models.CharField(max_length=100, null=False) # 농장명
    user_id = models.IntegerField(null=False) # 유저 id
    area = models.IntegerField(default=0,null=False) # 평수
    mail_number = models.IntegerField(default=00000,null=False,unique=True) # 우편번호
    address = models.CharField(max_length=100,null=False) # 주소
    address_detail = models.CharField(max_length=100,null=False) # 상세주소
    center = models.CharField(max_length=100,null=False) # 센터
    method = models.CharField(max_length=100,null=False) # 재배방법
    quantity = models.IntegerField(default=0,null=False) # 재식수량
    created_at = models.DateTimeField(auto_now_add=True) # 작성일자
    updated_at = models.DateTimeField(auto_now=True) # 수정일자