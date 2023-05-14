
const gamePlayArea = document.getElementById("gamePlayArea");

let musicTrack = {};
let maxShots = 6;
let shotsRemaining = 6;
let totalTargets = 0;
let remainingTargets = 0; 
let reloading = false;
let gameOver = false;
let soundLevel = .5;
let musicLevel = 0;
let currentTime = 0;

// ###### AUDIO FUNCTIONS ######

function initMusic(){

    if(Object.keys(musicTrack).length === 0){
        musicTrack = new Audio('assets/music/chiptune-grooving-142242.mp3');
        musicTrack.volume = musicLevel;
        musicTrack.play();
        musicTrack.loop = true;
    }
    else{
        
        musicTrack.volume = musicLevel;
    }

}

function playSound(file){
    tempSound = new Audio(`assets/sounds/${file}.mp3`);
    tempSound.volume = soundLevel;
    tempSound.play();
}

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
    bg.style.top = "0";
    bg.style.left = "0";
    bg.style.width = "100vw";
    bg.classList.add("fadeIn");
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
    scoreDisplay.classList.add("nofire");
    
    gamePlayArea.appendChild(scoreDisplay);

    let scoreNumber = document.createElement('p');
    scoreNumber.setAttribute("id", "scoreNumber");
    scoreNumber.classList.add("nofire");

    document.getElementById("scoreDisplay").appendChild(scoreNumber);
}

//gameover display

function displayGameOver(){

    gamePlayArea.removeEventListener("click", pullTrigger);

    // mask background

    let backgroundMask = document.createElement('div');
    backgroundMask.setAttribute("id", "backgroundMask");
    backgroundMask.setAttribute("draggable", false);
    backgroundMask.style.zIndex = "2500";
    gamePlayArea.appendChild(backgroundMask);

    let gameOverDisplay = document.createElement('div');
    gameOverDisplay.setAttribute("id", "gameOverDisplay");
    gameOverDisplay.setAttribute("draggable", false);
    gameOverDisplay.classList.add("interface");
    gameOverDisplay.classList.add("nofire");
    gameOverDisplay.style.zIndex = "5000";
    
    gamePlayArea.appendChild(gameOverDisplay);

    let gameOverMessage = document.createElement('p');
    gameOverMessage.setAttribute("id", "gameOverMessage");
    gameOverMessage.style.zIndex = "5000";
    gameOverMessage.classList.add("nofire");
    gameOverMessage.style.fontSize = "3vw";

    let gameScore;
    if(currentTime <= 0){
        gameScore = totalTargets - remainingTargets;
    }
    else{
        gameScore = ((currentTime) * (totalTargets - remainingTargets));
    } 
    
    gameOverMessage.innerHTML = `Your score is ${gameScore}`;

    document.getElementById("gameOverDisplay").appendChild(gameOverMessage);

}

function updateScoreDisplay(){
    let scoreNumber = document.getElementById("scoreNumber");

    scoreNumber.innerHTML = `targets hit ${totalTargets - remainingTargets} / ${totalTargets}`;
    if(remainingTargets == 0){
        document.getElementById("scoreDisplay").classList.add("pulsing");
        gameOver = true;
        displayGameOver();
    }

}

// add blaster

function initBlasterDisplay(){
    let blasterDisplay = document.createElement('div');
    blasterDisplay.setAttribute("id", "blasterDisplay");
    blasterDisplay.setAttribute("draggable", false);
    blasterDisplay.classList.add("interface");
    blasterDisplay.classList.add("nofire");
    blasterDisplay.addEventListener("click", reloadBlaster);
    
    gamePlayArea.appendChild(blasterDisplay);

    let blasterImage = document.createElement('img');
    blasterImage.src = "./assets/sprites/blaster.webp";
    blasterImage.style.position = "inline";
    blasterImage.classList.add("nofire");
    blasterImage.setAttribute("draggable", false);
    blasterImage.style.width = "auto";
    blasterImage.style.height = "3vw";
    blasterImage.style.zIndex = "1000";
    blasterImage.addEventListener("click", reloadBlaster);

    document.getElementById("blasterDisplay").appendChild(blasterImage);

    let ammoNumber = document.createElement('p');
    ammoNumber.setAttribute("id", "ammoNumber");
    ammoNumber.style.zIndex = "1000";
    ammoNumber.classList.add("nofire");
    ammoNumber.addEventListener("click", reloadBlaster);

    document.getElementById("blasterDisplay").appendChild(ammoNumber);
}

function updateBlasterDisplay(){
    let ammoNumber = document.getElementById("ammoNumber");
    ammoNumber.innerHTML = `${shotsRemaining} / ${maxShots}`;

    let blasterDisplay = document.getElementById("blasterDisplay");
    if(shotsRemaining == 0){
        blasterDisplay.style.backgroundColor = "#d10404";
        ammoNumber.style.color = "#FFFFFF";
        ammoNumber.style.fontSize = "1vw";
        ammoNumber.innerHTML = `click to reload`;
        blasterDisplay.classList.add("pulsing");

    }
    else{
        blasterDisplay.style.backgroundColor = "#b9c0bf";
        blasterDisplay.classList.remove("pulsing");
        ammoNumber.style.color = "#000000";
        ammoNumber.style.fontSize = "2vw";
    }

}

//timer info

function addTimer(maxSeconds) {
    const timerDisplay = document.createElement('div');
    timerDisplay.setAttribute('id', 'timerDisplay');
    timerDisplay.classList.add("interface");
    timerDisplay.classList.add("fadeIn");

    let timerImage = document.createElement('img');
    timerImage.setAttribute('id', 'timer');
    timerImage.src = "./assets/sprites/timer.webp";
    timerImage.style.position = "inline";
    timerImage.classList.add("nofire");
    timerImage.classList.add("timerSpin");
    timerImage.classList.add("fadeIn");
    timerImage.setAttribute("draggable", false);
    timerImage.style.width = "auto";
    timerImage.style.height = "4vw";
    timerImage.style.zIndex = "1000";

    timerDisplay.appendChild(timerImage);

    const countdown = document.createElement('p');
    countdown.setAttribute('id', 'countdown');
    countdown.innerHTML = `${maxSeconds} sec`;
    countdown.classList.add("nofire");
    countdown.style.fontSize = "1.5vw";
    timerDisplay.appendChild(countdown);

    gamePlayArea.appendChild(timerDisplay);

    setCountdown(maxSeconds)
}

function setCountdown(maxSeconds) {
    timeLeft = maxSeconds
    var countdownTimer = setInterval(function(){
        timeLeft--;
        currentTime = timeLeft;
        displayTime = document.getElementById('countdown')
        displayTime.innerHTML = `${timeLeft} sec`;
    if (timeLeft === 0 || gameOver) {
        // Timeout logic goes here
        if(!gameOver){
            gameOver = true;
            displayGameOver();
        }
        document.getElementById("timer").classList.remove("timerSpin");
        clearInterval(countdownTimer);
    }
    }, 1000);
}





// ###### FIRE BLASTER #####

function pullTrigger(e){

    // if we are reloading or over a no fire zone then do nothing
    if(e.target.classList.contains("nofire") || reloading){
        return;
    }

    if(shotsRemaining > 0){
        playSound("blaster_fire");
        shotsRemaining--;
        updateBlasterDisplay();
    }
    else
    {
        playSound("blaster_out");
        updateBlasterDisplay();
    }

    
}

function reloadBlaster(){

    //if clip is full do nothing
    if(shotsRemaining == maxShots || reloading){
        return;
    }
    else{
        playSound("blaster_reload")
        reloading = true;
        let ammoNumber = document.getElementById("ammoNumber");
        ammoNumber.innerHTML = `reloading...`;
        ammoNumber.style.fontSize = "1vw";
        setTimeout(() => {
            shotsRemaining = maxShots;
            updateBlasterDisplay();
            reloading = false;
        }, 2000);
    }
}

//narrator

addProp(5, 5, "droid_face", 10, false);

//blaster info





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
            imgPath = "./assets/sprites/bad_droid.webp";
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

    if(shotsRemaining == 0 || reloading){
        return;
    }

    let hitTarget = e.target;
    hitTarget.removeEventListener("click", destroyTarget);

    if(hitTarget.classList.contains("trooper")){
        playSound("trooper_die");
    }

    if(hitTarget.classList.contains("vader")){
        playSound("vader_die");
    }

    if(hitTarget.classList.contains("ewok")){
        playSound("ewok_die");
    }

    if(hitTarget.classList.contains("droid1")){
        playSound("droid_die");
    }

    hitTarget.style.animationDelay = "0ms";
    hitTarget.classList.remove("fadeIn");

    if(hitTarget.classList.contains("target")){
        hitTarget.classList.add("destroyTarget2");
        remainingTargets--;
    }
    else{
        hitTarget.classList.add("destroyTarget");
    }
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
addTimer(30);
initScoreDisplay();
initBlasterDisplay();
updateBlasterDisplay();
initMusic();

// scatterAssets(65);
// scatterBoxes(15);

//front area
addProp(20, 75, "box", 7 , true);
addTarget(25, 70, "trooper", 7, true, "evading", 0, 1650);
addProp(30, 75, "box", 7, true);
addProp(40, 75, "box", 7, true);
addTarget(60, 70, "droid2", 8, true, "jumping", 0, 1300);
addTarget(50, 70, "vader", 15, true, "evading", 90, 2345);
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
addTarget(72, 62, "droid1", 6, true, "vibrating");
addTarget(60, 50, "trooper", 4, true, "dancing",0,300);
addTarget(64, 50, "trooper", 4, true, "dancing",);

updateScoreDisplay(); 