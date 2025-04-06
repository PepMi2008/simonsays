// Llista de colors disponibles per al joc
const cadacolor = ['red', 'green', 'blue', 'purple', 'orange', 'brown', 'pink', 'cian'];
let posicioAleatoria;  // Variable per emmagatzemar la posició aleatòria del color seleccionat
let colors = [];       // Llista que guarda la seqüència de colors seleccionats
let esperandoEntrada = false;  // Determina si estem esperant que l'usuari introdueixi una resposta
let currentIndex = 0;  // Índex per controlar en quin punt de la seqüència estem
let tempsDeMemoritzacio = 1300; // Temps inicial que es mostra cada color per part de l'usuari (en mil·lisegons)

// Funció que inicia el joc
function comensar() {
    // Desactiva el botó de començar per evitar que es prem múltiples vegades
    document.getElementById('startButton').disabled = true;
    // Afegeix un color aleatori a la seqüència
    agregarColor();
    // Mostra la seqüència de colors amb el temps de memòria definit
    mostrar_colors(tempsDeMemoritzacio).then(() => {
        // Després de mostrar els colors, comencem a esperar les entrades de l'usuari
        esperandoEntrada = true;
        currentIndex = 0;
    });
}

// Funció que afegeix un color aleatori a la seqüència
function agregarColor() {
    // Genera una posició aleatòria entre 0 i la longitud de la llista de colors
    posicioAleatoria = Math.floor(Math.random() * cadacolor.length);
    // Obté el color seleccionat a partir de la posició aleatòria
    let selectedColor = cadacolor[posicioAleatoria];
    // Afegeix el color a la seqüència
    colors.push(selectedColor);
    console.log("Color seleccionat:", selectedColor);
    console.log("Seqüència actual:", colors);  // Mostra la seqüència de colors fins al moment
}

// Funció que mostra la seqüència de colors per al jugador
async function mostrar_colors(temps) {
    // Recorre la seqüència de colors
    for (let i = 0; i < colors.length; i++) {
        let button = document.getElementById(colors[i]); // Selecciona el botó de color corresponent
        if (button) {
            // Augmenta la brillantor del botó per fer-lo destacar
            button.style.filter = "brightness(1.5)";
            // Espera 700ms abans de restaurar el color original
            await esperar(700);
            // Restaura la brillantor original del botó
            button.style.filter = "brightness(1)";
        }
        // Espera un temps per abans de mostrar el següent color
        await esperar(temps);
    }
}

// Funció que maneja els clics de l'usuari per comprovar si ha fet la seqüència correcta
function manejarclics(colorSeleccionado) {
    // Si no estem esperant una entrada, ignorem el clic
    if (!esperandoEntrada) return;

    // Comprova si el color seleccionat és correcte (seguint l'índex actual de la seqüència)
    if (colorSeleccionado == colors[currentIndex]) {
        // Si el color és correcte, avancem a l'índex següent
        currentIndex++;
        // Si hem completat tota la seqüència, incrementem la dificultat i mostrem els colors de nou
        if (currentIndex == colors.length) {
            esperandoEntrada = false; // Evitem clics ràpids durant la transició
            setTimeout(() => {
                incrementarDificultat(); // Augmenta la dificultat afegint un nou color
                // Mostra la nova seqüència de colors amb el temps reduït
                mostrar_colors(tempsDeMemoritzacio)
                    .then(() => {
                        esperandoEntrada = true;  // Tornem a esperar entrades de l'usuari
                        currentIndex = 0;  // Reiniciem l'índex
                    })
                    .catch(error => console.error("Error al mostrar colors:", error));
            }, 1000);
        }
    } else {
        // Si l'usuari es confon, es mostren alertes i el joc es reinicia
        alert("¡Has perdut! Torneu a intentar.");
        reiniciarJuego();
        return; // Atura l'execució del codi
    }
}

// Funció que incrementa la dificultat afegint un color més i reduint el temps per memoritzar
function incrementarDificultat() {
    // Redueix el temps de memòria (sempre més gran o igual a 600ms)
    tempsDeMemoritzacio = Math.max(600, tempsDeMemoritzacio - 100);
    // Afegeix un nou color a la seqüència per fer el joc més difícil
    agregarColor();
}

// Funció per reiniciar el joc
function reiniciarJuego() {
    // Neteja la seqüència de colors i reinicia les variables
    colors = [];
    esperandoEntrada = false;
    currentIndex = 0;
    // Habilita el botó de començar per permetre reiniciar el joc
    document.getElementById('startButton').disabled = false;
}

// Funció auxiliar que retorna una promesa que s'executa després d'un temps determinat
function esperar(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}
