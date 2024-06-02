import streamlit as st
import joblib
import pandas as pd
import numpy as np

# Load models
electrical_model = joblib.load('models/electrical_random_forest_model_new.pkl')
electrical_scaler = joblib.load('models/electrical_min_max_scaler.pkl')
newcars_pipeline = joblib.load('models/newcars-pipe_new.pkl')
oldcars_pipeline = joblib.load('models/oldcars-pipe_new.pkl')

# Load datasets for selection
electrical_data = pd.read_csv('data/cleaned/electeric_clean.csv')
newcars_data = pd.read_csv('data/cleaned/new_cleaned.csv')
oldcars_data = pd.read_csv('data/cleaned/old_cleaned.csv')

# Function to predict electrical car prices
def predict_electrical(input_data):
    input_data = np.array(input_data).reshape(1, -1)
    X_test_scaled = electrical_scaler.transform(input_data)
    predictions = electrical_model.predict(X_test_scaled)
    return predictions[0]

# Function to predict new fuel car prices
def predict_new_car(input_data):
    new_data_df = pd.DataFrame([input_data])
    prediction = newcars_pipeline.predict(new_data_df)
    return prediction[0]

# Function to predict old fuel car prices
def predict_old_car(input_data):
    input_data_df = pd.DataFrame([input_data])
    prediction = oldcars_pipeline.predict(input_data_df)
    return prediction[0]

# Streamlit app
st.title('Car Price Prediction')

car_type = st.selectbox('Select Car Type', ['Electrical', 'New Car Fuel', 'Old Car Fuel'])

if car_type == 'Electrical':
    st.subheader('Input Electrical Car Features')
    battery = st.selectbox('Battery', electrical_data['Battery'].unique())
    efficiency = st.selectbox('Efficiency', electrical_data['Efficiency'].unique())
    fast_charge = st.selectbox('Fast Charge', electrical_data['Fast_charge'].unique())
    range_ = st.selectbox('Range', electrical_data['Range'].unique())
    top_speed = st.selectbox('Top Speed', electrical_data['Top_speed'].unique())
    acceleration = st.selectbox('Acceleration (0-100)', electrical_data['acceleration..0.100.'].unique())

    input_data = [battery, efficiency, fast_charge, range_, top_speed, acceleration]
    if st.button('Predict Price'):
        result = predict_electrical(input_data)
        st.write(f'Predicted Price: {result}')

elif car_type == 'New Car Fuel':
    st.subheader('Input New Fuel Car Features')
    car_name = st.selectbox('Car Name', newcars_data['CarName'].unique())
    fuel_type = st.selectbox('Fuel Type', newcars_data['fueltype'].unique())
    engine = st.selectbox('Engine', newcars_data['engine'].unique())

    input_data = {'CarName': car_name, 'fueltype': fuel_type, 'engine': engine}
    if st.button('Predict Price'):
        result = predict_new_car(input_data)
        st.write(f'Predicted Price: {result}')

elif car_type == 'Old Car Fuel':
    st.subheader('Input Old Fuel Car Features')
    car_name = st.selectbox('Car Name', oldcars_data['CarName'].unique())
    fuel_type = st.selectbox('Fuel Type', oldcars_data['fueltype'].unique())
    accident = st.selectbox('Accident', oldcars_data['accident'].unique())
    milage = st.selectbox('Milage', oldcars_data['milage'].unique())
    model_year = st.selectbox('Model Year', oldcars_data['model_year'].unique())
    ext_col = st.selectbox('Exterior Color', oldcars_data['ext_col'].unique())
    int_col = st.selectbox('Interior Color', oldcars_data['int_col'].unique())
    hp = st.selectbox('HP', oldcars_data['HP'].unique())
    motor_size = st.selectbox('Motor Size', oldcars_data['motor_size'].unique())
    cylinders = st.selectbox('Cylinders', oldcars_data['cylinders'].unique())

    input_data = {
        'CarName': car_name, 'fueltype': fuel_type, 'accident': accident,
        'milage': milage, 'model_year': model_year, 'ext_col': ext_col,
        'int_col': int_col, 'HP': hp, 'motor_size': motor_size, 'cylinders': cylinders
    }
    if st.button('Predict Price'):
        result = predict_old_car(input_data)
        st.write(f'Predicted Price: {result}')



# save models locally
# import joblib
# from sklearn.ensemble import RandomForestRegressor
# from sklearn.pipeline import Pipeline
# from sklearn.preprocessing import MinMaxScaler

# # Load models with old version of scikit-learn
# electrical_model_old = joblib.load('models/electrical_random_forest_model.pkl')
# newcars_pipeline_old = joblib.load('models/newcars-pipe.pkl')
# oldcars_pipeline_old = joblib.load('models/oldcars-pipe.pkl')

# # Save models with current version of scikit-learn
# joblib.dump(electrical_model_old, 'models/electrical_random_forest_model_new.pkl')
# joblib.dump(newcars_pipeline_old, 'models/newcars-pipe_new.pkl')
# joblib.dump(oldcars_pipeline_old, 'models/oldcars-pipe_new.pkl')
