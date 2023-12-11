from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .serializers import PersonSerializer
from .services import PersonService
from .models import Person


class PersonView(APIView):

    def get(self, request, *args, **kwargs):
        pk = kwargs.get('pk')
        name = kwargs.get('name')

        if pk is not None:
            person = PersonService.get_detail(pk)
            serializer = PersonSerializer(person)
            return Response(serializer.data, status=status.HTTP_200_OK)

        elif name is not None:
            persons = PersonService.get_by_name(name)
            serializer = PersonSerializer(persons, many=True)
            return Response(serializer.data,status=status.HTTP_200_OK)

        else:
            persons = PersonService.get_all()
            serializer = PersonSerializer(persons, many=True)
            return Response(serializer.data,status=status.HTTP_200_OK)

    def post(self, request):
        serializer = PersonSerializer(data=request.data)
        if serializer.is_valid():
            person = PersonService.add(person_dto=serializer.validated_data)
            return Response(PersonSerializer(person).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        person = get_object_or_404(Person, pk=pk)
        person_dto = PersonSerializer(instance=person,data=request.data)

        if person_dto.is_valid():
            print("is valid")
            person = PersonService.update(pk, person_dto.validated_data)
            return Response(PersonSerializer(person).data)
        return Response(person_dto.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        PersonService.delete(pk)
        return Response(status=status.HTTP_204_NO_CONTENT)
