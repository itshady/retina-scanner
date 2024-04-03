from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
from PIL import Image
from io import BytesIO

from image_predictor import ModelHandler

app = Flask(__name__)
CORS(app)

modelHandler = ModelHandler()

@app.route('/ping/<int:id>', methods=['GET'])
def ping_pong(id):
  return 'pong ' + str(id+1)

@app.route('/upload', methods=['POST'])
def upload_image():
  data = request.json
  if 'image' not in data:
    return jsonify({'message': 'No Image Received'}), 400
  image_data = data['image'].split(",")[1]  # Remove the prefix "data:image/jpeg;base64,"
  image = Image.open(BytesIO(base64.b64decode(image_data)))

  res = modelHandler.predict(image)

  return jsonify({'message': res}), 200

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=80)
