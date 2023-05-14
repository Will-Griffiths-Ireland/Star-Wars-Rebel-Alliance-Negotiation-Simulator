/* Audio play/pause with image change */
var track = document.getElementById('track');
var controlBtn = document.getElementById('play-pause');
var muteIcon = document.getElementById("muteIcon");
track.volume = .2;

function playPause() {
  if (track.paused) {
    ;
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
<<<<<<< HEAD
const duration = 40000; // change this to the duration of your scroll animation in milliseconds
=======
const duration = 38000; // change this to the duration of your scroll animation in milliseconds
>>>>>>> 239487305964d11a457ec40f42b48e4ff9443ca4

setTimeout(() => {
  window.location.href = 'menu.html';
}, duration);
