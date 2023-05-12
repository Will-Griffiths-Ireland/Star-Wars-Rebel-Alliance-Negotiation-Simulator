

const gamePlayArea = document.getElementById("gamePlayArea");

// ###### HELPER FUNCTIONS ######

//simple function to return a random number within a range
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}


// ###### ADD BACKGROUND ######

function addBackground(){
    const bg = document.createElement('img');
    bg.src = "./assets/backgrounds/bg1.webp";
    bg.style.position = "absolute";
    bg.style.top = 0;
    bg.style.left = 0;
    bg.style.width = "100vw";
    gamePlayArea.appendChild(bg);

}

// ADD INTERFACE

//narrator

//blaster info

//timer info

//ADD SCENE PROPS

// ADD TARGTES

// DESTROY TARGET

function destroyTarget(e){

    target = e.target;
    target.removeEventListener("click", destroyTarget);
    target.style.animationDelay = "0ms";
    target.classList.remove("dropIn");
    target.classList.add("destroyTarget");


}



// SCATTER ASSETS RANDOMLY (TESTING)

function scatterAssets(count) {
    let randWidth;
    let top;
    let left;
    for (let i = 0; i < count; i++) {
        //choosing random widths based on screen res
        if (window.innerWidth > 900) {
            randWidth = randomNumber(2, 10);
        } else {
            randWidth = randomNumber(5, 15);
        }
        left = randomNumber(0, (100 - randWidth)) + "vw";
        top = randomNumber(10, (90 - randWidth)) + "vh";
        let delay = randomNumber(0, 2000); //generate a delay for the animation
        const asset = document.createElement('img');
        asset.src = "./assets/sprites/pissed_ewok.webp";
        asset.style.position = "absolute";
        asset.style.animationDelay = delay + "ms";
        asset.style.top = top;
        asset.style.left = left;
        asset.style.width = randWidth + "vw";
        asset.style.height = "auto";
        asset.style.zIndex = 2000;
        asset.classList = "dropIn goodEwok";
        asset.addEventListener("click", destroyTarget);
        gamePlayArea.appendChild(asset);
    }
}

// GAME START

addBackground();
scatterAssets(80);