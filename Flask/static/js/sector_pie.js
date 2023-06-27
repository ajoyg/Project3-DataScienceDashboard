const queryUrl = "http://127.0.0.1:5000/api/v1.0/countbysector"

d3.json(queryUrl).then(function(data){
    
    let totalSector = 0

    totalCount = data.map(sect => {
        totalSector += sect.count});

    console.log("total counts", totalSector)

    // Skipping the first record because it's a catch-all in the data (i.e., there's no sector; it just says "-1").
    let dataSliced = data.slice(1,11);

    console.log("pie", dataSliced)
    
    let topSectorTotal = 0
    let topSectorCount = dataSliced.map(sect => {
        topSectorTotal += sect.count});
    
    console.log("top sector total counts", topSectorTotal)

    let everythingElse = totalSector - topSectorTotal

    console.log("other:", everythingElse)

    // // Shouldn't need to reverse this array any longer. 
    // dataSliced.reverse()

    
    // Trying out the Nightingale Chart here...

    var chartDom = document.getElementById('chart4');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
        legend: {
          top: 'bottom'
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: 'NEED TO UPDATE',
            type: 'pie',
            radius: [50, 250],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 1
            },
            data: [
              { value: 66, name: 'Biotech & Pharma' },
              { value: 56, name: 'IT Services' },
              { value: 55, name: 'Computer Hardware & Software' },
              { value: 45, name: 'Aerospace & Defense' },
              { value: 39, name: 'Enterprise Software' },
              { value: 38, name: 'Consulting' },
              { value: 35, name: 'Staffing & Outsourcing' },
              { value: 28, name: 'Insurance Carriers' },
              { value: 23, name: 'Advertising & Marketing' },
              { value: 23, name: 'Internet' },
              { value: 240, name: 'Other' }
            ]
          }
        ]
      };
    
    option && myChart.setOption(option);



    // const xValues = dataSliced.map(sect => ((sect.count/totalSector)*100))
    // const yValues = dataSliced.map(sect => sect.industry)

    // // Trace for the sector data
    // let trace = {
    // x: xValues,
    // y: yValues,
    // type: "bar",
    // orientation: "h",
    // hovertext: yValues,
    // // hoverinfo: 'text'
    // }

    // // Data array
    // let myData = [trace];

    // // Apply a title to the layout
    // let layout = {
    //     title: "Top 20 Sectors for U.S. Data Jobs in 2021 <br> (Percent of Data Jobs)",
    //     width: 500,
    //     height: 500,
    //     xaxis: {
    //         title: "Percent of Data Jobs"
    //     },
    //     yaxis: { // removes tick labels on y-axis (too difficult to read as is)
    //         title: "Sector",
    //         ticktext: [],
    //         tickvals: []
    //     }
    // }

    // // Render the plot to the div tag with id "plot"
    // Plotly.newPlot("chart4",myData,layout)    

});