const board = document.getElementById("board");
let cells = Array(9).fill(null);
let currentPlayer = "X";
let gameOver = false;
let scores = { X: 0, O: 0 };
let playWithAI = false;

function renderBoard() {
    board.innerHTML = "";
    cells.forEach((value, index) => {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        if (value) cell.classList.add("taken");
        cell.textContent = value || "";
        cell.onclick = () => handleMove(index);
        board.appendChild(cell);
    });
}

function handleMove(index) {
    if (cells[index] || gameOver) return;
    cells[index] = currentPlayer;
    if (checkWinner()) {
        document.getElementById("status").textContent = `${currentPlayer} wins!`;
        scores[currentPlayer]++;
        updateScoreboard();
        gameOver = true;
        return;
    }
    if (!cells.includes(null)) {
        document.getElementById("status").textContent = "It's a tie!";
        return;
    }
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    renderBoard();
    if (playWithAI && currentPlayer === "O") setTimeout(aiMove, 500);
}

function aiMove() {
    let availableMoves = cells.map((v, i) => v === null ? i : null).filter(v => v !== null);
    if (availableMoves.length === 0) return;
    let randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    handleMove(randomMove);
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winPatterns.some(pattern =>
        pattern.every(index => cells[index] === currentPlayer)
    );
}

function resetGame() {
    cells = Array(9).fill(null);
    currentPlayer = "X";
    gameOver = false;
    document.getElementById("status").textContent = "";
    renderBoard();
}

function resetScores() {
    scores = { X: 0, O: 0 };
    updateScoreboard();
}

function updateScoreboard() {
    document.getElementById("scoreX").textContent = scores.X;
    document.getElementById("scoreO").textContent = scores.O;
}

renderBoard();
