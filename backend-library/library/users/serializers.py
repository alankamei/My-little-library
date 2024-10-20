

from rest_framework import serializers
from .models import CustomUser, Book, ClickLog
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate

User = get_user_model()

# User Registration Serializer
class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser(**validated_data)
        user.set_password(validated_data['password'])  # Hash the password
        user.save()
        return user

# Login Serializer
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        user = authenticate(email=attrs.get('email'), password=attrs.get('password'))
        if user is None:
            raise serializers.ValidationError("Invalid email or password.")
        return attrs

# Book Serializer
class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'genre', 'description', 'cover_image']

# Click Log Serializer
class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'genre', 'description', 'cover_image', 'click_count']


# serializers.py
from rest_framework import serializers
from .models import SearchLog

class SearchLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = SearchLog
        fields = '__all__'


























