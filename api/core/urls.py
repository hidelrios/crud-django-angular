from django.urls import path

from .views import PersonView

urlpatterns = [
    path("person", PersonView.as_view(),name='list_persons'),
    path("person/<int:pk>/", PersonView.as_view()),
    path("person/<str:name>/", PersonView.as_view()),
]