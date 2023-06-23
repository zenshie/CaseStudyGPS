// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getFirestore, addDoc,collection} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCzf803qRjCMmK9wGhzPs68WLUZKr-M42M",
    authDomain: "casestudy-1c77a.firebaseapp.com",
    projectId: "casestudy-1c77a",
    storageBucket: "casestudy-1c77a.appspot.com",
    messagingSenderId: "743404711750",
    appId: "1:743404711750:web:fffdbd353973f645397f47",
    measurementId: "G-YX6H49NVFB"
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
