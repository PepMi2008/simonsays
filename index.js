const cadacolor = ['red', 'green', 'blue', 'purple', 'orange', 'brown', 'pink', 'cian'];
let posicioAleatoria;
let colors = [];
let esperandoEntrada = false;
let currentIndex = 0;
let tempsDeMemoritzacio = 1300; // Temps inicial per recordar cada color (en mil·lisegons)

// Comença el joc
function comensar() {
    document.getElementById('startButton').disabled = true;
    agregarColor();
    mostrar_colors(tempsDeMemoritzacio).then(() => {
        esperandoEntrada = true;
        currentIndex = 0;
    });
}

// Afegeix un color aleatori a la seqüència
function agregarColor() {
    posicioAleatoria = Math.floor(Math.random() * cadacolor.length);
    let selectedColor = cadacolor[posicioAleatoria];
    colors.push(selectedColor);
    console.log("Color seleccionat:", selectedColor);
    console.log("Seqüència actual:", colors);
}

// Mostra la seqüència de colors
async function mostrar_colors(temps) {
    for (let i = 0; i < colors.length; i++) {
        let button = document.getElementById(colors[i]); // Selecciona el botó correcte
        if (button) {
            button.style.filter = "brightness(1.5)"; // Fa el color més clar
            await esperar(700);
            button.style.filter = "brightness(1)"; // Restaura el color original
        }
        await esperar(temps);
    }
}

// Gestió dels clics dels colors
function manejarclics(colorSeleccionado) {
    if (!esperandoEntrada) return;

    if (colorSeleccionado == colors[currentIndex]) {
        currentIndex++;
        if (currentIndex == colors.length) {
            esperandoEntrada = false; // Evita múltiples clics ràpids
            setTimeout(() => {
                incrementarDificultat(); // Augmentem la dificultat
                mostrar_colors(tempsDeMemoritzacio)
                    .then(() => {
                        esperandoEntrada = true;
                        currentIndex = 0;
                    })
                    .catch(error => console.error("Error al mostrar colors:", error));
            }, 1000);
        }
    } else {
        alert("¡Has perdut! Torneu a intentar.");
        reiniciarJuego();
        return; // Atura l'execució
    }
}

// Incrementa la dificultat afegint un color més i reduint el temps
function incrementarDificultat() {
    tempsDeMemoritzacio = Math.max(600, tempsDeMemoritzacio - 100); // Redueix el temps fins a un mínim de 1000ms
    agregarColor(); // Afegeix un nou color a la seqüència
}

// Reinicia el joc
function reiniciarJuego() {
    colors = [];
    esperandoEntrada = false;
    currentIndex = 0;
    document.getElementById('startButton').disabled = false;
}

// Funció per esperar un temps determinat (en mil·lisegons)
function esperar(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}
