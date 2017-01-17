// x is the Cell's column position in the grid
// y is the Cell's row position in the grid
function Cell(x, y) {
	this.x = x;
	this.y = y;
	// [top, right, bottom, left]
	this.walls = [true, true, true, true];
	this.visited = false;

	// takes in the pixel size of the Cell (which is a square)
	this.show = function() {
		var xPixel = x * cellSize;
		var yPixel = y * cellSize;
		stroke(255);

		if (this.walls[0]) {
			// top-side border
			line(xPixel, yPixel, xPixel + cellSize, yPixel);
		}
		if (this.walls[1]) {
			// right-side border
			line(xPixel + cellSize, yPixel, xPixel + cellSize, yPixel + cellSize);
		}
		if (this.walls[2]) {
			// bottom-side border
			line(xPixel, yPixel + cellSize, xPixel + cellSize, yPixel + cellSize);
		}
		if (this.walls[3]) {
			// left-side border
			line(xPixel, yPixel, xPixel, yPixel + cellSize);
		}

		// colors the Cell purple if it has been visited
		if (this.visited) {
			noStroke();
			fill(255, 0, 255, 100);
			rect(xPixel, yPixel, cellSize, cellSize);
		}
	};

	// determines if the 
	this.checkNeighbors = function() {
		var neighbors = [];
		var unvisitedNeighbors = [];

		// add cells to neighbors array
		neighbors.push(grid[getIndex(x, y - 1)]);
		neighbors.push(grid[getIndex(x + 1, y)]);
		neighbors.push(grid[getIndex(x, y + 1)]);
		neighbors.push(grid[getIndex(x - 1, y)]);

		// iterate over neighbors
		for (let c of neighbors) {
			// if the cell is defined and it has not been visited...
			if (c && !c.visited) {
				/// ... add it to the unvisited neighbors array
				unvisitedNeighbors.push(c);
			}
		}

		// if there are any unvisited neighbors...
		if (unvisitedNeighbors.length > 0) {
			// ... select one at random and return it
			var r = floor(random(0, unvisitedNeighbors.length));
			return unvisitedNeighbors[r];
		} else {
			return undefined;
		}
	};
}