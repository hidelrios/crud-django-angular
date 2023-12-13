from django.db import models
from decimal import Decimal

# Create your models here.

class Person(models.Model):
    SEX_CHOICES = (
        ("M", "Masculino"),
        ("F", "Feminino")
    )

    name = models.CharField(max_length=100)
    birth_date = models.DateField()
    cpf = models.CharField(max_length=11, unique=True)
    sex = models.CharField(max_length=1, choices=SEX_CHOICES)
    height = models.FloatField()
    weight = models.FloatField()


    @staticmethod
    def calculate_ideal_weight(sex, height):
        if sex == "M":
            return round(Decimal((72.7 * height) - 58),2)
        elif sex == "F":
            return round(Decimal((62.1 * height) - 44.7),2)


