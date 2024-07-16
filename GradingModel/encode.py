import base64

def encode(input_file_path):
    with open(input_file_path, 'rb') as mp3_file:
        mp3_data = mp3_file.read()

    base64_encoded_mp3 = base64.b64encode(mp3_data).decode('utf-8')
    return base64_encoded_mp3
