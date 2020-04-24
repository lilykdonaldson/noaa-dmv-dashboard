var config = {
  "avatar_size": 100//define the size of teh circle radius
}

var body = d3.select("body");

var svg = body.append("svg")
  .attr("width", 500)
  .attr("height", 500);

var defs = svg.append('svg:defs');

data = [{
  posx: 100,
  posy: 100,
  img: "https://cdn0.iconfinder.com/data/icons/flat-round-system/512/android-128.png",

}, {
  posx: 200,
  posy: 200,

  img: "https://cdn1.iconfinder.com/data/icons/social-media-set/24/Reverbnation-128.png"
}, {
  posx: 300,
  posy: 300,

  img: "https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-128.png"
}]
data.forEach(function(d, i) {
  defs.append("svg:pattern")
    .attr("id", "grump_avatar" + i)
    .attr("width", config.avatar_size)
    .attr("height", config.avatar_size)
    .attr("patternUnits", "userSpaceOnUse")
    .append("svg:image")
    .attr("xlink:href", d.img)
    .attr("width", config.avatar_size)
    .attr("height", config.avatar_size)
    .attr("x", 0)
    .attr("y", 0);
  var divi = 2;
  var circle = svg.append("circle")
    .attr("transform", "translate(" + d.posx + "," + d.posy + ")")
    .attr("cx", config.avatar_size / divi)
    .attr("cy", config.avatar_size / 6)
    .attr("r", config.avatar_size / divi)
    .style("fill", "#fff")
    .style("fill", "url(#grump_avatar" + i + ")");

})