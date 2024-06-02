import React, { useState, useEffect } from 'react';
import Lottie from 'react-lottie';
import animationData from '../assets/Lotties/car.json';
import { FaBolt, FaGasPump, FaLeaf } from 'react-icons/fa';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../config/Firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

import '../styles/inputFeatures.css';

function CarPricePredictionForm() {
  const [isLottieVisible, setIsLottieVisible] = useState(false);
  const [formData, setFormData] = useState({
    carName: [],
    HP: [],
    accident: [],
    cylinders: [],
    ext_col: [],
    fueltype: [],
    int_col: [],
    mileage: [],
    model_year: [],
    motor_size: [],
    price: []
  });
  const [electricFormData, setElectricFormData] = useState({
    battery: [],
    efficiency: [],
    fastCharge: [],
    range: [],
    topSpeed: [],
    acceleration: [],
    price: []
  });
  const [currentUser, setCurrentUser] = useState(null);
  const [activeForm, setActiveForm] = useState(null);
  const [carTypeSelected, setCarTypeSelected] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setCurrentUser(user);
    });
  }, [auth]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const fetchData = async (carType) => {
    try {
      let collectionName = '';
      switch (carType.toLowerCase()) {
        case 'electric':
          collectionName = 'electric';
          break;
        case 'fuel':
        case 'hybrid':
          collectionName = 'hybrid';
          break;
        default:
          console.error('Invalid car type');
          return;
      }

      const querySnapshot = await getDocs(collection(db, collectionName));
      let newFormData = {};
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        for (const key in data) {
          if (!newFormData[key]) {
            newFormData[key] = new Set();
          }
          newFormData[key].add(data[key]);
        }
      });
      for (const key in newFormData) {
        newFormData[key] = Array.from(newFormData[key]);
      }
      if (carType.toLowerCase() === 'electric') {
        setElectricFormData(newFormData);
      } else {
        setFormData(newFormData);
      }
    } catch (error) {
      console.error(`Error fetching ${carType} data: `, error);
    }
  };

  function showForm(carType) {
    fetchData(carType).then(() => {
      setIsLottieVisible(true);
      setTimeout(() => {
        setIsLottieVisible(false);
        setCarTypeSelected(true);
        setActiveForm(carType.toLowerCase());
      }, 3000);
    });
  }

  const handleChange = e => {
    const { name, value } = e.target;
    if (activeForm === 'electric') {
      setElectricFormData(prevData => ({
        ...prevData,
        [name]: [value]
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: [value]
      }));
    }
    logUserAction({ type: 'change', name, value });
  };

  const handleClick = action => {
    logUserAction({ type: 'click', action });
  };

  const logUserAction = async (actionData) => {
    if (!currentUser) return;

    const historyData = {
      uid: currentUser.uid,
      carType: activeForm,
      action: actionData,
      timestamp: new Date()
    };

    try {
      await addDoc(collection(db, 'history'), historyData);
      console.log('User action logged successfully');
    } catch (error) {
      console.error('Error logging user action: ', error);
    }
  };

  const storeUserHistory = async (selectedData) => {
    if (!currentUser) {
      console.error("No user logged in");
      return;
    }
  
    try {
      await addDoc(collection(db, 'history'), {
        ...selectedData,
        uid: currentUser.uid,
        timestamp: new Date()
      });
      console.log("History saved successfully");
    } catch (error) {
      console.error("Failed to store user history:", error);
    }
  };
  

  const handleSubmit = async e => {
    e.preventDefault();
    if (currentUser) {
      const selectedData = activeForm === 'electric' ? electricFormData : formData;
      storeUserHistory(selectedData);
      alert('Data submitted successfully (simulation).');
    } else {
      alert('Please log in to save your data.');
    }
    logUserAction({ type: 'submit' });
  };

  return (
    <>
      {!carTypeSelected && (
        <div id="car-selection">
          <div className="car-box-row">
            <div className="car-box" onClick={() => { showForm('Electric'); handleClick('electric'); }}>
              <FaBolt className="car-icon" />
              <h2>Electric</h2>
            </div>
            <div className="car-box" onClick={() => { showForm('Fuel'); handleClick('fuel'); }}>
              <FaGasPump className="car-icon" />
              <h2>Fuel</h2>
            </div>
            <div className="car-box" onClick={() => { showForm('Hybrid'); handleClick('hybrid'); }}>
              <FaLeaf className="car-icon" />
              <h2>Hybrid</h2>
            </div>
          </div>
        </div>
      )}

      {isLottieVisible && (
        <div className="lottie-container">
          <Lottie options={defaultOptions} height={200} width={200} speed={2} />
        </div>
      )}

      {carTypeSelected && (
        <div className="form-container">
          <form onSubmit={handleSubmit} className="car-form">
            {activeForm === 'electric' ? renderFormFields(electricFormData) : renderFormFields(formData)}
            <button type="submit" className="submit-button">Submit</button>
          </form>
        </div>
      )}
    </>
  );

  function renderFormFields(data) {
    return (
      <>
        {Object.keys(data).map((field) => (
          <div className="form-group" key={field}>
            <label htmlFor={field}>{field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:</label>
            <select id={field} name={field} required onChange={handleChange} defaultValue="">
              <option value="" disabled hidden>Select {field.replace(/_/g, ' ')}</option>
              {data[field].map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        ))}
      </>
    );
  }
}

export default CarPricePredictionForm;
