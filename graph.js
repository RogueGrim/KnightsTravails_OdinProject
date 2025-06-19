class Graph {
    constructor(len) {
        this.len = len;
        this.mat = Array.from({ length: len }, () =>
            Array.from({ length: len }, () => [])
        );
    }

    addEdge(x1, y1, x2, y2) {
        this.mat[x1][y1].push([x2, y2]);
        this.mat[x2][y2].push([x1, y1]);
    }

    display() {
        for (let x = 0; x < this.len; x++) {
            for (let y = 0; y < this.len; y++) {
                const moves = this.mat[x][y]
                    .map(([i, j]) => `(${i},${j})`)
                    .join(" ");
                console.log(`(${x},${y}) -> ${moves}`);
            }
        }
    }
}

const matrix = new Graph(8);

// Build full knight graph once
function buildKnightGraph() {
    const directions = [
        [2, 1], [2, -1], [-2, 1], [-2, -1],
        [1, 2], [1, -2], [-1, 2], [-1, -2]
    ];

    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            for (const [dx, dy] of directions) {
                const nx = x + dx;
                const ny = y + dy;
                if (nx >= 0 && nx < 8 && ny >= 0 && ny < 8) {
                    matrix.addEdge(x, y, nx, ny);
                }
            }
        }
    }
}

function KnightMoves(start, end) {
    const visited = Array.from({ length: 8 }, () => Array(8).fill(false));
    const parent = Array.from({ length: 8 }, () => Array(8).fill(null));

    const queue = [start];
    visited[start[0]][start[1]] = true;

    while (queue.length > 0) {
        const [x, y] = queue.shift();

        if (x === end[0] && y === end[1]) break;

        for (const [nx, ny] of matrix.mat[x][y]) {
            if (!visited[nx][ny]) {
                visited[nx][ny] = true;
                parent[nx][ny] = [x, y];
                queue.push([nx, ny]);
            }
        }
    }

    // Reconstruct path
    const path = [];
    let current = end;

    while (current !== null) {
        path.unshift(current);
        current = parent[current[0]][current[1]];
    }

    if (path.length === 0 || path[0][0] !== start[0] || path[0][1] !== start[1]) {
        return null;
    }

    return path;
}

// Build the knight graph
buildKnightGraph();

// Test the path
const path = KnightMoves([0, 0], [7, 7]);
console.log("Shortest Path:", path);

matrix.display(); // Optional: see full graph
