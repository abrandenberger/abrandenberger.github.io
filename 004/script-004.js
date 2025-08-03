let player;
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
    events: {
      onReady: updatePlayPauseIcon,
      onStateChange: updatePlayPauseIcon, // update the play/pause icon whenever the player state changes
    },
  });
}

function seekToTime(seconds) {
  // only gets called inside checkSeek
  player.seekTo(seconds, true);
  if (player.getPlayerState() !== YT.PlayerState.PLAYING) {
    player.playVideo();
  }
}

function changeVideo(videoId, startTime) {
  if (player && typeof player.loadVideoById === "function") {
    console.log(`changing video to ${videoId} at ${startTime} seconds`);
    player.loadVideoById(videoId, startTime || 0, "default");
  }
}

function checkSeek(element, videoId, startTime, stopTime = null) {
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
  if (element) {
    const songElements = document.querySelectorAll(".lined-list");
    songElements.forEach((songElement) => {
      const liChildren = songElement.querySelectorAll("li");
      liChildren.forEach((li) => {
        li.classList.remove("playing");
      });
    });
    // add playing class to the clicked element
    element.classList.add("playing");
  }
  if (stopTime !== null) {
    const duration = (stopTime - startTime) * 1000;
    stopTimeout = setTimeout(() => {
      player.pauseVideo();
    }, duration);
  }
}

function playPauseVideo() {
  if (stopTimeout) {
    // clear any existing timeout
    console.log("clearing previous timeout");
    clearTimeout(stopTimeout);
  }
  console.log("toggling play/pause state");
  if (player.getPlayerState() === YT.PlayerState.PLAYING) {
    player.pauseVideo();
  } else {
    player.playVideo();
  }
}

function updatePlayPauseIcon(event) {
  console.log("updating play/pause icon based on player state", event.data);
  const videoControls = document.getElementById("video-controls");
  const playIcon = document.querySelector("#video-controls .video-icon.play");
  const pauseIcon = document.querySelector("#video-controls .video-icon.pause");
  const loadingIcon = document.querySelector(
    "#video-controls .video-icon.loading"
  );
  const playingBars = document.getElementById("playing-icon");
  if (
    !player ||
    typeof player.getPlayerState !== "function" ||
    !playIcon ||
    !pauseIcon ||
    !videoControls ||
    !playingBars
  ) {
    return; // exit if not ready
  }
  // -1 = unstarted, 0 = ended, 1 = playing, 2 = paused, 3 = buffering, 5 = video cued
  if (event.data === 1) {
    // if the video is playing, show the pause icon and hide the play icon
    videoControls.classList.add("on");
    playIcon.classList.add("off");
    loadingIcon.classList.add("off");
    pauseIcon.classList.remove("off");
    playingBars.classList.remove("off");
  } else if (event.data === 3 || event.data === -1) {
    // if the video is buffering, show the loading icon
    videoControls.classList.add("on");
    loadingIcon.classList.remove("off");
    playIcon.classList.add("off");
    pauseIcon.classList.add("off");
    playingBars.classList.remove("off");
  } else {
    // if the video is paused, ended, or in any other state, show the play icon
    videoControls.classList.remove("on");
    playIcon.classList.remove("off");
    pauseIcon.classList.add("off");
    loadingIcon.classList.add("off");
    playingBars.classList.add("off");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // on space click, toggle play/pause
  const videoWrapper = document.querySelector(".video-wrapper");
  const afterContent = getComputedStyle(videoWrapper, "::after").content;

  document.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
      if (player && typeof player.playVideo === "function") {
        event.preventDefault(); // prevent scrolling
        playPauseVideo();
      } else {
        console.warn("YouTube player is not ready yet.");
      }
    }
  });
});
