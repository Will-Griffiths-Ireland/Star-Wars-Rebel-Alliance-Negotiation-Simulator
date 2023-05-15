
const gamePlayArea = document.getElementById("gamePlayArea");

let musicTrack = {};
let musicOn = false;
let soundOn = true;
let maxShots = 6;
let shotsRemaining = 6;
let totalTargets = 0;
let remainingTargets = 0; 
let reloading = false;
let gameOver = false;
let soundLevel = .5;
let musicLevel = .1;
let currentTime = 0;

// NARRATOR LINES

textPlayerWins = ["well that concludes todays session, well done","you are one of the best the alliance has","wow that might be one for the leaderbaord","if only all the other pilots were as good as you"]
textGameStarts = ["welcome to the training simulator pilot, give this your best shot","I think you are going to hit a new record today pilot","wow pilot your back for more practice, i was about to recharge","now remember pilot the boxes are not your target!","oh no its you, my poor poor boxes"]
textTargetHit = ["it seems your poor human eyesight isn't so bad", "easy shot, anyone could make that","these digital imperials almost smell like the real thing", "i'm thinking of renaming that target bobo","you will wear out the blaster at this rate","you must have had you bathna flakes for breakfast today!","thats right, if it moves,blast it","yes, yes, don't hold back", "feel at one with your blaster", "your style is growing on me","if only your mother could see you now","and they say rebels have shakey hands","you are approaching droid levels of accuracy", "blast away pilot, blast away", "i'll need to program better targets", "i'm starting to like you organics"]
textReload = ["don't forget to reinduce your blaster crystal","yes unlike the real thing its 6 blasts and then a recharge", "recharge your blaster pilot!","you could just throw your blaster at them!!"]
textTimeout = ["this level of performance will have you cleaning for the Hut clan in no time","if you get any worse you will be on the dark side","i would say to use the force but i think you are beyond help","oh no another terrible performance"]

function pickRandomLine(dilogueOption) {
    min = 0;
    max = dilogueOption.length;
    randomLineNum = Math.floor(Math.random() * (max - min) + min);

    return dilogueOption[randomLineNum];
}

// ###### AUDIO FUNCTIONS ######

function initMusic(){

    if(!musicOn){
        musicTrack = new Audio('assets/music/psykick-112469.mp3');
        musicTrack.volume = musicLevel;
        musicTrack.play();
        musicTrack.loop = true;
        musicOn = true;
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

function initAudioControls(){
    
    let audioControlsDisplay = document.createElement('div');
    audioControlsDisplay.setAttribute("id", "audioControlsDisplay");
    audioControlsDisplay.setAttribute("draggable", false);
    audioControlsDisplay.classList.add("interface");
    audioControlsDisplay.classList.add("nofire");
    audioControlsDisplay.classList.add("fadeIn");
    
    gamePlayArea.appendChild(audioControlsDisplay);


    let musicIcon = document.createElement('img');
    musicIcon.src = "assets/sprites/musicon.webp";
    musicIcon.classList.add("nofire");
    musicIcon.style.position = "inline";
    musicIcon.setAttribute("id", "musicIcon");
    musicIcon.setAttribute("draggable", false);
    musicIcon.style.width = "3.5vw";
    musicIcon.style.height = "auto";
    musicIcon.style.zIndex = "1000";
    musicIcon.addEventListener("click", updateAudioControls)

    let soundIcon = document.createElement('img');
    soundIcon.src = "assets/sprites/soundon.webp";
    soundIcon.style.position = "inline";
    soundIcon.classList.add("nofire");
    soundIcon.setAttribute("id", "soundIcon");
    soundIcon.setAttribute("draggable", false);
    soundIcon.style.width = "3.5vw";
    soundIcon.style.height = "auto";
    soundIcon.style.zIndex = "1000";
    soundIcon.addEventListener("click", updateAudioControls)

    document.getElementById("audioControlsDisplay").appendChild(musicIcon);
    document.getElementById("audioControlsDisplay").appendChild(soundIcon);

}

function updateAudioControls(e){

    let musicIcon = document.getElementById("musicIcon");
    let soundIcon = document.getElementById("soundIcon");

    if(e.target.id == "musicIcon"){
        console.log("Music icon detected");
        if(musicOn){
            e.target.src = "assets/sprites/musicoff.webp";
            musicLevel = 0;
            initMusic();
            musicOn = false;
        }
        else{
            e.target.src = "assets/sprites/musicon.webp";
            
            musicLevel = .2;
            initMusic();
            musicOn = true;
        }
    }

    if(e.target.id == "soundIcon"){
        if(soundOn){
            e.target.src = "assets/sprites/soundoff.webp";
            soundLevel = 0;
            soundOn = false;
        }
        else{
            e.target.src = "assets/sprites/soundon.webp";
            soundLevel = 1;
            soundOn = true;
        }
    }
}



// add score display

function initScoreDisplay(){
    let scoreDisplay = document.createElement('div');
    scoreDisplay.setAttribute("id", "scoreDisplay");
    scoreDisplay.setAttribute("draggable", false);
    scoreDisplay.classList.add("interface");
    scoreDisplay.classList.add("nofire");
    scoreDisplay.classList.add("fadeIn");
    
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

    let menuLink = document.createElement('p');
    menuLink.setAttribute("id", "menuLink");
    menuLink.style.zIndex = "5000";
    menuLink.classList.add("nofire");
    menuLink.style.fontSize = "2vw";
    menuLink.innerHTML = `
    <a id="backMenu" href="./menu.html" target="_self"> return to menu</a>
    `;

    let gameScore;
    if(currentTime <= 0){
        gameScore = (totalTargets - remainingTargets) * 10;
    }
    else{
        gameScore = ((currentTime) * ((totalTargets - remainingTargets) * 10));
    } 
    
    gameOverMessage.innerHTML = `Your score is ${gameScore}`;

    document.getElementById("gameOverDisplay").appendChild(gameOverMessage);
    document.getElementById("gameOverDisplay").appendChild(menuLink);

}

function updateScoreDisplay(){
    let scoreNumber = document.getElementById("scoreNumber");

    scoreNumber.innerHTML = `targets hit ${totalTargets - remainingTargets} / ${totalTargets}`;
    if(remainingTargets == 0){
        document.getElementById("scoreDisplay").classList.add("pulsing");
        document.getElementById("narratorMessage").innerHTML = pickRandomLine(textPlayerWins);
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
        document.getElementById("narratorMessage").innerHTML = pickRandomLine(textReload);
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

function initNarrator(){

    let narratorDisplay = document.createElement('div');
    narratorDisplay.setAttribute("id", "narratorDisplay");
    narratorDisplay.setAttribute("draggable", false);
    narratorDisplay.classList.add("interface");
    narratorDisplay.classList.add("nofire");
    narratorDisplay.classList.add("fadeIn");
    
    
    gamePlayArea.appendChild(narratorDisplay);

    let narratorImage = document.createElement('img');
    narratorImage.src = "./assets/sprites/Droidface.webp";
    narratorImage.style.position = "inline";
    narratorImage.classList.add("nofire");
    narratorImage.setAttribute("draggable", false);
    narratorImage.style.width = "auto";
    narratorImage.style.height = "12vh";
    narratorImage.style.zIndex = "1000";

    document.getElementById("narratorDisplay").appendChild(narratorImage);

    let narratorMessage = document.createElement('p');
    narratorMessage.setAttribute("id", "narratorMessage");
    narratorMessage.style.zIndex = "5000";
    narratorMessage.classList.add("nofire");
    narratorMessage.classList.add("fadeIn");
    narratorMessage.style.fontSize = "1vw";

    narratorMessage.innerHTML = pickRandomLine(textGameStarts);

    document.getElementById("narratorDisplay").appendChild(narratorMessage);
}

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
        case "chair":
            imgPath = "./assets/sprites/chair.webp";
        break;
        case "chest":
            imgPath = "./assets/sprites/chest.webp";
        break;
        case "fancy_chair":
            imgPath = "./assets/sprites/fancy_chair.webp";
        break;
        case "desk":
            imgPath = "./assets/sprites/desk.webp";
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
        case "nice_ewok":
            imgPath = "./assets/sprites/good_ewok.webp";
        break;
        case "jedi":
            imgPath = "./assets/sprites/jedi1.webp";
            case "tie":
                imgPath = "./assets/sprites/tie.png";
            break;
            case "tie_flip":
                imgPath = "./assets/sprites/tie_flip.png";
            break;
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
        document.getElementById("narratorMessage").innerHTML = pickRandomLine(textTargetHit);
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

addBackground("google");
initAudioControls()
initNarrator();
addTimer(60);
initScoreDisplay();
initBlasterDisplay();
updateBlasterDisplay();
initMusic();

//front area
addProp(20, 75, "desk", 12 , true);
addProp(22, 78, "chair", 8 , true);
addProp(32, 75, "desk", 12 , true);
addProp(60, 70, "desk", 10 , true);
addTarget(32, 73, "droid1", 6, true, "dodging");
addTarget(22, 74, "droid2", 9, true, "jumping",0,2345);
addProp(52, 78, "chair", 8 , true);
addTarget(52, 76.2, "ewok", 6, true, "jumping",80,2345);
addProp(67, 78, "chair", 8 , true);
addTarget(67, 76, "trooper", 6, true, "vibrating",0,500);
addTarget(55, 56, "droid3", 6, true, "evading",0,1900);

addProp(34, 60, "desk", 9 , true);
addTarget(35, 56, "trooper", 6, true, "evading",0,3478);
addProp(42, 63, "desk", 9 , true);
addProp(70, 65, "desk", 9 , true);


updateScoreDisplay(); 