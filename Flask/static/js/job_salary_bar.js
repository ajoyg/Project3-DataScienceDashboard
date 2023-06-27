let expLevel = document.getElementById("experience").value;


function makeBarChart(experienceFilter) {
    url="http://127.0.0.1:5000/api/v1.0/bytitlechart";
    d3.json(url).then((data) => {
        console.log(data)

        let salaries= data.map(value =>value.salary)
        //console.log("salaries", salaries)
        let job_titles= data.map(value =>value.job_title)
        //console.log("jobs", job_titles)
        let experience_levels=data.map(value =>value.experience_level)
       // console.log(experience_levels)

        console.log(experienceFilter);
        let experience= data.filter(salaryData => salaryData.experience_level == experienceFilter);
        
        experience.sort(function compareFunction(firstNum, secondNum) {
            return secondNum.salary - firstNum.salary;
        }).reverse();
        
        let layout = {
            title: "Salary by Job Title and Experience",
            yaxis: {
                automargin: true
            }
        };
          

        let barChartData = [
            {
                x: experience.map(value => value.salary),
                y: experience.map(value => value.job_title),
                type: "bar",
                orientation: 'h',
                marker:{
                    color:'#E37383'
                }
            }
        ];
        Plotly.newPlot("chart3", barChartData, layout)
    }
)}

function optionChangedBar(newInput) {
    makeBarChart(newInput);
}

console.log(expLevel);
makeBarChart(expLevel);

