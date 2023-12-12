from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

from .exceptions import PersonNotFoundException
from .serializers import PersonSerializer
from .services import PersonService
from .models import Person


class PersonView(APIView):

    def get(self, request, *args, **kwargs):
        pk = kwargs.get('pk')
        name = kwargs.get('name')

        if pk is not None:
            person = PersonService.get_detail(pk)
            person_dto = PersonSerializer(person)
            return Response(person_dto.data, status=status.HTTP_200_OK)

        elif name is not None:
            persons = PersonService.get_by_name(name)
            person_dto = PersonSerializer(persons, many=True)
            return Response(person_dto.data, status=status.HTTP_200_OK)

        else:
            persons = PersonService.get_all()
            person_dto = PersonSerializer(persons, many=True)
            return Response(person_dto.data, status=status.HTTP_200_OK)

    def post(self, request):
        try:
            person_dto = PersonSerializer(data=request.data)
            if person_dto.is_valid():
                person = PersonService.add(person_dto=person_dto.validated_data)
                return Response(PersonSerializer(person).data, status=status.HTTP_201_CREATED)
            return Response(person_dto.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
            

    def put(self, request, pk):
        try:
            person = Person.objects.get(pk=pk)
            person_dto = PersonSerializer(instance=person, data=request.data)
            if person_dto.is_valid():
                person = PersonService.update(pk, person_dto.validated_data)
                return Response(PersonSerializer(person).data, status=status.HTTP_200_OK)

            return Response(person_dto.errors, status=status.HTTP_400_BAD_REQUEST)

        except PersonNotFoundException as e:
            return Response(status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            PersonService.delete(pk)
            return Response(status=status.HTTP_204_NO_CONTENT)
        except PersonNotFoundException as e:
            return Response(status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class PersonIdealWightView(APIView):
    def get(self, request, *args, **kwargs):
        person_pk = kwargs.get('pk')
        data = PersonService.calculate_ideal_wight(person_id=person_pk)
        return JsonResponse({'ideal_weight': data})
