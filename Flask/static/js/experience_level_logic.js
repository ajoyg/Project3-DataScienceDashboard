document.addEventListener('DOMContentLoaded', function() {
  // Fetch the data from the API
  fetch('/api/v1.0/byexperiencelevel')
    .then(response => response.json())
    .then(data => {
      console.log(data);

      // Extract the required values for the chart
      var experienceLevels = data.map(item => item.experience_level);
      var salaries = data.map(item => item.ave_salary);

      console.log(experienceLevels);
      console.log(salaries);

      // Define the bar chart trace
      var trace = {
        x: experienceLevels,
        y: salaries,
        type: 'bar'
      };

      // Define the bar chart layout
      var layout = {
        title: 'Average Salary by Experience Level',
        xaxis: {
          title: 'Experience Level',
          categoryorder: 'array',
          categoryarray: ['EX', 'SE', 'MI', 'EN']
        },
        yaxis: {
          title: 'Average Salary'
        }
      };

      // Create the bar chart
      Plotly.newPlot('chart1', [trace], layout);
    });
});





