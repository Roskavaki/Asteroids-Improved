export { sqr, tri, nGon , rectangle};

var sqr = [
  [-10, -10],
  [-10, 10],
  [10, 10],
  [10, -10],
  [-10, -10],
];

var tri = [
  [0, -20],
  [-10, 10],
  [10, 10],
  [0, -20],
];

function rectangle( width=10 , height=10 ){
  let x = width/2;
  let y = height/2;
  let coords = [
    [-x , -y],
    [-x , y],
    [x , y],
    [x,-y],
    [-x,-y]
  ]
  return coords;
}

/**
 * creates a polygon coordinate list with specified number of sides and radius
 * @param {integer} n how many sides the polygon has
 * @param {integer} size the radius of the vertices from the center
 * @returns an array of [x,y] coordinate pairs used to construct the polygon
 */
function nGon(n=6, size = 10) {
  var coords = [];
  var angleIncrement = (2 * Math.PI) / n;

  for (var i = 0; i < n; i++) {
    var angle = angleIncrement * i;
    var x = size * Math.cos(angle);
    var y = size * Math.sin(angle);
    coords.push([x, y]);
  }

  //repeat the first coordinate set to complete the loop
  coords.push(coords[0]);

  return coords;
}
