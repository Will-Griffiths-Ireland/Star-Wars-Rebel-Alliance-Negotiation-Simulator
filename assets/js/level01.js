
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
function addTimer(maxSeconds) {
    const timerDiv = document.createElement('div');
    timerDiv.setAttribute('id', 'timer');

    const countdown = document.createElement('p');
    countdown.innerHTML = `<span id="countdown">${maxSeconds}</span> SEC`;
    timerDiv.appendChild(countdown);

    gamePlayArea.appendChild(timerDiv);

    setCountdown(maxSeconds)
}

function setCountdown(maxSeconds) {
    timeLeft = maxSeconds
    var countdownTimer = setInterval(function(){
        timeLeft--
        displayTime = document.getElementById('countdown')
        displayTime.innerText = timeLeft;
    if (timeLeft === 0) {
        // Timeout logic goes here
        clearInterval(countdownTimer);
    }
    }, 1000);
}

//ADD SCENE PROPS



function addProp(relX, relY, type, scale, destructable){

    let imgPath = "";

    switch(type) {
        case "box":
            imgPath = "./assets/sprites/rebel_supply_crate.webp";
            break;
        case "drum":
            imgPath = "./assets/sprites/drum.webp";
            break;
        case "junk":
            imgPath = "./assets/sprites/junkpile.webp";
        break;
        case "lamp":
            imgPath = "./assets/sprites/lamp1.webp";
        break;
        case "lamp2":
            imgPath = "./assets/sprites/lamp2.webp";
        break;
        default:
            imgPath = "./assets/sprites/rebel_supply_crate.webp";
        }

    const asset = document.createElement('img');
    asset.src = imgPath;
    asset.style.position = "absolute";
    asset.style.top = relY + "vh";
    asset.style.left = relX + "vw";
    asset.style.width = scale + "vw";
    asset.style.height = "auto";
    asset.style.zIndex = relY;
    asset.classList = "dropIn";
    if(destructable){
        asset.addEventListener("click", destroyTarget);
    }
    
    gamePlayArea.appendChild(asset);


}

// ADD TARGTES

function addTarget(relX, relY, type, scale, destructable, motionType, zIndex){

    let imgPath = "";

    switch(type) {
        case "droid1":
            imgPath = "./assets/sprites/bad_droid";
            break;
        case "trooper":
            imgPath = "./assets/sprites/StormTrooper.webp";
            break;
        case "droid2":
            imgPath = "./assets/sprites/battledroid.webp";
        break;
        case "vader":
            imgPath = "./assets/sprites/vader.webp";
        break;
        case "ewok":
            imgPath = "./assets/sprites/pissed_ewok.webp";
        break;
        default:
            imgPath = "./assets/sprites/StormTrooper.webp";
        }

    const asset = document.createElement('img');
    asset.src = imgPath;
    asset.style.position = "absolute";
    asset.style.top = relY + "vh";
    asset.style.left = relX + "vw";
    asset.style.width = scale + "vw";
    asset.style.height = "auto";
    if(zIndex){
        asset.style.zIndex = zIndex;
    }
    else{
        asset.style.zIndex = relY;
    }
    
    asset.classList = "dropIn target";
    
    if(destructable){
        asset.addEventListener("click", destroyTarget);
    }

    setTimeout(() => {
        asset.classList.add(`${motionType}`)
    }, 1000);
    
    gamePlayArea.appendChild(asset);


}

// DESTROY TARGET

function destroyTarget(e){

    target = e.target;
    new Audio("assets/sounds/Single_blaster_shot.mp3").play();
    target.removeEventListener("click", destroyTarget);
    target.style.animationDelay = "0ms";
    target.classList.remove("dropIn");
    if(target.classList.contains("target")){
        target.classList.add("destroyTarget2");
    }
    else{
        target.classList.add("destroyTarget");
    }
    
    


}



// SCATTER ASSETS RANDOMLY (TESTING)

function scatterAssets(count) {
    let randWidth;
    let top;
    let left;
    for (let i = 0; i < count; i++) {
        //choosing random widths based on screen res
        if (window.innerWidth > 900) {
            randWidth = randomNumber(6, 8);
        } else {
            randWidth = randomNumber(5, 7);
        }
        left = randomNumber(20, (80 - randWidth)) + "vw";
        top = randomNumber(50, (90 - randWidth)) + "vh";
        let delay = randomNumber(0, 2000); //generate a delay for the animation
        const asset = document.createElement('img');
        asset.src = "./assets/sprites/vader.webp";
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

        setTimeout(() => {
            asset.classList.add("dancing");
            asset.classList.add("dodge");
        }, 1000);
    }

    
}

function scatterBoxes(count) {
    let randWidth;
    let top;
    let left;
    for (let i = 0; i < count; i++) {
        //choosing random widths based on screen res
        if (window.innerWidth > 900) {
            randWidth = randomNumber(5, 8);
        } else {
            randWidth = randomNumber(3, 6);
        }
        left = randomNumber(10, (90 - randWidth)) + "vw";
        top = randomNumber(60, (90 - randWidth)) + "vh";
        let delay = randomNumber(0, 2000); //generate a delay for the animation
        const asset = document.createElement('img');
        asset.src = "./assets/sprites/rebel_supply_crate.webp";
        asset.style.position = "absolute";
        asset.style.animationDelay = delay + "ms";
        asset.style.top = top;
        asset.style.left = left;
        asset.style.width = randWidth + "vw";
        asset.style.height = "auto";
        asset.style.zIndex = 3000;
        asset.classList = "dropIn";
        asset.addEventListener("click", destroyTarget);
        gamePlayArea.appendChild(asset);
    }

    
}

// GAME START

// Description:
/* To destroy the target you must aim and shoot. */

addBackground();
addTimer(45);
// scatterAssets(65);
// scatterBoxes(15);
addTarget(40 ,50, "trooper", 15, true, "dancing", 1);