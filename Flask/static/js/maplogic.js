let jobOption = document.getElementById("selJobTitle");
let expOption = document.getElementById("selExpLevel");
let mapLayers = {
  worldMap: new L.layerGroup(),
  jobTitleLayer: new L.layerGroup(),
  };

// Add the base layer to the map.
let worldMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'});

let myMap = L.map("map", {
  center: [38.092, 30.352],
  zoom: 2,
  layers: [mapLayers.worldMap, mapLayers.jobTitleLayer],
});
worldMap.addTo(myMap);
drawMap(expOption.value,jobOption.value,true);



function drawMap(exp,jobTitle, expChange) 
{
  // Store our API endpoint as queryUrl.
  let queryUrl = "http://127.0.0.1:5000/api/v1.0/bubblemap"
  
  // Perform a GET request to the query URL/
  d3.json(queryUrl).then(function (data) {
    // Once we get a response, send the data.features object to the createFeatures function.
    // createFeatures(data.features);
    
   // let cMarkerOld = new L.circleMarker();
    mapLayers.jobTitleLayer.clearLayers();
    //layerGroup.clearLayers(); 
  let selJobs = data.filter(job => job.job_title == jobTitle && job.experience == exp);
  // console.log("ExpChange"+expChange);
  // if (expChange == true) 
  // {
  //   let jobByExp = data.filter(job => job.experience == exp);
  //   let uniqueJobs = [...new Set(jobByExp.map((item) => item.job_title))];
  //   console.log(uniqueJobs);
  //   d3.select("#selJobTitle")
  //     .selectAll('myOptions')
  //    	.data(uniqueJobs)
  //     .enter()
  //     .append('option')
  //     .text(function (d) { return d; }) // text showed in the menu
  //     .attr("value", function (d) { return d; }) // corresponding value returned by the button
    
  // };
  //   d3.select("#selJobTitle")
  //     .selectAll('myOptions')
  //    	.data(jobTitleArray)
  //     .enter()
  //     .text(function (d) { return d; }) // text showed in the menu
  //     .attr("value", function (d) { return d; }) // corresponding value returned by the button
  // }  
  //let selJobs = selJobsOnly.filter(exp => exp.experience == exp); 
  

// Create a overlay layer containing the job info.
  let jobArray =[];
  

    for (let i = 0; i < selJobs.length; i++) 
    {
      let avgSalary = selJobs[i].salary_in_usd/5000;
      let experience = selJobs[i].experience;
      
      let remote_ratio = selJobs[i].remote_ratio;
      let lat = selJobs[i].latitude;
      let lng = selJobs[i].longitude;
      let location = selJobs[i].company_location;
      let cMarker = L.circleMarker([lat, lng], {radius: avgSalary, color:"#000" , fillColor: '#69D025' , fillOpacity: 0.5, weight:0.5})
      .bindPopup(`<b>Location: ${location}, Average Salary: ${selJobs[i].salary_currency}${selJobs[i].average_salary}, $${avgSalary*5000} in USD, upto ${remote_ratio}% remote work option</b>`);
      jobArray.push(cMarker);
      
    }

    L.layerGroup(jobArray).addTo(mapLayers.jobTitleLayer);
    
  });
};

function optionChangedExp(newExp)
{
  let jobOption = document.getElementById("selJobTitle");
  let title = jobOption.value;
  drawMap(newExp,title, true)
};
function optionChangedJob(newJob)
{
  let expOption = document.getElementById("selExpLevel");
  let level = expOption.value;
 
  drawMap(level,newJob, false)
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

