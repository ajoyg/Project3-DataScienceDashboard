url="http://127.0.0.1:5000/api/v1.0/byyear"
 
let countryFilter = document.getElementById("country").value;


function makeLineChart(countryFilter) {
    d3.json(url).then((data) => {
        console.log(data)

        let years= data.map(salaryData =>salaryData.year)
       // console.log("years", years)
        let salaries= data.map(salaryData =>salaryData.salary)
     //   console.log("salaries", salaries)
        let countries=data.map(salaryData =>salaryData.country)
     //   console.log(countries)

        let country= data.filter(value => value.country === countryFilter).reverse()
     //   console.log(country)
        
        let layout = {
            title: "Average Yearly Salary",
            xaxis: {
                title: 'Year of Employment',
                autotick: false,
                ticks: 'inside',
                tick0: 0,
                dtick: 1,
                ticklen: 3,
                tickwidth: 4,
                tickcolor: 'white'
              },
            //width: 820,
            yaxis: {
                title: 'Yearly Salary (USD)',
                automargin: true
            }
        };
          
        let test = country.map(salaryData => salaryData.year)
        let test2 = country.map(salaryData => salaryData.salary)
     //   console.log(test, test2)
        let lineChartData = [
            {       
                x: country.map(salaryData => salaryData.year),
                y: country.map(salaryData => salaryData.salary),
                type: "line"

            }
        ];
        Plotly.newPlot("chart2", lineChartData, layout)
    }
)}

function optionChangedLine(newInput) {
    makeLineChart(newInput);
}

console.log(countryFilter);
makeLineChart(countryFilter);