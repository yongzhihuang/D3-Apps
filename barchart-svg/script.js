var data = [
  {name: "Locke",    value:  4},
  {name: "Reyes",    value:  8},
  {name: "Ford",     value: 15},
  {name: "Jarrah",   value: 16},
  {name: "Shephard", value: 23},
  {name: "Kwon",     value: 42}
];

var margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var chart = d3.select(".chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

x.domain(data.map(function(d) { return d.name; }));
  y.domain([0, d3.max(data, function(d) { return d.value; })]);

  chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  chart.append("g")
      .attr("class", "y axis")
      .call(yAxis);

  chart.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.name); })
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); })
      .attr("width", x.rangeBand());

//Parse from CSV
// d3.tsv("data/data.tsv", type, function(error, data) {
//   x.domain([0, d3.max(data, function(d) { return d.value; })]);

//   chart.attr("height", barHeight * data.length);

//   //each data point will consist of a <g> and each <g> will consist of <rect> and <text>
//   //use data we have and move each item on x
//   var bar = chart.selectAll("g")
//       .data(data)
//     .enter().append("g")
//       .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

//   //Create rectangle, width is the data.value, height is barHeight -1
//   bar.append("rect")
//       .attr("width", function(d) { return x(d.value); })
//       .attr("height", barHeight - 1);

//   //Text positioning, dy is vertical position.
//   bar.append("text")
//       .attr("x", function(d) { return x(d.value) - 3; })
//       .attr("y", barHeight / 2)
//       .attr("dy", ".35em")
//       .text(function(d) { return d.value; });
// });

//This function is passed in to convert value to number, pass that to .tsv param
function type(d) {
  d.value = +d.value; // coerce to number
  return d;
}