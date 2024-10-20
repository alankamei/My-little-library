




from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager

# Custom user manager
class CustomUserManager(UserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

# Custom user model
class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)  # Ensure email is unique

    objects = CustomUserManager()  # Use the custom UserManager

    def __str__(self):
        return self.username

# Book model

class Book(models.Model):
    book_id = models.IntegerField(unique=True)  # book_id must be unique
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    cover_image = models.URLField(null=True, blank=True)  # URL for the cover image
    genre = models.CharField(max_length=100, null=True, blank=True)  # Allow null for genre
    description = models.TextField(null=True, blank=True)  # Allow null for description
    click_count = models.IntegerField(default=0)

    def __str__(self):
        return self.title

# class Book(models.Model):
#     title = models.CharField(max_length=255)
#     author = models.CharField(max_length=255)
#     genre = models.CharField(max_length=100)
#     description = models.TextField()
#     cover_image = models.ImageField(upload_to='book_covers/', null=True, blank=True)
#     click_count = models.IntegerField(default=0)  # Add click count field

#     def __str__(self):
#         return self.title


# ClickLog model
class ClickLog(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)  # Use CustomUser here
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} clicked on {self.book.title} on {self.timestamp}"

# SearchLog model
class SearchLog(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)  # Use CustomUser here
    search_term = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} searched for {self.search_term} on {self.timestamp}"













