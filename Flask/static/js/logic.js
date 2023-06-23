let jobOption = document.getElementById("selJobTitle");
let expOption = document.getElementById("selExpLevel");
let myMap = L.map("map", {
  center: [38.092, 30.352],
  zoom: 1,
});

// Add the base layer to the map.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(myMap);



drawMap(expOption.value,jobOption.value);
//drawMap("MI","Data Engineer");


function drawMap(exp,jobTitle) 
{
  // Store our API endpoint as queryUrl.
  let queryUrl = "http://127.0.0.1:5000/api/v1.0/bubblemap"
  
  // Perform a GET request to the query URL/
  d3.json(queryUrl).then(function (data) {
    // Once we get a response, send the data.features object to the createFeatures function.
    // createFeatures(data.features);
    

    console.log(exp.toString());
    console.log(jobTitle.toString());  
  let selJobs = data.filter(job => job.job_title == jobTitle && job.experience == exp);
  //let selJobs = selJobsOnly.filter(exp => exp.experience == exp); 
console.log(selJobs);
// Create a overlay layer containing the earthquake info.
    for (let i = 0; i < selJobs.length; i++) 
    {
      let avgSalary = selJobs[i].salary_in_usd/5000;
      let experience = selJobs[i].experience;
      let lat = selJobs[i].latitude;
      let lng = selJobs[i].longitude;
    
      let salaryMarker = L.circleMarker([lat, lng], {radius: avgSalary, color:"#000" , fillColor:'#69D025' , fillOpacity: 0.5, weight:0.5})
      .bindPopup(`Average Salary: ${selJobs[i].salary_currency}${selJobs[i].average_salary},  Experience: ${experience}`)
      .addTo(myMap);
    };
    // Trigger the Masonry layout once the map and markers are loaded
    myMap.whenReady(function () {
    msnry.layout();
});
  });
};

function optionChangedExp(newExp)
{
  let jobOption = document.getElementById("selJobTitle");
  let title = jobOption.value;
  drawMap(newExp,title)
};
function optionChangedJob(newJob)
{
  let expOption = document.getElementById("selExpLevel");
  let level = expOption.value;
  drawMap(level,newJob)
};
// Add a legend to the map.
// let legend = L.control({position: "bottomright"});

// //Create a function to show the range colors for the density intervals in the legend.
// function getColor(d) {
//   return d > 90 ? '#780000' :
//          d > 70  ? '#EF233C' :
//          d > 50  ? '#FF006E' :
//          d > 30  ? '#FFC247' :
//          d > 10   ? '#B5DD7E' :
//          d > -10   ? '#69D025' :
//                     '#FFEDA0';}  

// // Create the legend table and add it to the map.
// legend.onAdd = function (map) 
// {
//     let div = L.DomUtil.create('div', 'info legend');
//     grades = [-10,10,30,50,70,90];
    

//     // loop through our density intervals and generate a label with a colored square for each interval
//     for (let i = 0; i < grades.length; i++) 
//     {
//         div.innerHTML +=
//             '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
//             grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        
//     };
//     return div;
// };
// legend.addTo(myMap);

