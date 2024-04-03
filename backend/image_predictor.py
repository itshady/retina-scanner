import tensorflow as tf
from tensorflow.keras.models import load_model
from PIL import Image
import numpy as np

class ModelHandler():
    def __init__(self):
        save_path = 'ml/model.keras'
        self.model = load_model(save_path)
        self.labels = ['moderate_npdr', 'nodr', 'pdr']
        

    def predict(self, image):
        """
        This 

        Parameters:
        image (PIL.Image.Image): image to be predicted

        Returns:
        str: classification of image
        """
        # resize image for model
        resized_image = image.resize((256, 256), Image.LANCZOS)

        # get array from image
        image_array = tf.keras.preprocessing.image.img_to_array(resized_image)

        # get image_tensor to predict
        image_tensor = tf.expand_dims(image_array, axis=0)

        # predict category of image
        res = self.model.predict(image_tensor)
        predicted_classes = np.argmax(res, axis=1)
        predicted_category = self.labels[predicted_classes[0]]

        return predicted_category

        