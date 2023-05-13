
const gamePlayArea = document.getElementById("gamePlayArea");

let musicTrack = {};
let blasterShots = 6;
let totalTargets = 0;
let remainingTargets = 0; 

// ###### LOAD MUSIC ASSETS ######

musicTrack = new Audio('assets/music/music-for-arcade-style-game-146875.mp3');
musicTrack.play();
musicTrack.loop = true;
musicTrack.volume = 0.0;
// gamePlayArea.appendChild(musicTrack);


// ###### HELPER FUNCTIONS ######

//simple function to return a random number within a range
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}


// ###### ADD BACKGROUND ######

function addBackground(backgroundNo){
    const bg = document.createElement('img');
    bg.src = `./assets/backgrounds/${backgroundNo}.webp`;
    bg.style.position = "absolute";
    bg.style.top = 0;
    bg.style.left = 0;
    bg.style.width = "100vw";
    gamePlayArea.appendChild(bg);

}

// ###### ADD LISTENERS ######

gamePlayArea.addEventListener("click", pullTrigger)

// ###### ADD INTERFACE ######

// add music icon

let musicIcon = document.createElement('img');
musicIcon.src = "assets/sprites/musicon.webp";
musicIcon.style.position = "absolute";
musicIcon.setAttribute("id", "musicIcon");
musicIcon.setAttribute("draggable", false);
musicIcon.style.top = "2vh";
musicIcon.style.left = "80vw";
musicIcon.style.width = "5vw";
musicIcon.style.height = "auto";
musicIcon.style.zIndex = "1000";
musicIcon.classList = "fadeIn";

gamePlayArea.appendChild(musicIcon);

// add score display

function initScoreDisplay(){
    let scoreDisplay = document.createElement('div');
    scoreDisplay.setAttribute("id", "scoreDisplay");
    scoreDisplay.setAttribute("draggable", false);
    scoreDisplay.classList.add("interface");
    
    gamePlayArea.appendChild(scoreDisplay);
}

function updateScoreDisplay(){
    let scoreDisplay = document.getElementById("scoreDisplay");

    scoreDisplay.innerHTML = `<P>targets hit ${totalTargets - remainingTargets} / ${totalTargets} </P>`;

}







// ###### FIRE BLASTER #####

function pullTrigger(){

    // shots left?

    // if no shots left play click

    //else

    new Audio("assets/sounds/Single_blaster_shot.mp3").play();
}

//narrator

addProp(5, 5, "droid_face", 10, false);

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


/**
   * Creates and places prop asset in play area
   * @param  {int} relX Percentage of screen width from right to position prop
   * @param  {int} relY Percentage of screen height from top to position prop
   * @param  {String} type Name of prop to create
   * @param  {String} scale  Percentage width scale of prop
   * @param  {Boolean} Set to true if prop destructable.
   */
function addProp(relX, relY, type, scale, destructable){

    let imgPath = "";

    switch(type) {
        case "box":
            imgPath = "./assets/sprites/rebel_supply_crate.webp";
            break;
        case "droid_face":
            imgPath = "./assets/sprites/Droidface.webp";
            break;
        case "barrel":
            imgPath = "./assets/sprites/barrel.webp";
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
        case "barrier":
            imgPath = "./assets/sprites/barrier.webp";
        break;
        case "barrier2":
            imgPath = "./assets/sprites/barrier2.webp";
        break;
        default:
            imgPath = "./assets/sprites/rebel_supply_crate.webp";
        }

    let asset = document.createElement('img');
    asset.src = imgPath;
    asset.style.position = "absolute";
    asset.setAttribute("draggable", false);
    asset.style.top = relY + "vh";
    asset.style.left = relX + "vw";
    asset.style.width = scale + "vw";
    asset.style.height = "auto";
    asset.style.zIndex = relY;
    asset.classList = "fadeIn";
    if(destructable){
        asset.addEventListener("click", destroyTarget);
    }
    
    gamePlayArea.appendChild(asset);


}

// ADD TARGTES

function addTarget(relX, relY, type, scale, destructable, motionType, zIndex, aniDuration){

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
        case "droid3":
            imgPath = "./assets/sprites/droid_biggun.webp";
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

    let enemyTarget = document.createElement('img');
    enemyTarget.src = imgPath;
    enemyTarget.style.position = "absolute";
    enemyTarget.setAttribute("draggable", false);
    enemyTarget.style.top = relY + "vh";
    enemyTarget.style.left = relX + "vw";
    enemyTarget.style.width = scale + "vw";
    enemyTarget.style.height = "auto";
    if(zIndex && zIndex != 0){
        enemyTarget.style.zIndex = zIndex;
    }
    else{
        enemyTarget.style.zIndex = relY;
    }
    enemyTarget.classList = "fadeIn target";
    enemyTarget.classList.add(`${type}`);
    
    if(destructable){
        enemyTarget.addEventListener("click", destroyTarget);
    }

    setTimeout(() => {
        enemyTarget.classList.add(`${motionType}`);
        if(aniDuration){
            enemyTarget.style.animationDuration = aniDuration + "ms";
        }
    }, 1000);
    
    gamePlayArea.appendChild(enemyTarget);
    totalTargets++;
    remainingTargets++; 


}

// DESTROY TARGET

function destroyTarget(e){

    let hitTarget = e.target;
    // need hit sound
    new Audio("assets/sounds/Single_blaster_shot.mp3").play();
    hitTarget.removeEventListener("click", destroyTarget);

    if(hitTarget.classList.contains("trooper")){
        new Audio("assets/sounds/trooperHit.mp3").play();
    }

    hitTarget.style.animationDelay = "0ms";
    hitTarget.classList.remove("fadeIn");
    if(hitTarget.classList.contains("target")){
        hitTarget.classList.add("destroyTarget2");
    }
    else{
        hitTarget.classList.add("destroyTarget");
    }
    
    remainingTargets--;
    updateScoreDisplay(); 
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
        asset.classList = "fadeIn goodEwok";
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
        asset.classList = "fadeIn";
        asset.addEventListener("click", destroyTarget);
        gamePlayArea.appendChild(asset);
    }

    
}

// GAME START

addBackground("bg2");
addTimer(45);
initScoreDisplay();

// scatterAssets(65);
// scatterBoxes(15);

// front area
addProp(20, 75, "box", 7 , true);
addTarget(25, 70, "trooper", 7, true, "evading", 0, 1650);
addProp(30, 75, "box", 7, true);
addProp(40, 75, "box", 7, true);
addTarget(60, 70, "droid2", 8, true, "jumping", 0, 1300);
addTarget(50, 70, "vader", 20, true, "evading", 90, 2345);
addTarget(25, 80, "ewok", 8, true, "jumping", 90);
addProp(65, 79, "barrier", 15, true);
addProp(10, 79, "barrier2", 15, true);
//mid area

addProp(40, 70, "box", 5, true);
addTarget(43, 62, "ewok", 6, true, "dancing", 80);
addProp(43, 72, "box", 6, true);
addProp(46, 70, "box", 5, true);
addProp(23, 60, "drum", 6, true);
addProp(29, 60, "drum", 6, true);
addProp(25, 62, "drum", 6, true);
addTarget(30, 55, "droid3", 8, true, "dodging",0 , 4000);
addTarget(60, 62, "ewok", 6, true, "vibrating",);

//back area 
addProp(45, 60, "box", 5, false);
addProp(50, 60, "box", 5, false);
addTarget(48, 54, "trooper", 5, true, "dodging", 0, 2600);
addProp(55, 60, "box", 5, true);
addTarget(72, 62, "droid2", 6, true, "vibrating");
addTarget(60, 50, "trooper", 4, true, "dancing",0,300);
addTarget(64, 50, "trooper", 4, true, "dancing",);

updateScoreDisplay(); 