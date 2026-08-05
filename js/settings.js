const soundToggle = document.getElementById("soundToggle");
const musicToggle = document.getElementById("musicToggle");
const resetDataBtn = document.getElementById("resetDataBtn");const soundEnabled =
    localStorage.getItem("soundEnabled");


const musicEnabled =
    localStorage.getItem("musicEnabled");

if(soundEnabled === null || soundEnabled === "true"){
    soundToggle.checked = true;
}

if(musicEnabled === "true"){
    musicToggle.checked = true;
}

soundToggle.addEventListener("change", function(){

    localStorage.setItem(
        "soundEnabled",
        soundToggle.checked
    );

});

musicToggle.addEventListener("change", function(){

    localStorage.setItem(
        "musicEnabled",
        musicToggle.checked
    );

});

resetDataBtn.addEventListener("click", function(){

    const confirmReset = confirm(
        "Are you sure you want to reset all saved data?"
    );

    if(!confirmReset){
        return;
    }

    localStorage.clear();

    alert("All saved data has been reset.");

    soundToggle.checked = true;
    musicToggle.checked = false;

});