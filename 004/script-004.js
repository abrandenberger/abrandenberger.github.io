let player;
let currentActionId = 0;
let stopTimeout = null;

// Called by the API after it's downloaded
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    videoId: "UFl9xuYP5T8", // brahms violin concerto
    playerVars: {
      autoplay: 0, // 0 = manual start
      controls: 1, // Show player controls
      start: 1450, // Start at 24 minutes and 10 seconds
      rel: 0, // Disable related videos at the end
      modestbranding: 1, // Minimal YouTube branding
      enablejsapi: 1, // Enable JavaScript API
    },
    events: {},
  });
}

function seekToTime(seconds) {
  if (player && typeof player.seekTo === "function") {
    player.seekTo(seconds, true);
    if (player.getPlayerState() !== YT.PlayerState.PLAYING) {
      player.playVideo();
    }
  }
}

function changeVideo(videoId, startTime) {
  if (player && typeof player.loadVideoById === "function") {
    player.loadVideoById(videoId, startTime || 0, "default");
  }
}

function checkSeek(videoId, startTime, stopTime = null) {
  // if no player, return
  console.log(`startTime: ${startTime}, stopTime: ${stopTime}`);
  if (stopTimeout) {
    console.log("Clearing previous timeout");
    clearTimeout(stopTimeout);
  }
  if (!player || typeof player.loadVideoById !== "function") {
    console.error("YouTube player is not initialized.");
    return;
  }
  if (player.getVideoData().video_id === videoId) {
    // if the same video, just seek to the new time
    seekToTime(startTime);
  } else {
    // if a different video, change the video and then seek
    changeVideo(videoId, startTime);
  }
  if (stopTime !== null) {
    const duration = (stopTime - startTime) * 1000;
    stopTimeout = setTimeout(() => {
      player.pauseVideo();
    }, duration);
  }
}

// on space click, toggle play/pause
document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    event.preventDefault(); // prevent scrolling
    if (stopTimeout) {
      // clear any existing timeout
      console.log("Clearing previous timeout");
      clearTimeout(stopTimeout);
    }
    if (player && typeof player.playVideo === "function") {
      if (player.getPlayerState() === YT.PlayerState.PLAYING) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
    }
  }
});
