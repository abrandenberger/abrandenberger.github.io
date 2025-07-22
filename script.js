window.addEventListener("load", function () {
  // ***** fix the link animations for chrome bug *****
  isChrome = /Chrome/.test(navigator.userAgent);
  // && !/Chromium/.test(navigator.userAgent);
  if (isChrome) {
    const links = document.querySelectorAll("a");
    links.forEach((link) => {
      link.style.setProperty("transition", "0s");
    });
  }

  // ***** toggle light/dark theme *****
  const lightToggle = document.getElementById("light-toggle");
  const rootElement = document.documentElement; // <html>
  // load theme preference from localStorage
  const currentTheme = localStorage.getItem("theme") || "light";
  const backgroundImg = document.getElementById("bgd");
  const lightIcon = document.getElementById("lightIcon");
  setTheme(currentTheme);

  lightToggle.addEventListener("click", () => {
    const newTheme =
      rootElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    setTheme(newTheme);
  });
  function setTheme(theme) {
    rootElement.setAttribute("data-theme", theme);
    if (theme === "light") {
      lightIcon.classList.add("la-moon");
      lightIcon.classList.remove("la-sun");
    } else {
      lightIcon.classList.add("la-sun");
      lightIcon.classList.remove("la-moon");
    }
    if (backgroundImg) {
      backgroundImg.src =
        theme === "dark" ? "background-dark.jpg" : "background-light.jpg";
    }
    // save theme to local storage
    localStorage.setItem("theme", theme);
  }
});
