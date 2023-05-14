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
