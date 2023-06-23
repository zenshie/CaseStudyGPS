import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-analytics.js";
import { getAuth,
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  FacebookAuthProvider } 
  from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";

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
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider(app);
const Fbprovider = new FacebookAuthProvider();

//----- New Registration code start	  
document.getElementById("register").addEventListener("click", function() {
  var email =  document.getElementById("email").value;
  var password = document.getElementById("password").value;
  //For new registration
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    alert("Registration successfully!!");
    window.location = "./home.html";
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    console.log(errorMessage);
    alert(error);
  });		  		  
});
//----- End

//----- Login code start	  
document.getElementById("login").addEventListener("click", function() {
  var email =  document.getElementById("login_email").value;
  var password = document.getElementById("login_password").value;

  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    alert(user.email+" Login successfully!!!");
    window.location = "./home.html";

  //   document.getElementById('logout').style.display = 'block';
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    alert(errorMessage);
  });		  		  
});
// //----- End


//----- login with google
document.getElementById("signInWithGoogle" ).addEventListener("click", function()  {
  // sign in with popup tab
signInWithPopup(auth, provider).then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;

    alert(user.email+" Login successfully!!!");
    window.location = "./home.html";
    // alert(user.displayName);
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...

    alert(errorMessage);
});
}); 
// //----- End

  //----- Signup with Google

document.getElementById("signUpWithGoogle" ).addEventListener("click", function()  {
// sign in with popup tab
signInWithPopup(auth, provider).then((result) => {
// This gives you a Google Access Token. You can use it to access the Google API.
const credential = GoogleAuthProvider.credentialFromResult(result);
const token = credential.accessToken;
// The signed-in user info.
const user = result.user;

alert(user.email+" Sign Up successfully!!!");
window.location = "./home.html";
// alert(user.displayName);
// ...
}).catch((error) => {
// Handle Errors here.
const errorCode = error.code;
const errorMessage = error.message;
// The email of the user's account used.
const email = error.email;
// The AuthCredential type that was used.
const credential = GoogleAuthProvider.credentialFromError(error);
// ...

alert(errorMessage);
});
}); 
// //----- End

    //----- login with Facebook
document.getElementById("signInWithFacebook" ).addEventListener("click", function()  {
// sign in with popup tab
signInWithPopup(auth, Fbprovider).then((result) => {
// This gives you a Google Access Token. You can use it to access the Google API.
const credential = FacebookAuthProvider.credentialFromResult(result);
const token = credential.accessToken;
// The signed-in user info.
const user = result.user;

alert(user.displayname+" Login successfully!!!");
window.location = "./home.html";
// alert(user.displayName);
// ...
}).catch((error) => {
// Handle Errors here.
const errorCode = error.code;
const errorMessage = error.message;
 // The email of the user's account used.
 const email = error.email;
 // The AUTH Credential type that was used.
 const credential = FacebookAuthProvider.credentialFromError(error);
// ...
alert(errorMessage);
});
}); 
// //----- End

      //----- Sign Up with Facebook
document.getElementById("signUpWithFacebook" ).addEventListener("click", function()  {
// sign in with popup tab
signInWithPopup(auth, Fbprovider).then((result) => {
// This gives you a Google Access Token. You can use it to access the Google API.
const credential = FacebookAuthProvider.credentialFromResult(result);
const token = credential.accessToken;
// The signed-in user info.
const user = result.user;

alert(user.displayname+" Sign Up  successfully!!!");
window.location = "./home.html";
// alert(user.displayName);
// ...
}).catch((error) => {
// Handle Errors here.
const errorCode = error.code;
const errorMessage = error.message;
 // The email of the user's account used.
 const email = error.email;
 // The AUTH Credential type that was used.
 const credential = FacebookAuthProvider.credentialFromError(error);
// ...
alert(errorMessage);
});
}); 
// //----- End

