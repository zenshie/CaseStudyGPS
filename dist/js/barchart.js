// Fetch the data from the Firestore database
const fetchData = async () => {
  const querySnapshot = await getDocs(collection(db, 'covid-test'));
  const data = {};

  querySnapshot.forEach((doc) => {
    const location = doc.data().Location;
    const newCases = doc.data().NewCases;
    const newDeaths = doc.data().NewDeaths;
    
    // Check if the location exists in the data object
    if (!data[location]) {
      data[location] = {
        location: location,
        totalCases: 0,
        totalDeaths: 0
      };
    }
    
    // Increment the total cases and total deaths for the location
    data[location].totalCases += newCases;
    data[location].totalDeaths += newDeaths;
  });

  return Object.values(data);
};

// Create the bar chart for total cases and total deaths
const createBarChart = (data, chartId, label) => {
  const locations = data.map((item) => item.location);
  const totals = data.map((item) => item[label]);

  const ctx = document.getElementById(chartId).getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: locations,
      datasets: [
        {
          label: label,
          data: totals,
          backgroundColor: label === 'totalCases' ? 'rgba(54, 162, 235, 0.6)' : 'rgba(255, 99, 132, 0.6)',
          borderColor: label === 'totalCases' ? 'rgba(54, 162, 235, 1)' : 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: label === 'totalCases' ? 'Total Cases' : 'Total Deaths',
          },
        },
      },
    },
  });
};

// Fetch the data and create the bar charts
fetchData().then((data) => {
  createBarChart(data, 'bar-chart-cases', 'totalCases');
  createBarChart(data, 'bar-chart-deaths', 'totalDeaths');
});
