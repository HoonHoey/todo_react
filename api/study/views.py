from django.shortcuts import render
from rest_framework.decorators import api_view
from .models import Students, Scores
from .serializers import StudentSerializer, ScoreSerializer
from rest_framework.response import Response

# Create your views here.
@api_view(['GET'])
def StudentView(request):
    qs = Students.objects.all()
    serializer = StudentSerializer(qs, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def ScoreView(request):
    qs = Scores.objects.all()
    serializer = ScoreSerializer(qs, many=True)
    return Response(serializer.data)