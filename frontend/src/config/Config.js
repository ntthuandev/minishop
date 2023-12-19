// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD730Bs8IHjKLm62BevOrrkM_goRVSYccY",
  authDomain: "minishop-29721.firebaseapp.com",
  projectId: "minishop-29721",
  storageBucket: "minishop-29721.appspot.com",
  messagingSenderId: "83347760519",
  appId: "1:83347760519:web:bd0de82734184a560d9f22",
  measurementId: "G-865JVL0FG5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const imageDb = getStorage(app);
export default imageDb