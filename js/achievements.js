const firstWin = document.getElementById("firstWin");
const fiveWins = document.getElementById("fiveWins");
const tenGames = document.getElementById("tenGames");

// Read saved values
const totalWins = Number(localStorage.getItem("totalWins")) || 0;
const totalGames = Number(localStorage.getItem("totalGames")) || 0;

// First Win
if(totalWins >= 1){
    firstWin.classList.remove("locked");
    firstWin.classList.add("unlocked");
}

// Win 5 Games
if(totalWins >= 5){
    fiveWins.classList.remove("locked");
    fiveWins.classList.add("unlocked");
}

// Play 10 Games
if(totalGames >= 10){
    tenGames.classList.remove("locked");
    tenGames.classList.add("unlocked");
}