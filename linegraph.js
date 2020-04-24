function updateDataSelection()
{
    //var input = document.getElementById("month").value;
    document.getElementById("no-selection").innerHTML = "";



// Set the dimensions of the canvas / graph
var margin = {top: 30, right: 20, bottom: 30, left: 50}
    width = 550 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

// Set the ranges
var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);
//parseDAte
parseDate = d3.time.format("%Y-%m-%d").parse

// Define the axes
var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(5);

var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(5);

// Define the line
var valueline = d3.svg.line()
    .x(function(d) { return x(d.DATE); })
    .y(function(d) { return y(d.PRCP); });
// Adds the svg canvas
var svg = d3.select("#precipitation-graph")
    .append("svg")
        .attr("width", width)
        .attr("height", height)

    .append("g")
        .attr("transform", 
              "translate(" + margin.left + "," + margin.top + ")")
    //.call(responsivefy);

// Get the data
d3.csv("data/sample.csv", function(error, data) {
    data.forEach(function(d) {   
        d.DATE = parseDate(d.DATE);
        //console.log(d.DATE);
//--------------------IM THE PROBLEM CHILD------------//
        d.PRCP = +d.PRCP;
    });

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.PRCP; })]);

    // Add the valueline path.
    svg.append("path")
        .attr("class", "line")
        .attr("d", valueline(data));

    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

});
}


// function responsivefy(svg) {
//     // get container + svg aspect ratio
//     var container = d3.select(svg.node().parentNode),
//         width = parseInt(svg.style("width")),
//         height = parseInt(svg.style("height")),
//         aspect = width / height;

//     // add viewBox and preserveAspectRatio properties,
//     // and call resize so that svg resizes on inital page load
//     svg.attr("viewBox", "0 0 " + width + " " + height)
//         .attr("perserveAspectRatio", "xMinYMid")
//         .call(resize);

//     // to register multiple listeners for same event type, 
//     // you need to add namespace, i.e., 'click.foo'
//     // necessary if you call invoke this function for multiple svgs
//     // api docs: https://github.com/mbostock/d3/wiki/Selections#on
//     d3.select(window).on("resize." + container.attr("id"), resize);

//     // get width of container and resize svg to fit it
//     function resize() {
//         var targetWidth = parseInt(container.style("width"));
//         svg.attr("width", targetWidth);
//         svg.attr("height", Math.round(targetWidth / aspect));
//     }
// }