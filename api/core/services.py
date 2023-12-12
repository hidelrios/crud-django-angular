# pessoas/services.py
from django.http import JsonResponse

from .exceptions import PersonNotFoundException
from .models import Person
from decimal import Decimal

class PersonService:

    def add(person_dto):
        try:
            return Person.objects.create(
                name=person_dto.get('name'),
                birth_date=person_dto.get('birth_date'),
                cpf=person_dto.get('cpf'),
                sex=person_dto.get('sex'),
                height=person_dto.get('height'),
                weight=person_dto.get('weight'),
            )
        except Exception as e:
            raise e

    @classmethod
    def get_all(cls):
        return Person.objects.all()
    
    @classmethod
    def get_by_name(self, name: str):
        try: 
            return Person.objects.filter(name=name)
        except Person.DoesNotExist:
            raise PersonNotFoundException("Person not found")
        except Exception as e:
            raise e
        
    @classmethod
    def get_detail(cls, person_id: int):
        try: 
            return Person.objects.get(pk=person_id)
        except Person.DoesNotExist:
            raise PersonNotFoundException("Person not found")
        except Exception as e:
            raise e
        
    @classmethod
    def update(cls, person_id, person_dto):
        try:
            person = Person.objects.get(pk=person_id)
            for key, value in person_dto.items():
                setattr(person, key, value)
            person.save()
            return person
        except Person.DoesNotExist:
            raise PersonNotFoundException("Person not found")
        except Exception as e:
            raise e
        
    @classmethod
    def delete(cls, person_id: int):
        try:
            person = Person.objects.get(pk=person_id)
            person.delete()
        except Person.DoesNotExist:
            raise PersonNotFoundException("Person not found")
        except Exception as e:
            raise e


    def calculate_ideal_wight(person_id: int):
        try:
            person = Person.objects.get(pk=person_id)
            return person.calculate_ideal_weight(sex=person.sex, height=person.height)
        except Person.DoesNotExist:
            raise PersonNotFoundException("Person not found")
        except Exception as e:
            raise e
