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
    // console.log("switched to" + paneId);
    switchToTab(tab);
    switchToPaneId(paneId);
    document.location.hash = paneId;
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

  window.addEventListener("hashchange", function () {
    // called when the hash changes (back button)
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
    backgroundImg.src =
      theme === "dark" ? "background-dark.jpg" : "background-light.jpg";
    // save theme to local storage
    localStorage.setItem("theme", theme);
  }
});

// function insertCss(code) {
//   let style = document.createElement("style");
//   style.type = "text/css";

//   if (style.styleSheet) {
//     // IE
//     style.styleSheet.cssText = code;
//   } else {
//     // Other browsers
//     style.innerHTML = code;
//   }

//   document.getElementsByTagName("head")[0].appendChild(style);
// }

// let scrollCSS =
//   "::-webkit-scrollbar { width: .8em;}" +
//   "::-webkit-scrollbar-track {background: lightgray; border: .35em solid #f0f0f0; border-radius: 10px; }" +
//   "::-webkit-scrollbar-track { background: lightgray; border: .35em solid #f0f0f0; border-radius: 10px; }" +
//   "::-webkit-scrollbar-thumb { background: #f0b1b1; border: .3em solid #f0f0f0; }" +
//   "::-webkit-scrollbar-thumb:hover { background: #e05c5c; }";

// function toggleHeight(clicked) {
//   if (clicked.style.maxHeight) {
//     clicked.style.maxHeight = null;
//   } else {
//     clicked.style.maxHeight = clicked.scrollHeight + "px";
//   }
// }

// function setFullWidthHeader() {
//   let wrapper = document.getElementsByClassName("collapsible-wrapper")[0];
//   let width = wrapper.getBoundingClientRect().width;
//   // remove padding width of sectionHead (3px, 5px)
//   width -= 8;
//   let sectionHead = document.getElementsByClassName("sectionhead")[0];
//   sectionHead.style.width = width.toString() + "px";
// }

// window.addEventListener("load", () => {
//   if (window.navigator.platform != "MacIntel") {
//     insertCss(scrollCSS);
//   }

//   let coll = document.getElementsByClassName("collapsible");
//   for (let i = 0; i < coll.length; i++) {
//     coll[i].addEventListener("click", function () {
//       let contentList = document.getElementsByClassName("collapsible-content");
//       let clicked = contentList[i];
//       let actives = [];
//       for (let j = 0; j < coll.length; j++) {
//         if (coll[j].classList.contains("active")) {
//           actives.push(j);
//         }
//       }
//       if (actives.length == 0 || actives[0] == i) {
//         // none are open or the clicked one is open
//         toggleHeight(clicked);
//         coll[i].classList.toggle("active");
//       } else {
//         // one is open but not the one clicked now
//         toggleHeight(contentList[actives[0]]);
//         coll[actives[0]].classList.toggle("active");
//         setTimeout(() => {
//           toggleHeight(clicked);
//           coll[i].classList.toggle("active");
//         }, 150);
//       }
//     });
//   }
//   // start with one open
//   // coll[0].click();
//   setFullWidthHeader();
// });

// window.addEventListener("resize", setFullWidthHeader);
