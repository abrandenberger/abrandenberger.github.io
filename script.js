function timedscrolltoggle() {
    setTimeout(function () {
        document.body.classList.toggle('noscroll');
    }, 1000);
}

function toggles() {
    document.getElementById("card").classList.toggle('moveout');
    document.getElementById("overlay").classList.toggle('transp');
}

function toggleout() {
    timedscrolltoggle();
    toggles();
    document.getElementById("overlay").classList.remove('earlytransition');
}

function togglein() {
    document.body.classList.toggle('noscroll');
    toggles();
    document.getElementById("overlay").classList.toggle('earlytransition');
}

function insertCss(code) {
    var style = document.createElement('style');
    style.type = 'text/css';

    if (style.styleSheet) {
        // IE
        style.styleSheet.cssText = code;
    } else {
        // Other browsers
        style.innerHTML = code;
    }

    document.getElementsByTagName("head")[0].appendChild(style);
}

let scrollCSS = "::-webkit-scrollbar { width: .8em;}" 
+ "::-webkit-scrollbar-track {background: lightgray; border: .35em solid #f0f0f0; border-radius: 10px; }" 
+ "::-webkit-scrollbar-track { background: lightgray; border: .35em solid #f0f0f0; border-radius: 10px; }" 
+ "::-webkit-scrollbar-thumb { background: #f0b1b1; border: .3em solid #f0f0f0; }" 
+ "::-webkit-scrollbar-thumb:hover { background: #e05c5c; }"

window.addEventListener('load', () => {
    if (window.navigator.platform != 'MacIntel') {
        insertCss(scrollCSS);
        console.log('hi!');
    }
})