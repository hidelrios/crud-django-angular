# pessoas/services.py
from .models import Person
from decimal import Decimal

class PersonService:

    def add(person_dto):
        return Person.objects.create(
            name=person_dto.get('name'),
            birth_date=person_dto.get('birth_date'),
            cpf=person_dto.get('cpf'),
            sex=person_dto.get('sex'),
            height=person_dto.get('height'),
            weight=person_dto.get('weight'),
        )

    @classmethod
    def get_all(cls):
        return Person.objects.all()
    
    @classmethod
    def get_by_name(self, name: str):
        return Person.objects.filter(name=name)
    
    @classmethod
    def get_detail(cls, person_id: int):
        return Person.objects.get(pk=person_id)
    
    @classmethod
    def update(cls, person_id, person_dto):
        person = Person.objects.get(pk=person_id)

        for key, value in person_dto.items():
            setattr(person, key, value)
        person.save()
        return person
    
    @classmethod
    def delete(cls, person_id: int):
        person = Person.objects.get(pk=person_id)
        person.delete()