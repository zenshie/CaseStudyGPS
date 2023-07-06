import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";

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
  
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

  //----- Logout code start	  
  document.getElementById("logout").addEventListener("click", function() {
    signOut(auth).then(() => {
          // Sign-out successful.
          console.log('Sign-out successful.');
          alert('Sign-out successful.');
          window.location = "./index.html";

          // document.getElementById('logout').style.display = 'none';
        }).catch((error) => {
          // An error happened.
          console.log('An error happened.');
        });		  		  
  });
  //----- End