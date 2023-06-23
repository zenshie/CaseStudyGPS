import { register } from "./app.js";


//----- New Registration code start	  
document.getElementById("register").addEventListener("click", function() {
    var email =  document.getElementById("email").value;
    var password = document.getElementById("password").value;
    
    register(email, password);
   
  });
  //----- End

  