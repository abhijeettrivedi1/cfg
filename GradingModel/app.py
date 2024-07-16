import os
from flask import Flask, request, jsonify
import requests
from grade import grade_student, encode
from flask_cors import CORS

app = Flask(__name__)

UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

file_path = ''
language = ''

@app.route('/')
def home():
    return "All Good"

def encode_data(path):
    return encode(path)

@app.route('/grade', methods=['POST', 'GET'])
def grade():
    global file_path, language
    data = request.json
    reference_text = data['reference_text']  # Get original answer text from request
    language = data['language']  # Get language from request
    file_path = os.path.join(UPLOAD_FOLDER, 'input.mp3')  # Define file path
    language_model_map = {
        "English": "641c0be440abd176d64c3f92",
        "Hindi": "660e9d6a3d23f057bbb012ce",
        "Marathi": "660e9daf3d23f057bbb012cf"
    }
    source_model_map = {
        "English": "en",
        "Hindi": "hi",
        "Marathi": "mr"
    }
    body = {
        "modelId": language_model_map[language],
        "task": "asr",
        "audioContent": encode_data(file_path),
        "source": source_model_map[language],
        "userId": None
    }
    headers = {
        'Content-Type': 'application/json'
    }
    url = "https://meity-auth.ulcacontrib.org/ulca/apis/asr/v1/model/compute"

    try:
        response = requests.post(url, json=body, headers=headers)
        response.raise_for_status()  # Raise an exception for HTTP errors
    except requests.exceptions.RequestException as e:
        return jsonify({'error': f'Request to external API failed: {str(e)}'}), 500

    response_json = response.json()

    # Log the entire response for debugging
    print("Response JSON from external API:", response_json)

    # Check if 'data' is in the response and has a 'source' key
    if 'data' not in response_json or 'source' not in response_json['data']:
        return jsonify({'error': 'Unexpected response format from the external API', 'response': response_json}), 500

    # Extract the student_text
    student_text = response_json['data'].get('source', '')

    # Check if student_text is empty
    if not student_text:
        return jsonify({'error': 'No transcribed text found in the response', 'response': response_json}), 500

    flag, percentage = grade_student(reference_text, student_text)
    mssg = "Pass" if flag else "Fail"
    return jsonify({'Message': mssg, 'Percentage': percentage * 100}), 200


@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    filename = 'input.mp3'
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)

    return jsonify({'message': f'File uploaded successfully to {filepath}'}), 201

CORS(app)

if __name__ == '__main__':
    app.run(debug=True)
