// dimensions of the maze
var rows, cols;

// number of pixels
var cellSize = 40;

// array that stores all the Cells in the maze
var grid = [];

// Cell that is being currently visited
var current;

// required for p5.js project
function setup() {
  	createCanvas(400, 400);

  	// determine the number of rows and columns in this maze by the canvas size
  	rows = floor(height / cellSize);
  	cols = floor(width / cellSize);

  	// initialize every Cell with a given position (x,y)
  	for (var x = 0; x < rows; x++) {
  		for (var y = 0; y < cols; y++) {
  			var cell = new Cell(x, y);
  			// add the cell to the array
  			grid.push(cell);
  		}
  	}

  	// start at the first Cell in the grid
  	current = grid[0];
}

// required for p5.js project
// initiates the branch recursion for drawing the tree
function draw() {
  	background(51);

  	// show all the Cells
  	for (var i = 0; i < grid.length; i++) {
  		grid[i].show(cellSize);
  	}

  	// visit the first Cell in the grid
  	current.visited = true;
  	// check if any of the current Cell's neighbors have not been visited
  	current.checkNeighbors(grid, getIndex);
}

function getIndex(x, y) {
	return x + y * cols;
}