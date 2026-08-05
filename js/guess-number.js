let secretNumber = Math.floor(Math.random() * 100) + 1;

const guessInput = document.getElementById("guessInput");
const guessBtn = document.getElementById("guessBtn");
const restartBtn = document.getElementById("restartBtn");
const message = document.getElementById("message");
const attempts = document.getElementById("attempts");

const easyBtn = document.getElementById("easyBtn");
const mediumBtn = document.getElementById("mediumBtn");
const hardBtn = document.getElementById("hardBtn");
const winPopup = document.getElementById("winPopup");

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



let maxNumber = 100;

let attemptCount = 0;

let lives = 10;

const livesDisplay = document.getElementById("lives");

const bestScoreDisplay = document.getElementById("bestScore");

const rangeText = document.getElementById("rangeText");

let bestScore = localStorage.getItem("bestScore");

if (bestScore !== null) {
    bestScoreDisplay.textContent = "🏆 Best Score: " + bestScore + " attempts";
}

guessBtn.addEventListener("click", checkGuess);

restartBtn.addEventListener("click", newGame);

easyBtn.addEventListener("click", () => setDifficulty("easy"));
mediumBtn.addEventListener("click", () => setDifficulty("medium"));
hardBtn.addEventListener("click", () => setDifficulty("hard"));
guessInput.addEventListener("keydown", function(event){

    if(event.key === "Enter"){

        checkGuess();

    }

});

function checkGuess() {

    clickSound.play();

    let guess = Number(guessInput.value);

    attemptCount++;

attempts.textContent = "Attempts: " + attemptCount;

    if (!guess) {
        message.textContent = "Please enter a number!";
        return;
    }

    if (guess < secretNumber) {

        lives--;

        livesDisplay.textContent = "❤️ Lives: " + lives;

        showMessage("📉 Too low!");
    }
    else if (guess > secretNumber) {

        lives--;

        livesDisplay.textContent = "❤️ Lives: " + lives;

        showMessage("📈 Too high!");
    }
    else {
        winSound.play();

       showMessage
    "🎉 Correct! You guessed it in " +
    attemptCount +
    " attempts!";

// Save a new best score
if (bestScore === null || attemptCount < Number(bestScore)) {

    bestScore = attemptCount;

    localStorage.setItem("bestScore", bestScore);

    bestScoreDisplay.textContent =
        "🏆 Best Score: " + bestScore + " attempts";
}

let totalWins = Number(localStorage.getItem("totalWins")) || 0;

totalWins++;

localStorage.setItem("totalWins", totalWins);

// Stop the player from guessing again after winning
guessBtn.disabled = true;
winPopup.classList.remove("hidden");

document.body.style.background = "#16a34a";
    }

    if (lives === 0) {

        loseSound.play();

    showMessage("💀 Game Over! The number was " + secretNumber);

    guessBtn.disabled = true;

}

let totalGames = Number(localStorage.getItem("totalGames")) || 0;

totalGames++;

localStorage.setItem("totalGames", totalGames);

}

function newGame(){

    secretNumber = Math.floor(Math.random() * 100) + 1;

    guessInput.value = "";

    message.textContent = "";

    attemptCount = 0;

attempts.textContent = "Attempts: 0";

lives = 10;

livesDisplay.textContent = "❤️ Lives: 10";

guessBtn.disabled = false;

document.body.style.background = "#121212";
}

function setDifficulty(level){

    if(level === "easy"){

        maxNumber = 50;
        lives = 15;

    }

    else if(level === "medium"){

        maxNumber = 100;
        lives = 10;

    }

    else{

        maxNumber = 200;
        lives = 7;

    }

    secretNumber = Math.floor(Math.random() * maxNumber) + 1;

    attemptCount = 0;

    guessInput.value = "";

    message.textContent = "";

    attempts.textContent = "Attempts: 0";

    livesDisplay.textContent = "❤️ Lives: " + lives;

    rangeText.innerHTML =
    "I'm thinking of a number between <b>1</b> and <b>" +
    maxNumber +
    "</b>.";

    guessBtn.disabled = false;

}

function closePopup(){

    winPopup.classList.add("hidden");

    newGame();

}

function showMessage(text){

    message.textContent = text;

    message.classList.remove("animate");

    void message.offsetWidth;

    message.classList.add("animate");

}

clickSound.play();