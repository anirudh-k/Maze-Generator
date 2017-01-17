// dimensions of the maze
var rows, cols;

// number of pixels
var cellSize = 40;

// array that stores all the Cells in the maze
var grid = [];

// keeps track of the cells we have visited
// by using a stack, this generator uses the depth-first-search algorithm
// if this were a queue, the maze would be generated with breadth-first-search
var stack = [];

// Cell that is being currently visited
var current;

// required for p5.js project
function setup() {
  	createCanvas(400, 400);
  	frameRate(10);

  	// determine the number of rows and columns in this maze by the canvas size
  	rows = floor(height / cellSize);
  	cols = floor(width / cellSize);

  	// initialize every Cell with a given position (x,y)
  	for (var x = 0; x < rows; x++) {
  		for (var y = 0; y < cols; y++) {
  			var cell = new Cell(y, x);

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
  	// for (var i = 0; i < grid.length; i++) {
  	// 	grid[i].show();
  	// }
  	for (let c of grid) {
  		c.show();
  	}

  	// visit the first Cell in the grid
  	current.visited = true;

  	// identify which cell the generator is currently on
  	current.highlight();

  	// STEP 1
  	// check if any of the current Cell's neighbors have not been visited
  	// if there are any unvisited neighbors, picks one and assigns to next
  	var next = current.checkNeighbors(grid, getIndex);

  	if (next) {
  		// STEP 2
  		stack.push(current);

  		// STEP 3
  		removeWalls(current, next);

  		// STEP 4
  		current = next;
  		next.visited = true;
  	} else if (stack.length > 0) {
  		current = stack.pop();
  	}
}

// given a Cell's x and y position, returns its index in the grid array
// returns -1 if the given index is invalid (out of bounds)
function getIndex(x, y) {
	if (x < 0 || y < 0 || x > cols - 1 || y > rows - 1) {
		return -1;
	} else {
		return x + y * cols;
	}
}

// removes the wall common to the two given cells
function removeWalls(c1, c2) {
	var x = c1.x - c2.x;
	var y = c1.y - c2.y;

	// c1 is to the right of c2
	if (x === 1) {
		// left wall of first cell
		c1.walls[3] = false;
		// right wall of second cell
		c2.walls[1] = false;
	}
	// c1 is to the left of c2
	else if (x === -1) {
		c1.walls[1] = false;
		c2.walls[3] = false;
	}
	// c1 is below c2
	else if (y === 1) {
		c1.walls[0] = false;
		c2.walls[2] = false;
	}
	// c1 is above c2
	else if (y === -1) {
		c1.walls[2] = false;
		c2.walls[0] = false;
	}
}





