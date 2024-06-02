from flask import Flask, request, jsonify

app = Flask(__name__)

# Define your machine learning model and prediction logic here

@app.route('/')
def index():
    return 'Welcome to the Car Price Prediction API'

@app.route('/predict', methods=['POST'])
def predict_price():
    data = request.json
    # Use your trained ML model to predict the price
    # Replace this with your actual prediction logic
    predicted_price = 10000  # Placeholder value
    return jsonify({'predicted_price': predicted_price})

if __name__ == '__main__':
    app.run(debug=True)
