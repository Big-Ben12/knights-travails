// All 8 possible knight moves (x, y)
const MOVES = [
  [2, 1], [2, -1], [-2, 1], [-2, -1],
  [1, 2], [1, -2], [-1, 2], [-1, -2]
];

// Check if a move is on the board (0–7)
function isValid([x, y]) {
  return x >= 0 && x < 8 && y >= 0 && y < 8;
}

// Generate all valid moves from a given position
function getKnightMoves([x, y]) {
  return MOVES
    .map(([dx, dy]) => [x + dx, y + dy])
    .filter(isValid);
}

// Node structure for BFS
class Node {
  constructor(position, parent = null) {
    this.position = position;
    this.parent = parent; // link back to reconstruct path
  }
}

// BFS to find shortest path
function knightMoves(start, end) {
  if (!isValid(start) || !isValid(end)) {
    throw new Error("Positions must be within 0–7 range");
  }

  const queue = [new Node(start)];
  const visited = new Set();

  while (queue.length > 0) {
    const currentNode = queue.shift();
    const [x, y] = currentNode.position;
    const key = `${x},${y}`;

    if (visited.has(key)) continue;
    visited.add(key);

    // Check if we've reached destination
    if (x === end[0] && y === end[1]) {
      return reconstructPath(currentNode);
    }

    // Add all valid moves
    for (const move of getKnightMoves([x, y])) {
      queue.push(new Node(move, currentNode));
    }
  }
}

// Rebuild path by following parent links back to start
function reconstructPath(node) {
  const path = [];
  while (node) {
    path.unshift(node.position);
    node = node.parent;
  }

  console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
  path.forEach((step) => console.log(step));
  return path;
}

// ---------------- TEST CASES ----------------
knightMoves([0, 0], [1, 2]);
knightMoves([0, 0], [3, 3]);
knightMoves([3, 3], [0, 0]);
knightMoves([0, 0], [7, 7]);
