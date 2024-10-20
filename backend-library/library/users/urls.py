from django.urls import path
from .views import (
    home,
    RegisterView,
    LoginView,  # Use the custom LoginView instead of MyTokenObtainPairView
    MyTokenRefreshView,
    BookListView,
    ClickLogView,
    SearchView,
)

urlpatterns = [
    path("", home, name="home"),
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),  # Updated to use custom LoginView
    path("token/refresh/", MyTokenRefreshView.as_view(), name="token_refresh"),
    path("books/", BookListView.as_view(), name="book-list"),
    path("click-log/", ClickLogView.as_view(), name="click-log"),
    path('search/', SearchView.as_view(), name='search'),
]


