const searchInput = document.getElementById("gameSearch");
const gameCards = document.querySelectorAll(".game-card");

searchInput.addEventListener("input", function(){

    const searchText = searchInput.value.toLowerCase();

    gameCards.forEach(function(card){

        const gameName = card.dataset.name;

        if(gameName.includes(searchText)){
            card.style.display = "block";
        }else{
            card.style.display = "none";
        }

    });

});

const favoriteButtons =
    document.querySelectorAll(".favorite-btn");

let favorites =
    JSON.parse(localStorage.getItem("favoriteGames")) || [];

favoriteButtons.forEach(function(button){

    const gameName = button.dataset.game;

    if(favorites.includes(gameName)){
        button.textContent = "⭐ Favorited";
        button.classList.add("active");
    }

    button.addEventListener("click", function(){

        if(favorites.includes(gameName)){

            favorites = favorites.filter(function(game){
                return game !== gameName;
            });

            button.textContent = "☆ Favorite";
            button.classList.remove("active");

        }else{

            favorites.push(gameName);

            button.textContent = "⭐ Favorited";
            button.classList.add("active");

        }

        localStorage.setItem(
            "favoriteGames",
            JSON.stringify(favorites)
        );

    });

});

const allGamesBtn = document.getElementById("allGamesBtn");
const favoritesBtn = document.getElementById("favoritesBtn");

allGamesBtn.addEventListener("click", function(){

    allGamesBtn.classList.add("active");
    favoritesBtn.classList.remove("active");

    gameCards.forEach(function(card){

        const gameName = card.dataset.name;

        if(gameName.includes(searchInput.value.toLowerCase())){
            card.style.display = "block";
        }else{
            card.style.display = "none";
        }

    });

});

favoritesBtn.addEventListener("click", function(){

    favoritesBtn.classList.add("active");
    allGamesBtn.classList.remove("active");

    gameCards.forEach(function(card){

        const gameName = card.dataset.name;

        if(
            favorites.includes(gameName) &&
            gameName.includes(searchInput.value.toLowerCase())
        ){
            card.style.display = "block";
        }else{
            card.style.display = "none";
        }

    });

});

const themeToggle = document.getElementById("themeToggle");

let theme = localStorage.getItem("theme") || "dark";

if(theme === "light"){

    document.body.classList.add("light");

    themeToggle.textContent = "☀️ Light";

}

themeToggle.addEventListener("click", function(){

    document.body.classList.toggle("light");

    if(document.body.classList.contains("light")){

        localStorage.setItem("theme", "light");

        themeToggle.textContent = "☀️ Light";

    }else{

        localStorage.setItem("theme", "dark");

        themeToggle.textContent = "🌙 Dark";

    }

});