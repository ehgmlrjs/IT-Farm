from django.db import models

class Farm_products(models.Model):
    eco = models.CharField(max_length=100,null=False) # 친환경
    kind = models.CharField(max_length=100,null=False) # 품종
    crop = models.IntegerField(default=0,null=False) # 수확량
    unit_type = models.BooleanField(default=True) # 수확량 단위
    created_at = models.DateTimeField(auto_now_add=True) # 등록일자
    updated_at = models.DateTimeField(auto_now=True) # 수정일자