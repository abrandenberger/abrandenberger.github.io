const photos = Array.from(document.querySelectorAll("img"));

let currentIndex = -1;
let overlay = null;
let expanded = null;

function showLightbox(index) {
  if (overlay) overlay.remove(); // Clean up if already open

  currentIndex = index;
  overlay = document.createElement("div");
  overlay.className = "photo-overlay";

  expanded = document.createElement("img");
  expanded.src = photos[index].src;
  expanded.className = "photo-expanded";
  overlay.appendChild(expanded);

  overlay.addEventListener("click", closeLightbox);
  document.body.appendChild(overlay);

  document.addEventListener("keydown", handleKeydown);
}

function closeLightbox() {
  if (overlay) overlay.remove();
  overlay = null;
  currentIndex = -1;
  document.removeEventListener("keydown", handleKeydown);
}

function handleKeydown(e) {
  if (e.key === "Escape") {
    closeLightbox();
  } else if (e.key === "ArrowRight") {
    currentIndex = (currentIndex + 1) % photos.length;
    expanded.src = photos[currentIndex].src;
  } else if (e.key === "ArrowLeft") {
    currentIndex = (currentIndex - 1 + photos.length) % photos.length;
    expanded.src = photos[currentIndex].src;
  }
}

photos.forEach((photo, index) => {
  photo.addEventListener("click", () => {
    showLightbox(index);
  });
});
