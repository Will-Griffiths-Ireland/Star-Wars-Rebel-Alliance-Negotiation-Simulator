/* Audio play/pause with image change */
var track = document.getElementById('track');
var controlBtn = document.getElementById('play-pause');
var muteIcon = document.getElementById("muteIcon");

function playPause() {
  if (track.paused) {
    track.play();
    controlBtn.className = "pause";
    muteIcon.src = "./assets/sprites/soundon.webp";
    muteIcon.alt = "unmuted";
  } else { 
    track.pause();
    controlBtn.className = "play";
    muteIcon.src = "./assets/sprites/soundoff.webp";
    muteIcon.alt = "muted";
  }
}

controlBtn.addEventListener("click", playPause);
track.addEventListener("ended", function() {
  controlBtn.className = "play";
  muteIcon.src = "./assets/sprites/soundoff.webp";
  muteIcon.alt = "muted";
});

/*Change Page after Scroll animation */
const titles = document.querySelector('#titlecontent');
const duration = 40000; // change this to the duration of your scroll animation in milliseconds

setTimeout(() => {
  window.location.href = 'menu.html';
}, duration);
