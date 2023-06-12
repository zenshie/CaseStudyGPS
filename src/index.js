// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPTJIyyUkkcZxOqG9hIC9bJzASmieqZJs",
  authDomain: "casestudy-gps.firebaseapp.com",
  projectId: "casestudy-gps",
  storageBucket: "casestudy-gps.appspot.com",
  messagingSenderId: "66895443108",
  appId: "1:66895443108:web:4809eb1a17becc4033a231",
  measurementId: "G-DKSMF05CKQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

console.log(app)