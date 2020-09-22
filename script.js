function toggleout() {
    document.getElementById("card").classList.toggle('moveout');
    document.getElementById("overlay").classList.toggle('transp');
    document.getElementById("overlay").classList.remove('earlytransition');
}

function togglein() {
    document.getElementById("card").classList.toggle('moveout');
    document.getElementById("overlay").classList.toggle('transp');
    document.getElementById("overlay").classList.toggle('earlytransition');
}