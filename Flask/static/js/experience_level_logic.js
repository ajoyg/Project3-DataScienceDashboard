document.addEventListener('DOMContentLoaded', function() {
  // Access the data passed from Flask
  var data = JSON.parse('{{ data | tojson | safe }}');

  // Extract the required values for the chart
  var experienceLevels = data.map(function(item) {
    return item.experience_level;
  });
  var salaries = data.map(function(item) {
    return item.salary;
  });

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
      title: 'Experience Level'
    },
    yaxis: {
      title: 'Average Salary'
    }
  };

  // Create the bar chart
  Plotly.newPlot('bar-chart', [trace], layout);
});