from rest_framework.serializers import ModelSerializer
from .models import Students, Scores

class StudentSerializer(ModelSerializer):
    class Meta:
        model = Students
        fields = ['name', 'address', 'email'] 

class ScoreSerializer(ModelSerializer):
    class Meta:
        model = Scores
        fields = '__all__'