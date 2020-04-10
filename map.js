  var au = [-77.106342, 38.956379]; //Centering the map at AU (longitude, latitude)

  //Mapboxgl object, placeholder to render a map
  //Tiles represent the world, the base layer on which we'll draw other shapes and visualizations
  mapboxgl.accessToken = 'pk.eyJ1IjoiamFnb2R3aW4iLCJhIjoiY2lnOGQxaDhiMDZzMXZkbHYzZmN4ZzdsYiJ9.Uwh_L37P-qUoeC-MBSDteA';

  var map = new mapboxgl.Map({
    container: 'map',
    center: au,
    maxZoom: 10,
    minZoom: 6,
    zoom: 8,
    style: 'mapbox://styles/mapbox/light-v10' //light-v10 - light greyscale
  });

  //Place for our d3 marks to appear, get Mapbox map canvas container
  var canvas = map.getCanvasContainer();

  //Overlay d3 on the map, svg as a layer on the map
  var svg = d3.select(canvas).append("svg");
  var g = svg.append("g");

  //Uploading data file, then() tells d3 to wait for file before proceeding with a callback function that manipulates the data
  d3.csv('data/sample.csv')
    .then(ready);

  function ready(nodes) { //Argument is name of the data returned from deferred function

    //Creates a circle svg mark for each of the power grid notes
    nodes.forEach(function(d) {
      d.LngLat = [+d.long, +d.lat];
    });

    //Red circles with partial opacity
    g.selectAll('circle')
      .data(nodes)
      .enter().append('circle')
        .style("opacity", 0.6)
        .style("fill", 'red')
        .attr('r', 3)
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut);

    //Ensuring the locations are set correctly and updated when the map view changes
    //Event listeners for the map so that the circles are updated when the user interacts with the map
    map.on("viewreset", function() {
      updateNodes();
    });
    map.on("movestart", function() {
      g.attr("visibility", "hidden");
    });
    map.on("moveend", function() {
      updateNodes();
      g.attr("visibility", "visible");
    });

    updateNodes();
} //end ready()

function updateNodes() { //Calls each time the map stops moving, then draws the circles in the updated pixel location
  //Converting long and lat to the correct pixel locations on the screen
  g.selectAll('circle')
    .attr('cx', function(d) {return project(d.LngLat).x})
    .attr('cy', function(d) {return project(d.LngLat).y});
} //end updateNodes()

function project(d) {
  return map.project(new mapboxgl.LngLat(+d[0], +d[1]));
}

/* FIXME: Hover
Reference: http://bl.ocks.org/WilliamQLiu/76ae20060e19bf42d774
*/
//Create Event Handlers for mouse
function handleMouseOver(d, i) {

  //Select element, change color and size
  d3.select(this).attr({
    fill: "orange",
    r: radius * 2
  });

  //Specify where to put label of text
  svg.append("text").attr({
    id: "t" + d.x + "-" + d.y + "-" + i,  //Create an id for text so we can select it later for removing on mouseout
    x: function() { return xScale(d.x) - 30; },
    y: function() { return yScale(d.y) - 15; }
  })
  .text(function() {
  return [d.x, d.y];  // Value of the text
  });
}

function handleMouseOut(d, i) {
  //Select element, change color back to normal
  d3.select(this).attr({
    fill: "red",
    r: radius
  });

  //Select text by id and then remove
  d3.select("#t" + d.x + "-" + d.y + "-" + i).remove();  // Remove text location
}