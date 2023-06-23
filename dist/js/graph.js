    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
    import { getFirestore, getDocs, collection} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";

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
const db = getFirestore(app);
firebase.initializeApp(firebaseConfig);
const db2 = firebase.firestore();  // Function for Database Firestore 


 

// Promise.all([
//   getDocs(collection(db, "2015")),
//   getDocs(collection(db, "2012city"))
// ]).then(([docSnap1, docSnap2]) => {
//   let Poverty2015Data = [];
//   let Poverty2012Data = [];

//   docSnap1.forEach((doc) => {
//     const data = doc.data();
//     const Municipality = data.Municipality;
//     const PovertyIncidence = parseFloat(data.PovertyIncidence);
//     Poverty2015Data.push({ x: Municipality, y: PovertyIncidence });
//   });

//   docSnap2.forEach((doc) => {
//     const data = doc.data();
//     const Municipality = data.Municipality;
//     const PovertyIncidence = parseFloat(data.PovertyIncidence);
//     Poverty2012Data.push({ x: Municipality, y: PovertyIncidence });
//   });

//Bar graph

db2.collection("covid-test")
.orderBy("IsoCode", "desc")
    .limit(8)
.onSnapshot(
  (querySnapshot) => {

  let CovidTestCasesData = [];
    
    querySnapshot.forEach((doc) => {

          const data = doc.data();
          const Location = data.Location;
          const NewCases = parseInt(data.NewCases);
          CovidTestCasesData.push({ x: Location, y: NewCases });
        });

    db2.collection("covid-test")
    .orderBy("IsoCode", "desc")
    .limit(8)
.onSnapshot(
  (querySnapshot) => { 
    let CovidTestDeathsData = [];  

    querySnapshot.forEach((doc) => {

          const data = doc.data();
          const Location = data.Location;
          const NewDeaths = parseInt(data.NewDeaths);
          CovidTestDeathsData.push({ x: Location, y: NewDeaths });
        });

  // Create the chart using the retrieved data
  var chart = new JSC.Chart("chartDiv", {
    debug: true, // Set debug option to true to view full error messages

    type: "column",
    // legend: {
    //   template: '%icon %name'
    // },
    legend_visible: false,
    defaultSeries: {
      palette: 'fiveColor36',
      pointSelection: 'multiple',
      firstPoint_legendEntry_lineAbove: true
    },
    toolbar_items_export_description: 'export menu',   //for export and printing the graph
    title_label_text: 'Municipal and City Poverty Incidence', 
    title_label_style: { 
      color: '#263238', 
      fontWeight: 'bold', 
      fontSize: '20px',
    },
  yAxis: { label_text: 'Poverty Incidence' }, 
  defaultPoint_label: {
    text: '%yValue',
    placement: 'inside',
    style: {
      color: 'Black',
      fontWeight: 'bold',
      fontSize: '11px'
    }
  },
  defaultPoint_label_autoHide:false, // Visible the value points of column
  xAxis: { 
    label_text: 'Municipal and City', 
    defaultTick: { label: { rotate: -30 } }

  },
    series: [{
      points: CovidTestDeathsData
    }
  ],
  toolbar_items: {
    "updateDropdown": {
      type: "select",
      position: "top",
      height: "25px", // Set the height of the button to 30 pixels
      width:"110px",
      margin_top:"10px",
      items: {
        "Deaths": {
          events_click: function () {
            // Code to update chart with new data
            chart.series([{
              points: CovidTestDeathsData
            }])
  
          }
        },
        "Cases": {
          events_click: function () {
            // Code to revert chart to original data
            chart.series([{
              points: CovidTestCasesData
            }])
  
          }
        }
      },
      style: {
        color: '#3A5254',
            fontSize: '13pt',
            fontFamily: 'Arial',
            fontWeight: 'bold',
      }
    }
  } //toolbar items end
});

});

});
// end for Bar graph

//Pie donut data visualization of region statistic

db2.collection("covid-test")
.orderBy("PovertyIncidence", "desc")
    .limit(20)
.onSnapshot(
  (querySnapshot) => {

  let Poverty2012Data = [];
    
    querySnapshot.forEach((doc) => {

      const data = doc.data();
      const Region = data.Region;
      const PovertyIncidence = parseFloat(data.PovertyIncidence);
      Poverty2012Data.push({ x: Region, y: PovertyIncidence });
    });

    db2.collection("2015-region")
    .orderBy("PovertyIncidence", "desc")
    .limit(20)
.onSnapshot(
  (querySnapshot) => { 
    let Poverty2015Data = [];  

    querySnapshot.forEach((doc) => {

      const data = doc.data();
      const Region = data.Region;
      const PovertyIncidence = parseFloat(data.PovertyIncidence);
      Poverty2015Data.push({ x: Region, y: PovertyIncidence });
    });
  

var chart2 = new JSC.Chart('chartDivPie', {
  debug: true,
  type: 'pie donut',
legend: {
     template: '%icon %name',
      position: 'bottom',
    //   fill: '#f1f8ff',
    //   boxVisible: true,
    //   corners: 'round',
    //   radius: 5,
    //   margin_left: 30,
    //   margin_right: 10,
    margin_top: 10,
      outline: { color: 'grass', width: 3 },
      defaultEntry: {
        iconWidth: 10,
        padding: 2,
        style: {
          color: '#3A5254',
          fontSize: '7pt',
          fontStyle: 'italic',
          fontFamily: 'Arial',
          fontWeight: 'normal'
        },
        states: {
          hover_style: { color: '#FF5254' },
          hidden_style: { color: '#c2bec1' }
        }
      }
    },
  defaultPoint_tooltip: '<b>%name</b><br/>Poverty Incidence <b>%value%',
  toolbar_items_export_description: 'export menu',   //for export and printing the graph
  title_label_text: 'Region Poverty Level Estimation', 
  title_label_style: { 
    color: '#263238', 
    fontWeight: 'bold', 
    fontSize: '20px',
  },
  defaultPoint_label: {
    text: '{%percentOfSeries:n1}%',
    placement: 'inside',
    style: {
      color: 'grass',
      fontWeight: 'bold',
      fontSize: '15px'
    }
  },
  defaultSeries: {
    palette: 'waterMeadow',
    pointSelection: 'multiple',
    shape_size: '90%',
    firstPoint_legendEntry_lineAbove: true
  },
  series: [
    {
    //   angle_orientation: 100,
      points:Poverty2012Data
    }
  ], toolbar_items: {
    "updateDropdown": {
      type: "select",
      position: "top",
      height: "25px", // Set the height of the button to 30 pixels
      width:"110px",
      margin_top:"10px",
      items: {
        "Year 2012": {
          events_click: function () {
            // Code to update chart with new data
            chart2.series([{
              points: Poverty2012Data
            }])
  
          }
        },
        "Year 2015": {
          events_click: function () {
            // Code to revert chart to original data
            chart2.series([{
              points: Poverty2015Data
            }])
  
          }
        }
      },
      style: {
        color: '#3A5254',
            fontSize: '13pt',
            fontFamily: 'Arial',
            fontWeight: 'bold',
      }
    }
  } //toolbar items end
});

});
});

//Get 2015 Data and Append it to the data table
db2.collection("2015")
 .onSnapshot(
   (querySnapshot) => {
 let counter = 1; // initialize counter variable
//  let updateCount = 0; // initialize update counter 
 const table =  $('#2015Datatables').DataTable();
 table.clear(); // clear existing data in the table

querySnapshot.forEach((doc) => {
  const data = doc.data();

       // Displays the Data to the Tables
      table.row.add([
        counter++,
        data.Region,
        data.Municipality,
        data.PovertyIncidence,
      ]);
      table.draw(); // refresh the table with new data


    });
  });
    

  const activitylog = document.getElementById('history-box');


  // / Check if there are any blogs in the Firestore database
db2.collection("activity-logs")
// .where("Datecreated", ">=", timestampss)
.orderBy("Datecreated")
.onSnapshot(
  (querySnapshot) => {
// getDocs(collection(db, "activity-logs").orderBy("Datecreated")).then(docSnap => {
   // Display the logs
   let activitylogs = [];
   querySnapshot.forEach((doc) => {
     const data = doc.data();
     const action = data.action;
     const details = data.details;
     const Datecreated = data.Datecreated;
     activitylogs.push({ ...data, id: doc.id });
     console.log("New Activity Log:", Datecreated);
     activitylog.innerHTML += `
     <section class="log"><br>
       <div class="boxes">
         <p>${details}</p>
         <span>${new Date(Datecreated).toLocaleString(undefined, 
           { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</span>
       </div>
     
     </section>
     `;
   });
});