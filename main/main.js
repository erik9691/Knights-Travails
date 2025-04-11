class KnightAdjacencyList {
	constructor() {
		this.list = this.createList();
	}
	createList() {
		const board = [];
		let xBoard = 0;
		let yBoard = 0;
		for (let i = 0; i < 64; i++) {
			board.push([xBoard, yBoard]);
			if (xBoard < 7) {
				xBoard += 1;
			} else {
				xBoard = 0;
				yBoard += 1;
			}
		}
		const outputList = [];
		board.forEach((square) => {
			const adjacencyVertex = [];
			const xSquare = square[0];
			const ySquare = square[1];
			adjacencyVertex.push([xSquare - 2, ySquare - 1]);
			adjacencyVertex.push([xSquare - 2, ySquare + 1]);
			adjacencyVertex.push([xSquare - 1, ySquare - 2]);
			adjacencyVertex.push([xSquare - 1, ySquare + 2]);
			adjacencyVertex.push([xSquare + 2, ySquare - 1]);
			adjacencyVertex.push([xSquare + 2, ySquare + 1]);
			adjacencyVertex.push([xSquare + 1, ySquare - 2]);
			adjacencyVertex.push([xSquare + 1, ySquare + 2]);
			for (let i = adjacencyVertex.length - 1; i > -1; i--) {
				if (
					adjacencyVertex[i][0] > 7 ||
					adjacencyVertex[i][0] < 0 ||
					adjacencyVertex[i][1] > 7 ||
					adjacencyVertex[i][1] < 0
				) {
					adjacencyVertex.splice(i, 1);
				}
			}
			outputList.push(adjacencyVertex);
		});
		return outputList;
	}
	positionToIndex(position) {
		let index = -1;
		index += position[0] + 1 + 8 * position[1];
		return index;
	}
	arrayIncludes(array, item) {
		let returnValue = false;
		array.forEach((arrayItem) => {
			if (arrayItem.value[0] === item[0] && arrayItem.value[1] === item[1]) {
				returnValue = true;
			}
		});
		return returnValue;
	}
	getShortestPath(startSquare, endSquare) {
		const getShortestPathRecursive = (queue, endSquare, traveledArray = []) => {
			if (queue.length > 0) {
				traveledArray.push(queue[0]);
				const neighbors = this.list[this.positionToIndex(queue[0].value)];
				for (let i = 0; i < neighbors.length; i++) {
					const square = neighbors[i];
					if (!this.arrayIncludes(traveledArray, square)) {
						if (square[0] === endSquare[0] && square[1] === endSquare[1]) {
							traveledArray.push(new Square(queue[0], [square[0], square[1]]));
							const result = traveledArray[traveledArray.length - 1].returnPath();
							return `You made it in ${result.length - 1} moves!  Here's your path: ${JSON.stringify(result)}`;
						} else {
							queue.push(new Square(queue[0], [square[0], square[1]]));
						}
					}
				}
				queue.shift();
				if (queue.length > 0) {
					return getShortestPathRecursive(queue, endSquare, traveledArray);
				}
			}
		};
		return getShortestPathRecursive([new Square(null, startSquare)], endSquare);
	}
}
class Square {
	constructor(parent, value) {
		this.parent = parent;
		this.value = value;
	}
	returnPath() {
		const path = [];
		let currentSquare = this;
		while (currentSquare !== null) {
			path.push(currentSquare.value);
			currentSquare = currentSquare.parent;
		}
		const reversePath = [];
		for (let i = path.length - 1; i > -1; i--) {
			reversePath.push(path[i]);
		}
		return reversePath;
	}
}

const adjList = new KnightAdjacencyList();
console.log(adjList.getShortestPath([0, 0], [7, 7]));
