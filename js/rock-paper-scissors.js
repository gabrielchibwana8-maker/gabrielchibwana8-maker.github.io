const choices = ["Rock", "Paper", "Scissors"];

const result = document.getElementById("result");
const computerChoice = document.getElementById("computerChoice");

const playerScoreDisplay = document.getElementById("playerScore");
const computerScoreDisplay = document.getElementById("computerScore");
const history = document.getElementById("history");
const winStreakDisplay = document.getElementById("winStreak");
const bestStreakDisplay = document.getElementById("bestStreak");

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

let winStreak = 0;

let bestStreak =
    Number(localStorage.getItem("bestStreak")) || 0;

bestStreakDisplay.textContent = bestStreak;

let playerScore = Number(localStorage.getItem("rpsPlayerScore")) || 0;
let computerScore = Number(localStorage.getItem("rpsComputerScore")) || 0;

playerScoreDisplay.textContent = playerScore;
computerScoreDisplay.textContent = computerScore;

const rockBtn = document.getElementById("rock");
const paperBtn = document.getElementById("paper");
const scissorsBtn = document.getElementById("scissors");

rockBtn.onclick = () => play("Rock");
paperBtn.onclick = () => play("Paper");
scissorsBtn.onclick = () => play("Scissors");
document.getElementById("resetScore").onclick = resetScores;

function play(player){

    const computer =
        choices[Math.floor(Math.random()*3)];

    computerChoice.textContent =
        "Computer chose: " + computer;

    if(player === computer){

        result.textContent = "🤝 Draw!";

    }

    else if(

        (player==="Rock" && computer==="Scissors") ||

        (player==="Paper" && computer==="Rock") ||

        (player==="Scissors" && computer==="Paper")

    ){

        result.textContent = "🎉 You Win!";

        playerScore++;

        winStreak++;

winStreakDisplay.textContent = winStreak;

if(winStreak > bestStreak){

    bestStreak = winStreak;

    bestStreakDisplay.textContent = bestStreak;

    localStorage.setItem("bestStreak", bestStreak);

}

let totalWins = Number(localStorage.getItem("totalWins")) || 0;

totalWins++;

localStorage.setItem("totalWins", totalWins);

    }

    else{

        result.textContent = "😢 Computer Wins!";

        computerScore++;

        winStreak = 0;

winStreakDisplay.textContent = winStreak;

    }

    playerScoreDisplay.textContent = playerScore;

    computerScoreDisplay.textContent = computerScore;

    localStorage.setItem("rpsPlayerScore", playerScore);
localStorage.setItem("rpsComputerScore", computerScore);

if (playerScore === 5) {

    result.textContent = "🏆 You won the match!";

    disableButtons();

}

else if (computerScore === 5) {

    result.textContent = "💻 Computer won the match!";

    disableButtons();

    const item = document.createElement("li");

item.textContent =
    "You: " + player +
    " | Computer: " + computer +
    " → " + result.textContent;

history.prepend(item);

}

let totalGames = Number(localStorage.getItem("totalGames")) || 0;

totalGames++;

localStorage.setItem("totalGames", totalGames);

}

function resetScores() {

    playerScore = 0;
    computerScore = 0;

    playerScoreDisplay.textContent = playerScore;
    computerScoreDisplay.textContent = computerScore;

    localStorage.removeItem("rpsPlayerScore");
    localStorage.removeItem("rpsComputerScore");

    result.textContent = "Scores have been reset!";
    computerChoice.textContent = "";

}

function disableButtons() {

    rockBtn.disabled = true;
    paperBtn.disabled = true;
    scissorsBtn.disabled = true;

}

document.getElementById("newMatch").onclick = newMatch;

function newMatch() {

    playerScore = 0;
    computerScore = 0;

    playerScoreDisplay.textContent = 0;
    computerScoreDisplay.textContent = 0;

    result.textContent = "Choose your move!";
    computerChoice.textContent = "";

    rockBtn.disabled = false;
    paperBtn.disabled = false;
    scissorsBtn.disabled = false;

    localStorage.setItem("rpsPlayerScore", 0);
    localStorage.setItem("rpsComputerScore", 0);

    history.innerHTML = "";

    winStreak = 0;

winStreakDisplay.textContent = 0;

}