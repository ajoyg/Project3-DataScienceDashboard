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
drawMap(expOption.value,jobOption.value);



function drawMap(exp,jobTitle) 
{
  // Store our API endpoint as queryUrl.
  let queryUrl = "http://127.0.0.1:5000/api/v1.0/bubblemap"
  
  // Perform a GET request to the query URL/
  d3.json(queryUrl).then(function (data) {
    // Once we get a response, send the data.features object to the createFeatures function.
    
    //Clear the previous  job title layer
    mapLayers.jobTitleLayer.clearLayers();
    
  let selJobs = data.filter(job => job.job_title == jobTitle && job.experience == exp);
  //  console.log("ExpChange"+expChange);
  //  if (expChange == true) 
  // {
  //   let jobByExp = data.filter(job => job.experience == exp);
  //   let uniqueJobs = [...new Set(jobByExp.map((item) => item.job_title))];
  //   console.log(uniqueJobs);
  //   d3.selectAll("#selJobTitle").remove();
  
  //   d3.select("#selJobTitle")
  //     .selectAll('myOptions')
  //    	.data(uniqueJobs)
  //     .enter()
  //     .append('option')
  //     .text(function (d) { return d; }) // text showed in the menu
  //     .attr("value", function (d) { return d; }) // corresponding value returned by the button
    
  // };
  
  

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
  drawMap(newExp,title)
};
function optionChangedJob(newJob)
{
  let expOption = document.getElementById("selExpLevel");
  let level = expOption.value;
 
  drawMap(level,newJob)
};


