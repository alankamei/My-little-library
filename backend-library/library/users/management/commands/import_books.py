import csv
from django.core.management.base import BaseCommand
from users.models import Book  # Adjust based on your actual app name

class Command(BaseCommand):
    help = 'Import books from cleaned_books.csv'

    def handle(self, *args, **kwargs):
        with open('D:/2024/cleaned_books.csv', newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                book_id = int(row['book_id'])  # Ensure book_id is an integer

                # Check for unique book_id before creating
                book, created = Book.objects.get_or_create(
                    book_id=book_id,
                    defaults={
                        'title': row['title'],
                        'author': row['authors'],
                        'cover_image': row['image_url'],  # Assuming it's a URL
                        'genre': None,  # Set to None or leave out for manual entry later
                        'description': None,  # Set to None or leave out for manual entry later
                    }
                )

                if created:
                    self.stdout.write(self.style.SUCCESS(f'Added book: {book.title}'))
                else:
                    self.stdout.write(self.style.WARNING(f'Book already exists: {book.title} (ID: {book_id})'))
