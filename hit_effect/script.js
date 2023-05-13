const container = document.getElementById('container');
const sparkleNum = 50;
const radius = 2;
const height = 10;
const width = 3;
const color = ['blue']
let maxHeight = 40;
let target = true;


function degToRad(deg) {
    return deg / 180 * Math.PI;
}


function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}


function getPos(event){
  const evt = {
    x: event.type.includes('mouse') ? event.pageX : event.touches[0].clientX,
    y: event.type.includes('mouse') ? event.pageY : event.touches[0].clientY
  }
  return evt;
}


function defineElement(container, className){
    const elm = document.createElement('div');
    elm.className = className;
    container.appendChild(elm);
}


function createSingleSparkle(quantitly){
    for (let i = 0; i < quantitly; i++){
        defineElement(container, 'single-sparkle')
    }
}
createSingleSparkle(sparkleNum);


function grabSparkles(){
    const sparkleCollection = document.querySelectorAll('.single-sparkle');
    const sparkles = Array.from(sparkleCollection);
    return sparkles
}


const slice = 360 / sparkleNum;
let i = 0;
function sparklesProperties(height, width, color) {
    grabSparkles().forEach(sparkle => {  
        const deg = (360 / sparkleNum) * i;
        sparkle.style.transformOrigin = `center top`;
        sparkle.style.transform = `rotate(${deg}deg)`;
        sparkle.style.height = `${randomRange((height/3), height)}px`;
        sparkle.style.width = `${randomRange((width / 4), width)}px`;
        sparkle.style.backgroundColor = `${color[randomRange(0, color.length - 1)]}`;
        i++;
    })
}
sparklesProperties(height, width, color);


function sparkleAroundMouse(event,x, y, radius) {
     grabSparkles().forEach(sparkle => {
        const currentX = x
        const currentY = y

        const angle = slicesInRad * j;
        xWithRadius = currentX + radius * Math.cos(angle);
        yWithRadius = currentY + radius * Math.sin(angle);

        sparkle.style.left = `${xWithRadius}px`;
        sparkle.style.top = `${yWithRadius}px`;
        j++;
    })
}


let j = 0;
let xWithRadius, yWithRadius;
const slicesInRad = degToRad(slice);
function asignTargetToMouse(event){
    sparkleAroundMouse(
        event,
        getPos(event).x,
        getPos(event).y,
        radius
    );
}


function sparkleTransition() {
    grabSparkles().forEach(sparkle => {
        sparkle.style.opacity = '1';
        sparkle.style.transition = `
        height 0.1s ease-in-out,
        width 0.1s ease-in-out,
        opacity 0.1s ease-in-out`;

        sparkle.addEventListener('transitionend', () => {
            sparkle.style.opacity = '0';
            maxHeight = 40;
        })
    })

}


container.addEventListener('mousemove', (event) => {
    asignTargetToMouse(event);
})


container.addEventListener('mousedown', (event) => {
    const x =  getPos(event).x
    const y =  getPos(event).y
    maxHeight = maxHeight * (y / window.innerHeight) + 10
    sparkleAroundMouse(event, x, y, radius);
})

container.addEventListener('click', (event) => {
    if (target) {
        sparkleAroundMouse(event, 40);
        sparkleTransition();
        sparklesProperties(maxHeight, width, color);
    }
})