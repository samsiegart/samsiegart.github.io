var width = document.body.offsetWidth,
    height = document.body.offsetHeight;

var vertices = d3.range(25).map(function(d) {
  return [Math.random() * width, Math.random() * height,
          Math.random() * 1.5, Math.random() * 1.5];
});

var voronoi = d3.geom.voronoi()
    .clipExtent([[0, 0], [width, height]]);

var svg = d3.select(".container").insert("svg", ".card")
    .attr("width", width)
    .attr("height", height)

var path = svg.append("g").selectAll("path");

function translate() {
  for(var i = 0; i < 25; i = i + 1){
    vertices[i][0] = vertices[i][0] + vertices[i][2];
    vertices[i][1] = vertices[i][1] + vertices[i][3];
    if(vertices[i][0] >= width - 1.6){
        vertices[i][0] = width - 1.6;
        vertices[i][2] = vertices[i][2] * -1;
    } else if(vertices[i][0] <= 1.6) {
        vertices[i][0] = 1.6;
        vertices[i][2] = vertices[i][2] * -1;
    }
    if(vertices[i][1] >= height - 1.6){
        vertices[i][1] = height - 1.6;
        vertices[i][3] = vertices[i][3] * -1;
    } else if(vertices[i][1] <= 1.6) {
        vertices[i][1] = 1.6;
        vertices[i][3] = vertices[i][3] * -1;
    }
  }
}

redraw();
function redraw() {
  window.requestAnimationFrame(redraw);
  path = path
      .data(voronoi(vertices), polygon);
  path.exit().remove();
  path.enter().append("path")
      .attr("class", function(d, i) { return "q" + (i % 2) + "-9"; })
      .attr("d", polygon);
  path.order();
  translate();
}

function polygon(d) {
  return "M" + d.join("L") + "Z";
}
