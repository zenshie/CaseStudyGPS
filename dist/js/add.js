// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getFirestore, addDoc,collection} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPTJIyyUkkcZxOqG9hIC9bJzASmieqZJs",
  authDomain: "casestudy-gps.firebaseapp.com",
  databaseURL: "https://casestudy-gps-default-rtdb.firebaseio.com",
  projectId: "casestudy-gps",
  storageBucket: "casestudy-gps.appspot.com",
  messagingSenderId: "66895443108",
  appId: "1:66895443108:web:4809eb1a17becc4033a231",
  measurementId: "G-DKSMF05CKQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
 const db = getFirestore(app);


 const submitDatabtn = document.getElementById('submitData');
 submitDatabtn.addEventListener('click', (e) => {
     var IsoCodeAdd = document.getElementById('IsoCodeAdd').value.trim();
     var LocationAdd = document.getElementById('LocationAdd').value.trim();
     var DateAdd = document.getElementById('DateAdd').value.trim();
     var NewCasesAdd = document.getElementById('NewCasesAdd').value.trim();
     var NewDeathsAdd = document.getElementById('NewDeathsAdd').value.trim();

     if (IsoCodeAdd && LocationAdd && NewCasesAdd && NewDeathsAdd) {
       addDoc(collection(db, "covid-test"), {
         IsoCode: IsoCodeAdd,
         Location: LocationAdd,
         Date: DateAdd,
         NewCases: NewCasesAdd,
         NewDeaths: NewDeathsAdd
       }).then(() => {
         // Add a new activity log document
         const activityLogCollection = collection(db, "covidtest-activitylog");
         const Datecreated = new Date().toISOString();
         addDoc(activityLogCollection, {
           Datecreated: Datecreated,
           action: `${LocationAdd} has been add with`,
           details: `${NewCasesAdd} new cases and ${NewDeathsAdd} new deaths data has been added.`
         }).then(() => {
           alert("Data added successfully");
           location.reload();
         });
       }).catch((error) => {
         console.error("Error adding document: ", error);
       });
     } else {
       alert("Please fill in all the input fields");
     }
   });
