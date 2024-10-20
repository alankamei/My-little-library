

from django.contrib import admin
from .models import CustomUser, Book, ClickLog, SearchLog

# Register CustomUser, ClickLog, and SearchLog without specific admin customizations
admin.site.register(CustomUser)
admin.site.register(ClickLog)
admin.site.register(SearchLog)


# Custom admin for Book
class BookAdmin(admin.ModelAdmin):
    list_display = ('title', 'author','book_id', 'genre', 'description', 'click_count', 'cover_image')  # Display these fields in the list view
    fields = ('title', 'author', 'genre', 'description', 'click_count', 'cover_image')  # Display these fields in the detail view
    search_fields = ('title', 'author', 'genre')  # Enable search by title, author, or genre
    list_filter = ('genre',)  # Optional: add filters for the genre

# Register Book with custom admin
admin.site.register(Book, BookAdmin)
