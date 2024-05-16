// Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#listaTweets');
let tweets = [];

// Event Listener
eventListeners();

function eventListeners() {
    formulario.addEventListener('submit', agregarTweet);
}

// Funciones
function agregarTweet(e) {
    e.preventDefault();

    // Text arera donde el usuario escribe
    
};