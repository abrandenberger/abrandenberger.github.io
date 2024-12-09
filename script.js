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
  // ***** add the tab functionality *****
  var myTabs = document.querySelectorAll("ul.nav-tabs > li");
  // hide all the tabs
  function deactivateAllTabs() {
    for (var i = 0; i < myTabs.length; i++) {
      myTabs[i].classList.remove("active");
    }
  }
  // hide all the content panes
  function hideAllPanes() {
    var myContentPanes = document.querySelectorAll(".tab-pane");
    for (var i = 0; i < myContentPanes.length; i++) {
      myContentPanes[i].classList.remove("active");
    }
  }
  function switchToTab(tab) {
    deactivateAllTabs();
    tab.classList.add("active");
  }
  function switchToPaneId(activePaneId) {
    hideAllPanes();
    var activePane = document.querySelector(activePaneId);
    activePane.classList.add("active");
    localStorage.setItem("activePaneId", activePaneId);
  }
  function switchTabAndPane(tab, paneId) {
    switchToTab(tab);
    switchToPaneId(paneId);
    // Set hash without triggering scroll
    history.replaceState(null, null, paneId);
  }
  // tab click event
  function myTabClicks(tabClickEvent) {
    var clickedTab = tabClickEvent.currentTarget;
    var activePaneId = tabClickEvent.target.getAttribute("href");
    tabClickEvent.preventDefault();
    switchTabAndPane(clickedTab, activePaneId);
  }
  // initialize to local storage
  var activePaneId = localStorage.getItem("activePaneId");
  if (activePaneId) {
    var activeTabId = activePaneId + "-tab";
    var activeTabParent = document.querySelector(activeTabId).parentElement;
    switchTabAndPane(activeTabParent, activePaneId);
    setTimeout(() => {
      document.body.scrollTo(0, 0); // avoid scrolling down behaviour
    }, 1);
  }
  // event listeners for all tabs
  for (i = 0; i < myTabs.length; i++) {
    myTabs[i].addEventListener("click", myTabClicks);
  }
  // see more link click event
  seeMoreLink = document.getElementById("see-more");
  function seeMoreClick(seeMoreClickEvent) {
    seeMoreClickEvent.preventDefault();
    var activeTabId = seeMoreLink.getAttribute("href") + "-tab";
    var activeTab = document.querySelector(activeTabId);
    activeTab.click();
  }
  seeMoreLink.addEventListener("click", seeMoreClick);

  window.addEventListener("hashchange", function (event) {
    // called when the hash changes (back button)
    event.preventDefault();
    var activeTabId = document.location.hash + "-tab";
    var activeTab = document.querySelector(activeTabId);
    activeTab.click();
  });

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
    lightIcon.classList.toggle("la-moon");
    lightIcon.classList.toggle("la-sun");
    if (backgroundImg) {
      backgroundImg.src =
        theme === "dark" ? "background-dark.jpg" : "background-light.jpg";
    }
    // save theme to local storage
    localStorage.setItem("theme", theme);
  }
});
