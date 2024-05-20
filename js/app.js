// Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

// Event Listener
eventListeners();

function eventListeners() {
    formulario.addEventListener('submit', agregarTweet);

    // Cuando el documento este listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse( localStorage.getItem('tweets')) || [];

        console.log(tweets);

        crearHTML();
    });
}

// Funciones
function agregarTweet(e) {
    e.preventDefault();

    // Text arera donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    // Validacion
    if (tweet === '') {
        mostrarError('Error');

        return; // Evita que se ejecuten mas lineas de codigo (Funciona en un if dentro de una funcion)
    }

    const tweetObj = {
        id: Date.now(),
        tweet
    };

    // Agregando arreglo de tweets 
    tweets = [...tweets, tweetObj];

    // Crear HTML
    crearHTML();

    // Reiniciar el formulario
    formulario.reset();
};

// Mostrar error
function mostrarError(error) {
    const mensajeError = document.createElement('P');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    // Insercion en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    // Elimina la alerta despues de 3 segundos.
    setTimeout(() => {
        mensajeError.remove();
    }, 2500);
};

//Muestra un listado de los tweets
function crearHTML() {
    limpiarHTML();
    
    if (tweets.length > 0) {
        tweets.forEach( tweet => {
            // Agregar un boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.textContent = 'X';

            // Añadir la funcion de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            };

            // Crear HTML
            const li = document.createElement('li');

            li.innerText = tweet.tweet;

            // Asginar el boton
            li.appendChild(btnEliminar);

            // Agregarlo al html
            listaTweets.appendChild(li);
        })
    };

    sincronizarStorage();
};

// Agrega los tweets actuales a LocalStorage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
};

// Elimina el tweet
function borrarTweet(id) {
    tweets = tweets.filter(tweet => tweet.id !== id);

    crearHTML();
};

// Limpiar el HTML 
function limpiarHTML() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
};