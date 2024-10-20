import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Load your dataset
df = pd.read_csv('path_to_your_cleaned_books.csv')

# Preprocess and create the combined column
df['combined'] = df['title'].str.lower() + ' ' + df['authors'].str.lower()

# Vectorization and similarity calculation
tfidf = TfidfVectorizer()
tfidf_matrix = tfidf.fit_transform(df['combined'])
cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

def recommend_book(title, author):
    input_combined = f"{title.lower()} {author.lower()}"
    if input_combined not in df['combined'].values:
        return "Book not found."
    idx = df[df['combined'] == input_combined].index[0]
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    top_books = [df['title'].iloc[i[0]] for i in sim_scores[1:6]]
    return top_books
