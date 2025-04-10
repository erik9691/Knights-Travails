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
					adjacencyVertex[i][0] > 8 ||
					adjacencyVertex[i][0] < 0 ||
					adjacencyVertex[i][1] > 8 ||
					adjacencyVertex[i][1] < 0
				) {
					adjacencyVertex.splice(i, 1);
				}
			}
			//console.log("SQUARE " + square + " LIST:", adjacencyVertex);
			outputList.push(adjacencyVertex);
		});
		return outputList;
	}
	positionToIndex(position) {
		let index = -1;
		index += position[0] + 1 + 8 * position[1];
		return index;
	}
}

const adjList = new KnightAdjacencyList();
console.log(adjList.positionToIndex([0, 0]));
