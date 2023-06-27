const queryUrl = "http://127.0.0.1:5000/api/v1.0/countbysector"

d3.json(queryUrl).then(function(data){
    
    let totalSector = 0

    totalCount = data.map(sect => {
        totalSector += sect.count});

    //console.log("total counts", totalSector)

    // Skipping the first record because it's a catch-all in the data (i.e., there's no sector; it just says "-1").
    let dataSliced = data.slice(1,11);

   // console.log("pie", dataSliced)
    
    let topSectorTotal = 0
    let topSectorCount = dataSliced.map(sect => {
        topSectorTotal += sect.count});
    
    console.log("top sector total counts", topSectorTotal)
    
    // Determining how many 'Other' sectors there are in the dataset.
    let everythingElse = totalSector - topSectorTotal

   // console.log("other:", everythingElse)

    // Renaming the data to be used in the pie chart so it can be used directly in the eChart parameters. 
    let renamedData = dataSliced.map(function(obj) {
      return {
        value: obj.count,
        name: obj.industry
      };
    });

    renamedData.push({value: 240, name: 'Other'})

   // console.log("Is this better?", renamedData)


    
    // Trying out the Nightingale Chart here...

    var chartDom = document.getElementById('chart4');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
        // legend: {
        //   top: 'bottom'
        // },
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
            name: 'Top 10 Sectors for Data Jobs',
            type: 'pie',
            radius: [50, 150],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 1,
          },
            // tooltip: {
            //   show: true,
            //   trigger: 'item',
            //   formatter: '{b}: {c}'
            // },
            // data: [
            //   { value: 66, name: 'Biotech & Pharma' },
            //   { value: 56, name: 'IT Services' },
            //   { value: 55, name: 'Computer Hardware & Software' },
            //   { value: 45, name: 'Aerospace & Defense' },
            //   { value: 39, name: 'Enterprise Software' },
            //   { value: 38, name: 'Consulting' },
            //   { value: 35, name: 'Staffing & Outsourcing' },
            //   { value: 28, name: 'Insurance Carriers' },
            //   { value: 23, name: 'Advertising & Marketing' },
            //   { value: 23, name: 'Internet' },
            //   { value: 240, name: 'Other' }
            // ]
            data: renamedData
          }
        ]
      };
    
    option && myChart.setOption(option);

});