
from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# import pandas as pd
# from .mymodel import recommend_books
# import numpy as np  # If needed

# Global variables
# train_df = pd.read_csv(r'D:\2024\train_books.csv')
# tfidf = TfidfVectorizer(stop_words='english')
# tfidf_matrix = tfidf.fit_transform(train_df['combined'])
# cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)


from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenBlacklistView

from .models import CustomUser, Book, ClickLog
from .serializers import UserRegisterSerializer, LoginSerializer, BookSerializer

# Home view
def home(request):
    
    return render(request, "home.html")

# User Registration
class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserRegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "Registration successful"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# User Login
class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data["email"]
        password = serializer.validated_data["password"]
        user = authenticate(email=email, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                "message": "Login successful!",
                "username": user.username,
                "email": user.email,
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            }, status=status.HTTP_200_OK)

        return Response({"error": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED)

# User Deletion (Superuser only)
User = get_user_model()
class UserDeleteView(generics.DestroyAPIView):
    queryset = CustomUser.objects.all()
    permission_classes = [IsAuthenticated]

    def perform_destroy(self, instance):
        if self.request.user.is_superuser:
            instance.delete()

# Token-based views
class MyTokenObtainPairView(TokenObtainPairView):
    pass

class MyTokenRefreshView(TokenRefreshView):
    pass

# Book Views
class BookCreateView(generics.CreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class BookListView(generics.ListAPIView):
    queryset = Book.objects.all()  # Get all books
    serializer_class = BookSerializer

    def get_queryset(self):
        # Shuffle the queryset and return the first 8 books
        return Book.objects.order_by('?')[:8]

# Click Log
class ClickLogView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        book_id = request.data.get('book')
        try:
            book = Book.objects.get(id=book_id)
            ClickLog.objects.create(user=request.user, book=book)
            book.click_count += 1  # Increment click count
            book.save()
            return Response({"message": "Click logged successfully!"}, status=status.HTTP_201_CREATED)
        except Book.DoesNotExist:
            return Response({"error": "Book not found."}, status=status.HTTP_404_NOT_FOUND)



# Logout View (optional, if needed)
class LogoutView(TokenBlacklistView):
    pass



# views.py
from rest_framework import generics
from .models import Book, SearchLog
from .serializers import BookSerializer, SearchLogSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q  # Import Q for complex queries

class SearchView(generics.GenericAPIView):
    serializer_class = BookSerializer
    permission_classes = [IsAuthenticated]  # Ensure the user is authenticated

    def get(self, request):
        query = request.query_params.get('query', '')
        user = request.user

        # Log the search
        SearchLog.objects.create(user=user, search_term=query)

        # Search for books based on title, author, or genre
        results = Book.objects.filter(
            Q(title__icontains=query) |
            Q(author__icontains=query) |
            Q(genre__icontains=query)
        )
        serializer = self.get_serializer(results, many=True)
        return Response(serializer.data)
























