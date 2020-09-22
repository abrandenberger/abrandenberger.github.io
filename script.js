function toggles() {
    document.body.classList.toggle('noscroll');
    document.getElementById("card").classList.toggle('moveout');
    document.getElementById("overlay").classList.toggle('transp');
}
function toggleout() {
    toggles();
    document.getElementById("overlay").classList.remove('earlytransition');
}

function togglein() {
    toggles();
    document.getElementById("overlay").classList.toggle('earlytransition');
}