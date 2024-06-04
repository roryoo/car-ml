import { initializeApp} from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyADuEGhohASUYuNJx7Awxs-P69U6ki5Bkk",
  authDomain: "car-demo-2eb79.firebaseapp.com",
  projectId: "car-demo-2eb79",
  storageBucket: "car-demo-2eb79.appspot.com",
  messagingSenderId: "153386596920",
  appId: "1:153386596920:web:a0f73e9441f18dbdb084cd",
  measurementId: "G-0ZQV4M4QNY"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app); 
