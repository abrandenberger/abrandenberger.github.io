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
  const lightIcon = document.getElementById("lightIcon");
  setTheme(currentTheme);

  lightToggle.addEventListener("click", () => {
    const newTheme =
      rootElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    setTheme(newTheme);
  });
  function setTheme(theme) {
    rootElement.setAttribute("data-theme", theme);
    lightIcon.classList.toggle("la-moon");
    lightIcon.classList.toggle("la-sun");
    // save theme to local storage
    localStorage.setItem("theme", theme);
  }
});
