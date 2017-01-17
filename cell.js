// x is the Cell's column position in the grid
// y is the Cell's row position in the grid
function Cell(x, y) {
	this.x = x;
	this.y = y;
	this.walls = [true, true, true, true];
	this.top = this.walls[0];
	this.right = this.walls[1];
	this.bottom = this.walls[2];
	this.left = this.walls[3];
	this.visited = false;

	// takes in the pixel size of the Cell (which is a square)
	this.show = function(cellSize) {
		var xPixel = x * cellSize;
		var yPixel = y * cellSize;
		stroke(255);

		if (this.top) {
			// top-side border
			line(xPixel, yPixel, xPixel + cellSize, yPixel);
		}
		if (this.left) {
			// left-side border
			line(xPixel, yPixel, xPixel, yPixel + cellSize);
		}
		if (this.bottom) {
			// bottom-side border
			line(xPixel, yPixel + cellSize, xPixel + cellSize, yPixel + cellSize);
		}
		if (this.right) {
			// right-side border
			line(xPixel + cellSize, yPixel, xPixel + cellSize, yPixel + cellSize);
		}

		if (this.visited) {
			fill(255, 0, 255, 100);
			rect(xPixel, yPixel, cellSize, cellSize);
		}
	};

	this.checkNeighbors = function(grid, getIndex) {
		var neighbors = [];
		var visitedNeighbors = [];

		neighbors.push(grid[getIndex(x, y - 1)]);
		neighbors.push(grid[getIndex(x, y + 1)]);
		neighbors.push(grid[getIndex(x - 1, y)]);
		neighbors.push([getIndex(x + 1, y)]);

		for (var cell in neighbors) {
			if (!cell.visited) {
				visitedNeighbors.push(cell);
			}
		}
	};
}