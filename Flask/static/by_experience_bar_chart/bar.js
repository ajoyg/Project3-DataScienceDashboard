url="http://127.0.0.1:5000/api/v1.0/bytitlechart"
 
let dropdown_list = ["ALL LEVELS","EN", "MI", "SE", "EX"]
let user_selection = d3.select("#experience").selectAll('myOptions').data(dropdown_list).enter().append('option').text(function (d) { return d; }).attr("value", function (d) { return d; });
console.log("selection", user_selection.value)


function makeBarChart(experienceFilter) {
    d3.json(url).then((data) => {
        console.log(data)

        let salaries= data.map(value =>value.salary)
        console.log("salaries", salaries)
        let job_titles= data.map(value =>value.job_title)
        console.log("jobs", job_titles)
        let experience_levels=data.map(value =>value.experience_level)
        console.log(experience_levels)

        let experienceLevelSelect = document.getElementById("experience");
        let EXPlevel = experienceLevelSelect.value;
        let experience= data.filter(value => value.experience_level === EXPlevel)
        console.log(EXPlevel)
        console.log(experience)
        
        let layout = {
            title: "Salary by Job Title and Experience"
        };
          
        if (EXPlevel === "ALL LEVELS"){
            let barChartData = [
                {
                    x: data.map(value => value.salary),
                    y: data.map(value =>value.job_title),
                    type: "bar",
                    orientation: 'h'
                }
            ];
            Plotly.newPlot("bar", barChartData, layout)
        }
        else if (EXPlevel !== "ALL"){
            let barChartData = [
                {
                    x: experience.map(value => value.salary),
                    y: experience.map(value => value.job_title),
                    type: "bar",
                    orientation: 'h'
                }
            ];
            Plotly.newPlot("bar", barChartData, layout)
        }
    });
}



function optionChanged(newInput) {
    makeBarChart(newInput);
}


makeBarChart()

// d3.select("#selDataset")
//       .selectAll('myOptions')
//       .data(allIds)
//       .enter()
//       .append('option')
//       .text(function (d) { return d; }) // text showed in the menu
//       .attr("value", function (d) { return d; }) // corresponding value returned by the button

//main();

// function main() {
    // let barChartData = [
    //     {
    //         x: experience.map(value => value.salary),
    //         y: experience.map(value => value.job_title),
    //         type: "bar",
    //         orientation: 'h'
    //     }
    // ];
    // Plotly.newPlot("bar", barChartData);

//     d3.json(data1).then((data) => {
//         let dropdown_list = ["EN","MI", "SE"]

//         for (let i=0; i < dropdown_list.length; i++) {
//             user_selection
//             .append("option")
//             .text(dropdown_list[i])
//             .property("value", dropdown_list[i]);
//         };

//         let defaultValue = dropdown_list[0];

//         makeBarChart(defaultValue);
//     });
// }


