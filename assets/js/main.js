

const gamePlayArea = document.getElementById("gamePlayArea");

// ###### HELPER FUNCTIONS ######

//simple function to return a random number within a range
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}


// ###### ADD BACKGROUND ######

// ADD INTERFACE

// SCATTER ASSETS RANDOMLY

function scatterAssets(count) {
    let randWidth;
    let top;
    let left;
    for (let i = 0; i < count; i++) {
        //choosing random widths based on screen res
        if (window.innerWidth > 900) {
            randWidth = randomNumber(4, 11);
        } else {
            randWidth = randomNumber(10, 30);
        }
        const gamePlayArea = document.getElementById('gamePlayArea');
        left = randomNumber(0, (100 - randWidth)) + "vw";
        top = randomNumber(10, (90 - randWidth)) + "vh";
        let delay = randomNumber(0, 2000); //generate a delay for the animation
        const asset = document.createElement('img');
        asset.src = "./assets/sprites/good_ewok.webp";
        asset.style.position = "absolute";
        asset.style.animationDelay = delay + "ms";
        asset.style.top = top;
        asset.style.left = left;
        asset.style.width = randWidth + "vw";
        asset.style.height = "auto";
        asset.style.zIndex = 2000;
        asset.classList = "dropIn";
        gamePlayArea.appendChild(asset);
    }
}

// GAME START

scatterAssets(80);