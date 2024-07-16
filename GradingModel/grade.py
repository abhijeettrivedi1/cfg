from nltk.tokenize import word_tokenize
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def preprocess_text(text):
    text = text.lower()
    text = "".join([c for c in text if c.isalnum() or c.isspace()])
    text = " ".join(text.split())
    return text

def calculate_similarity(reference_text, student_text):
    # Tokenizing
    reference_tokens = ' '.join(word_tokenize(preprocess_text(reference_text)))
    student_tokens = ' '.join(word_tokenize(preprocess_text(student_text)))

    # Calculating Cosine Similarity
    vectorizer = CountVectorizer().fit([reference_tokens, student_tokens])
    vectorized_text = vectorizer.transform([reference_tokens, student_tokens])
    similarity_score = cosine_similarity(vectorized_text[0], vectorized_text[1])[0, 0]

    return similarity_score

def grade_student(reference_text, student_text):
    similarity_score = calculate_similarity(reference_text, student_text)
    print(f"{similarity_score=}")
    if similarity_score >= 0.5:
        return 1, similarity_score
    else:
        return 0, similarity_score

import base64

def encode(input_file_path):
    with open(input_file_path, 'rb') as mp3_file:
        mp3_data = mp3_file.read()

    base64_encoded_mp3 = base64.b64encode(mp3_data).decode('utf-8')

    return base64_encoded_mp3
