function timedscrolltoggle() {
    setTimeout(function() {
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