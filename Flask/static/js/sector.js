const queryUrl = "http://127.0.0.1:5000/api/v1.0/countbysector"

d3.json(queryUrl).then(function(data){
    
    let totalSector = 0

    totalCount = data.map(sect => {
        totalSector += sect.count});

    console.log(totalSector)

    // Skipping the first record because it's a catch-all in the data (i.e., there's no sector; it just says "-1").
    let dataSliced = data.slice(1,21);

    console.log(dataSliced)

    // Reverse the array to accommodate Plotly's defaults
    dataSliced.reverse()

    const xValues = dataSliced.map(sect => ((sect.count/totalSector)*100))
    const yValues = dataSliced.map(sect => sect.industry)

    // Trace for the sector data
    let trace = {
    x: xValues,
    y: yValues,
    type: "bar",
    orientation: "h",
    hovertext: yValues,
    // hoverinfo: 'text'
    }

    // Data array
    let myData = [trace];

    // Apply a title to the layout
    let layout = {
        title: "Top 20 Sectors for U.S. Data Science Jobs in 2021 (Percent of Data Jobs)",
        width: 500,
        height: 500,
        yaxis: { // removes tick labels on y-axis (too difficult to read as is)
            ticktext: [],
            tickvals: []
        }
    }

    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("plot",myData,layout)    

})