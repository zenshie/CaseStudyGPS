import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCzf803qRjCMmK9wGhzPs68WLUZKr-M42M",
    authDomain: "casestudy-1c77a.firebaseapp.com",
    projectId: "casestudy-1c77a",
    storageBucket: "casestudy-1c77a.appspot.com",
    messagingSenderId: "743404711750",
    appId: "1:743404711750:web:fffdbd353973f645397f47",
    measurementId: "G-YX6H49NVFB"
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