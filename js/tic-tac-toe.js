const cells = document.querySelectorAll(".cell");

const status = document.getElementById("status");

const restartBtn = document.getElementById("restartBtn");

const xScoreDisplay = document.getElementById("xScore");
const oScoreDisplay = document.getElementById("oScore");
const drawScoreDisplay = document.getElementById("drawScore");

const resetScoresBtn = document.getElementById("resetScoresBtn");

const twoPlayerBtn = document.getElementById("twoPlayerBtn");
const computerBtn = document.getElementById("computerBtn");

const easyBtn = document.getElementById("easyBtn");
const mediumBtn = document.getElementById("mediumBtn");
const hardBtn = document.getElementById("hardBtn");

const clickSound = new Audio("../sounds/click.mp3");
const winSound = new Audio("../sounds/win.mp3");
const loseSound = new Audio("../sounds/lose.mp3");

const achievementPopup =
    document.getElementById("achievementPopup");

function showAchievement(message){

    achievementPopup.textContent =
        "🏆 " + message;

    achievementPopup.classList.add("show");

    setTimeout(function(){

        achievementPopup.classList.remove("show");

    },3000);

}

let xScore = Number(localStorage.getItem("xScore")) || 0;
let oScore = Number(localStorage.getItem("oScore")) || 0;
let drawScore = Number(localStorage.getItem("drawScore")) || 0;
let gamesPlayed = Number(localStorage.getItem("gamesPlayed")) || 0;
let currentPlayer = "X";
let vsComputer = false;
let difficulty = "medium";

let board = ["","","","","","","","",""];

const winningCombinations = [

    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6]

];

let gameActive = true;

cells.forEach(cell => {

    cell.addEventListener("click", handleClick);

});

restartBtn.addEventListener("click", restartGame);

resetScoresBtn.addEventListener("click", resetScores);

twoPlayerBtn.addEventListener("click", () => {
    vsComputer = false;
    restartGame();
});

easyBtn.addEventListener("click", () => {
    difficulty = "easy";
    vsComputer = true;
    updateDifficultyButtons();
    restartGame();
});

mediumBtn.addEventListener("click", () => {
    difficulty = "medium";
    vsComputer = true;
    updateDifficultyButtons();
    restartGame();
});

hardBtn.addEventListener("click", () => {
    difficulty = "hard";
    vsComputer = true;
    updateDifficultyButtons();
    restartGame();
});

computerBtn.addEventListener("click", () => {
    vsComputer = true;
    restartGame();
});

function handleClick(){

    if (!gameActive) return;

    clickSound.currentTime = 0;
clickSound.play();

    const index = this.dataset.index;

    if(board[index] !== "") return;

    board[index] = currentPlayer;

    this.textContent = currentPlayer;

  checkWinner();

if (!gameActive) return;

currentPlayer = currentPlayer === "X" ? "O" : "X";

status.textContent = "Player " + currentPlayer + "'s Turn";

// Let the computer play as O
if (vsComputer && currentPlayer === "O") {
    setTimeout(computerMove, 500);
}

}

function restartGame(){

    board = ["","","","","","","","",""];

    currentPlayer = "X";

    status.textContent = "Player X's Turn";

   cells.forEach(cell => {

    cell.textContent = "";
    cell.classList.remove("winner");

});

    gameActive = true;

}

function updateDifficultyButtons() {
    easyBtn.classList.remove("active");
    mediumBtn.classList.remove("active");
    hardBtn.classList.remove("active");

    if (difficulty === "easy") {
        easyBtn.classList.add("active");
    } else if (difficulty === "medium") {
        mediumBtn.classList.add("active");
    } else if (difficulty === "hard") {
        hardBtn.classList.add("active");
    }
}

function checkWinner(){

    // Check for a winner
    for(let combination of winningCombinations){

        const a = combination[0];
        const b = combination[1];
        const c = combination[2];


        if(
            board[a] !== "" &&
            board[a] === board[b] &&
            board[b] === board[c]
        ){

cells[a].classList.add("winner");
cells[b].classList.add("winner");
cells[c].classList.add("winner");

            if(board[a] === "X"){

    xScore++;
localStorage.setItem("xScore", xScore);
updateScoreboard();

}else{

    oScore++;
localStorage.setItem("oScore", oScore);
updateScoreboard();

}

gamesPlayed++;
localStorage.setItem("gamesPlayed", gamesPlayed);
updateScoreboard();

status.textContent = "🎉 Player " + board[a] + " Wins!";

winSound.currentTime = 0;
winSound.play();

            gameActive = false;

            return;

        }

    }

    // Check for a draw
    if(!board.includes("")){

       drawScore++;
localStorage.setItem("drawScore", drawScore);
updateScoreboard();

gamesPlayed++;
localStorage.setItem("gamesPlayed", gamesPlayed);
updateScoreboard();

status.textContent = "🤝 It's a Draw!";

loseSound.currentTime = 0;
loseSound.play();

        gameActive = false;

    }

    let totalGames = Number(localStorage.getItem("totalGames")) || 0;

totalGames++;

localStorage.setItem("totalGames", totalGames);

}

let totalWins = Number(localStorage.getItem("totalWins")) || 0;

totalWins++;

localStorage.setItem("totalWins", totalWins);

function findWinningMove() {

    for (let combination of winningCombinations) {

        const [a, b, c] = combination;

        const values = [board[a], board[b], board[c]];

        // Two O's and one empty space
        if (values.filter(v => v === "O").length === 2 &&
            values.includes("")) {

            if (board[a] === "") return a;
            if (board[b] === "") return b;
            if (board[c] === "") return c;
        }
    }

    return -1;
}

function findBlockingMove() {

    for (let combination of winningCombinations) {

        const [a, b, c] = combination;

        const values = [board[a], board[b], board[c]];

        // Two X's and one empty space
        if (values.filter(v => v === "X").length === 2 &&
            values.includes("")) {

            if (board[a] === "") return a;
            if (board[b] === "") return b;
            if (board[c] === "") return c;
        }
    }

    return -1;
}

function minimax(newBoard, player) {

    // Check possible outcomes
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;

        if (
            newBoard[a] !== "" &&
            newBoard[a] === newBoard[b] &&
            newBoard[b] === newBoard[c]
        ) {
            if (newBoard[a] === "O") return 10;
            if (newBoard[a] === "X") return -10;
        }
    }

    // Draw
    if (!newBoard.includes("")) {
        return 0;
    }

    const availableMoves = [];

    newBoard.forEach((cell, index) => {
        if (cell === "") {
            availableMoves.push(index);
        }
    });

    if (player === "O") {

        let bestScore = -Infinity;

        for (let move of availableMoves) {

            newBoard[move] = "O";

            const score = minimax(newBoard, "X");

            newBoard[move] = "";

            bestScore = Math.max(bestScore, score);
        }

        return bestScore;

    } else {

        let bestScore = Infinity;

        for (let move of availableMoves) {

            newBoard[move] = "X";

            const score = minimax(newBoard, "O");

            newBoard[move] = "";

            bestScore = Math.min(bestScore, score);
        }

        return bestScore;
    }
}

function computerMove() {

    console.log("Computer is moving");

    if (!gameActive) return;

    let emptyCells = [];

    board.forEach((cell, index) => {
        if (cell === "") {
            emptyCells.push(index);
        }
    });

    if (emptyCells.length === 0) return;

    if (difficulty === "easy") {
    const randomMove =
        emptyCells[Math.floor(Math.random() * emptyCells.length)];

    board[randomMove] = "O";
    cells[randomMove].textContent = "O";

    checkWinner();

    if (!gameActive) return;

    currentPlayer = "X";
    status.textContent = "Player X's Turn";
    return;
}

if (difficulty === "hard") {

    let bestScore = -Infinity;
    let bestMove;

    for (let i = 0; i < board.length; i++) {

        if (board[i] === "") {

            board[i] = "O";

            let score = minimax(board, "X");

            board[i] = "";

            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }

    board[bestMove] = "O";
    cells[bestMove].textContent = "O";

    checkWinner();

    if (!gameActive) return;

    currentPlayer = "X";
    status.textContent = "Player X's Turn";

    return;
}

    // First, try to win
let move = findWinningMove();

// If no winning move, block the player
if (move === -1) {
    move = findBlockingMove();
}

// If neither, choose a random move
// If no winning or blocking move, take the center
if (move === -1 && board[4] === "") {
    move = 4;
}

// Otherwise choose a random move
// Try to take the center
if (move === -1 && board[4] === "") {
    move = 4;
}

// Otherwise try a corner
if (move === -1) {

    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter(index => board[index] === "");

    if (availableCorners.length > 0) {
        move = availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }
}

// Finally, choose any remaining empty cell
if (move === -1) {
    move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
}

board[move] = "O";
cells[move].textContent = "O";

    checkWinner();

    if (!gameActive) return;

    currentPlayer = "X";
    status.textContent = "Player X's Turn";
}

function updateScoreboard() {
    xScoreDisplay.textContent = xScore;
    oScoreDisplay.textContent = oScore;
    drawScoreDisplay.textContent = drawScore;
    document.getElementById("gamesPlayed").textContent = gamesPlayed;
}

function resetScores() {
    xScore = 0;
    oScore = 0;
    drawScore = 0;
    gamesPlayed = 0;

    localStorage.setItem("xScore", xScore);
    localStorage.setItem("oScore", oScore);
    localStorage.setItem("drawScore", drawScore);
    localStorage.setItem("gamesPlayed", gamesPlayed);

    updateScoreboard();
}

updateScoreboard();

updateDifficultyButtons();