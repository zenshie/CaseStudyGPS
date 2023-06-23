// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getFirestore, getDocs, collection,onSnapshot, doc, deleteDoc,updateDoc, addDoc } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";

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
 //firebase.initializeApp(firebaseConfig);
 //const db2 = firebase.firestore();  // Function for Database Firestore 
 const table = $('#CovidDataTables').DataTable();


//db2.collection("covid-test")
// .onSnapshot(
//   (querySnapshot) => {
// let counter = 1; // initialize counter variable
//  let updateCount = 0; // initialize update counter 
 //const table =  $('#CovidDataTables').DataTable();
// table.clear(); // clear existing data in the table

onSnapshot(collection(db, "covid-test"), (querySnapshot) => {
  table.clear(); // clear existing data in the table

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const editButton = `<button type="button" class="btn btn-primary edit" data-id="${doc.id}" data-isocode="${data.IsoCode}" data-location="${data.Location}" data-date="${data.Date}" data-new-cases="${data.NewCases}" data-new-deaths="${data.NewDeaths}" data-toggle="modal" data-target="#edit-modal">Edit </button>  `;
    const deleteButton = `<button type="button" class="btn btn-danger delete" data-id="${doc.id}" data-toggle="modal" data-target="#delete-modal">Delete</button>`;

    // Display the data in the table
    table.row.add([
      data.IsoCode,
      data.Location,
      data.Date,
      data.NewCases,
      data.NewDeaths,
      `${editButton} ${deleteButton}`
    ]);
  });

  table.draw(); // Refresh the table with new data
});

// Add event listener for edit button
$(document).on('click', '.edit', function () {
  const docId = $(this).data('id');
  const IsoCode = $(this).data('isocode');
  const Location = $(this).data('location');
  const Date = $(this).data('date');
  const NewCases = $(this).data('new-cases');
  const NewDeaths = $(this).data('new-deaths');

  // Pass data to edit form and display it
  $('#IsoCodeEdit').val(IsoCode);
  $('#LocationEdit').val(Location);
  $('#DateEdit').val(Date);
  $('#NewCasesEdit').val(NewCases);
  $('#NewDeathsEdit').val(NewDeaths);

  $('#edit-modal').modal('show');
  $('#update-button').data('id', docId);
});

// Add event listener for update button
$(document).on('click', '#update-button', function () {
  const docId = $(this).data('id');
  const IsoCode = $('#IsoCodeEdit').val();
  const Location = $('#LocationEdit').val();
  const Date = $('#DateEdit').val();
  const NewCases = $('#NewCasesEdit').val();
  const NewDeaths = $('#NewDeathsEdit').val();

  const newData = {
    'IsoCode': IsoCode,
    'Location': Location,
    'Date': Date,
    'NewCases': NewCases,
    'NewDeaths': NewDeaths
  };

   // show success message before updating the data
   alert('Update Success bhie');
   //$('#edit-modal').modal('hide'); // Hide the modal after updating
   //location.reload();
   // basta kaning tulo ang ning work for me UwU

     // Update the data in Firestore
     updateDoc(doc(db, 'covid-test', docId), newData)
    .then(() => {
            // Add activity log document
      const activityLogCollection = collection(db, "covidtest-activitylog");
      const Datecreated = new Date().toISOString();

      addDoc(activityLogCollection, {
        Datecreated: Datecreated,
        action: `${IsoCode} has been Updated`,
        details: `${Location} data Updated.`
      })
        .then(() => {
          console.log("Activity Log Added");
          alert('Update success');
          //$('#edit-modal').modal('hide'); // Hide the modal after updating
          //location.reload();  // Reload the page to reflect the updated data
        })
        .catch((error) => {
          console.error("Error adding activity log: ", error);
          updateError(error.message);
         // $('#edit-modal').modal('hide'); // Hide the modal on error
        });
    }) 
    .catch((error) => {
      console.error("Error updating record: ", error);
      console.log("Error message: ", error.message);
      updateError(error.message);
      //$('#edit-modal').modal('hide'); // Hide the modal on error
    }); 
}); // from $(document).on('click', '#update-button', function () {



// Add event listener for delete button
$(document).on('click', '.delete', function () {
  const docId = $(this).data('id');
  $('#delete-modal').modal('show');
  $('#deleteData').data('id', docId);
});

$(document).on('click', '#deleteData', function () {
  const docId = $(this).data('id');

  deleteDoc(doc(db, 'covid-test', docId))
    .then(() => {
      console.log("Delete success");
      alert('Delete success');
      $('#delete-modal').modal('hide');
      location.reload();
    })
    .catch((error) => {
      console.error("Error deleting record: ", error);
      updateError(error.message);
    });
});
    
  // Dismiss the modal for edit and delete modal
  $(document).on('click', '.btn-close, .close', function () {
    $('#edit-modal').modal('hide');
    $('#delete-modal').modal('hide');
  });

// Initialize the DataTable
$(document).ready(function () {
  $('#CovidDataTables').DataTable();
});

// Display the activity logs
const activitylog = document.getElementById('history-box');
onSnapshot(collection(db, "covidtest-activitylog"), (querySnapshot) => {
  activitylog.innerHTML = ""; // Clear the activity log container

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const action = data.action;
    const Datecreated = data.Datecreated;

    activitylog.innerHTML += `
      <p>${action}</p>
      <span>${new Date(Datecreated).toLocaleString(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</span>
      <br>
    `;
  });
});



       // Displays the Data to the Tables
     // table.row.add([
      //  counter++,
      //  data.IsoCode,
      //  data.Location,
      //  data.Date,
      //  data.NewCases,
      //  data.NewDeaths,
      //  `${editButton} ${deleteButton}`
     // ]);
    //  table.draw(); // refresh the table with new data



  // (error) => {
  //   console.log(`Error getting documents: ${error}`);

 //  const activitylog = document.getElementById('history-box');


   // / Check if there are any blogs in the Firestore database
//db2.collection("covidtest-activitylog")
//.orderBy("Datecreated")
 //.onSnapshot(
  // (querySnapshot) => {
// getDocs(collection(db, "activity-logs").orderBy("Datecreated")).then(docSnap => {
    // Display the logs
 //   let covidtestactivitylog = [];
 ///   querySnapshot.forEach((doc) => {
  //    const data = doc.data();
  //    const action = data.action;
  //    const Datecreated = data.Datecreated;
  //    covidtestactivitylog.push({ ...data, id: doc.id });
   //   console.log("New Document data:", 'blog');
   //   activitylog.innerHTML += `
    //      <p>${action}</p>
    //      <span>${new Date(Datecreated).toLocaleString(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</span>
    //      <br>
  
   //   `;
 //   });
//});
