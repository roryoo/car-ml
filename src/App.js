import React from 'react';
import "./App.css";
import Navbar from "./components/navbar"; 
import Footer from './components/Footer';
import Home from "./pages/Home";
import About from './pages/About';
import Contact from './pages/Contact';
import FAQPage from "./pages/Faq";
import InputFeaturesPage from './pages/InputFeaturesPage';
import Register from "./pages/register";  
import LoginPage from "./pages/Login";
import GetStarted from './pages/getStarted';
import  History  from '../src/components/History';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import { ImportContacts } from '@mui/icons-material';
import { UserProvider } from '../src/config/UserContext'; 


function App() {
  return (
    <PrimeReactProvider>
      < UserProvider>

    <div className="App">
      <Router>
        <Navbar /> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/GetStarted" element={<GetStarted />} /> 
          <Route path="/register" element={<Register />} /> 
          <Route path="/InputFeaturesPage" element={<InputFeaturesPage />} /> 
          <Route path="/login" element={<LoginPage/>} /> 
          <Route path="/history" element={<History/>} /> 



          

        </Routes>
      </Router>
      
      

    </div>
    </UserProvider>
    </PrimeReactProvider>

  );
}

export default App;
