// var csv is the CSV file with headers
// http://techslides.com/convert-csv-to-json-in-javascript
function csvJSON(csv){

  var lines=csv.split("\n");

  var result = [];

  var headers=lines[0].split(",");

  for(var i=1;i<lines.length;i++){

	  var obj = {};
	  var currentline=lines[i].split(",");

	  for(var j=0;j<headers.length;j++){
		  obj[headers[j]] = currentline[j];
	  }

	  result.push(obj);

  }

  //return result; //JavaScript object
  return JSON.stringify(result); //JSON
}

var graphBack;
var json;

$.getJSON("graph.json", function(d) {
  graphBack = new Graph();
  json = d;
  for (var i = 0; i < d.nodes.length; i++) {
    var newVertex = new GraphVertex(d.nodes[i]);
    graphBack.addVertex(newVertex);
  }

  for (var j = 0; j < d.links.length; j++) {
    graphBack.addEdge( graphBack.getVertex(d.links[j].source), graphBack.getVertex(d.links[j].target) );
  }
});

var palette = {
  "lightgray": "#819090",
  "gray": "#708284",
  "mediumgray": "#536870",
  "darkgray": "#475B62",

  "darkblue": "#0A2933",
  "darkerblue": "#042029",

  "paleryellow": "#FCF4DC",
  "paleyellow": "#EAE3CB",
  "yellow": "#A57706",
  "orange": "#BD3613",
  "red": "#D11C24",
  "pink": "#C61C6F",
  "purple": "#595AB7",
  "blue": "#2176C7",
  "green": "#259286",
  "yellowgreen": "#738A05"
};

var width = $("#left").width(),
height = ($(window).height())-250;

var radius = d3.scale.sqrt()
.range([0, 6]);

var svg = d3.select("#donorGraph")
.attr("width", width)
.attr("height", height);

var force = d3.layout.force()
.size([width, height])
.charge(-400)
.linkDistance(function(d) { return radius(d.source.size) + radius(d.target.size) + 20; });

d3.json("graph.json", function(graph) {
  force
  .nodes(graph.nodes)
  .links(graph.links)
  .gravity(0.07)
  .linkDistance(150)
  .charge(-1000)
  .on("tick", tick)
  .start();

  var link = svg.selectAll(".link")
  .data(graph.links)
  .enter().append("g")
  .attr("class", "link");

  link.append("line")
  .style("stroke-width", function(d) { return (d.bond * 2 - 1) * 2 + "px"; });

  link.filter(function(d) { return d.bond > 1; }).append("line")
  .attr("class", "separator");

  var node = svg.selectAll(".node")
  .data(graph.nodes)
  .enter().append("g")
  .attr("class", "node")
  .call(force.drag)
  .on('click', function(d) {
    // find matching node in the graphBack
    var dBack = getCorrespNode(d);
    if (dBack != null) {
      d3.select('.profile-name')
      .text(dBack.data.atom)
      .transition()
      .style('opacity', 1);

      d3.select('.profile-donation')
      .text(formatDonation(dBack.data.donation))
      .transition()
      .style('opacity', 1);

      d3.select('.profile-numLinks')
      .text( dBack.neighbors.length )
      .transition()
      .style('opacity', 1);

      d3.select('.profile-1stDegree')
      .text( formatDonation( getGraph().valueDegreeN(dBack, 1)) )
      .transition()
      .style('opacity', 1);

      d3.select('.profile-2ndDegree')
      .text( formatDonation( getGraph().valueDegreeN(dBack, 2)) )
      .transition()
      .style('opacity', 1);

      d3.select('.prof-img').attr("src", dBack.data.pic);
    }
  });

  node.append("circle")
  .attr("r", function(d) {
    var dBack = getCorrespNode(d);
    return radius(Math.pow((dBack.neighbors.length), 2));
  })
  .style("fill", function(d) {
    var dBack = getCorrespNode(d);
    switch (dBack.neighbors.length) {
      case 1:
        return  palette.blue;
        break;
        case 2:
          return  palette.green;
          break;
          case 3:
            return  palette.yellow;
            break;
            case 4:
              return  palette.purple;
              break;
              case 5:
                return  palette.pink;
                break;
                case 6:
                  return  palette.red;
                  break;
                  default:
                    return palette.red;
                  }
                });

                node.append("text")
                .attr("dy", ".35em")
                .attr("text-anchor", "beginning")
                .text(function(d) { return d.atom; });

                function formatDonation(amt) {
                  return "$" + (amt + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,');

                }

                /**
                * @param d the node in the graph.json
                */
                function getCorrespNode(d) {
                  for (var i = 0; i < graphBack.hash.length; i++) {
                    if (d.atom == graphBack.getVertex(i).data.atom) {
                      return graphBack.getVertex(i);
                    }
                  }
                  return null;
                }

                function getGraph() {
                  return graphBack;
                }

                function tick() {
                  link.selectAll("line")
                  .attr("x1", function(d) { return d.source.x; })
                  .attr("y1", function(d) { return d.source.y; })
                  .attr("x2", function(d) { return d.target.x; })
                  .attr("y2", function(d) { return d.target.y; });

                  node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
                }
              });
