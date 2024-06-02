// src/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3600'; // Your Express server URL

export const uploadFuelData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/data?type=fuel`);
    return response.data;
  } catch (error) {
    console.error('Error uploading fuel data:', error);
    throw error;
  }
};

export const uploadElectricData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/data?type=electric`);
    return response.data;
  } catch (error) {
    console.error('Error uploading electric car data:', error);
    throw error;
  }
};
