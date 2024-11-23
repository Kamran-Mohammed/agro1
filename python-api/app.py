from flask_cors import CORS
from flask import Flask, request, jsonify
import tensorflow as tf  # or import torch if using PyTorch
import numpy as np

app = Flask(__name__)
CORS(app)  # This will enable cross-origin requests to your API

# Load your pre-trained model
model = tf.keras.models.load_model('path_to_your_model.h5')  # TensorFlow/Keras model
# or for PyTorch:
# model = torch.load('path_to_your_model.pth')

@app.route("/predict", methods=["POST"])
def predict():
    try:
        # Get the input data from the POST request
        input_data = request.get_json()['input']  # Expecting input as a list or array

        # Convert input data into an array/tensor suitable for the model
        input_array = np.array(input_data)

        # Make predictions (adjust based on the model type)
        if isinstance(model, tf.keras.Model):  # For TensorFlow/Keras
            input_tensor = tf.convert_to_tensor(input_array)
            prediction = model.predict(input_tensor)
        else:  # For PyTorch
            input_tensor = torch.tensor(input_array)
            model.eval()  # Set the model to evaluation mode
            with torch.no_grad():
                prediction = model(input_tensor)

        # Convert prediction to a list and send as response
        return jsonify({"prediction": prediction.tolist()})
    
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Error in prediction"}), 500

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
