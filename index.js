
const cadacolor = ['red', 'green', 'blue', 'purple', 'orange', 'brown', 'pink', 'cian'];
let posicioAleatoria;
let colors = [];
let esperandoEntrada = false;
let currentIndex = 0;
const sons = {
    red: new Audio('sons/red.mp3'),
    green: new Audio('sons/green.mp3'),
    blue: new Audio('sons/blue.mp3'),
    purple: new Audio('sons/purple.mp3'),
    orange: new Audio('sons/orange.mp3'),
    brown: new Audio('sons/brown.mp3'),
    pink: new Audio('sons/pink.mp3'),
    cian: new Audio('sons/cyan.mp3')
};

function comensar() {
    document.getElementById('startButton').disabled = true;
    agregarColor();
    mostrar_colors(1500).then(() => {
        esperandoEntrada = true;
        currentIndex = 0;
    });


}
    function agregarColor() {
        posicioAleatoria = Math.floor(Math.random() * cadacolor.length);
        let selectedColor = cadacolor[posicioAleatoria];
        colors.push(selectedColor);
        console.log("Color seleccionado:", selectedColor);
        console.log("Secuencia actual:", colors);
    }

    async function mostrar_colors(temps) {

    for (let i = 0; i < colors.length; i++) {
            let button = document.getElementById(colors[i]); // Selecciona el botón correcto
            if (button) {
                button.style.filter = "brightness(1.5)"; // Fa el color més clar
                sons[colors[i]].play();
                await esperar(700);
                button.style.filter = "brightness(1)"; // Restaura el color original

            }
            await esperar(temps);
        }
    }

function manejarclics(colorSeleccionado) {
    if (!esperandoEntrada) return;
    sons[colorSeleccionado].play();

    if (colorSeleccionado == colors[currentIndex]) {
        currentIndex++;
        if (currentIndex == colors.length) {
            esperandoEntrada = false; // Evita múltiples clicks rápidos
            setTimeout(() => {
                agregarColor();
                mostrar_colors(1500)
                    .then(() => {
                        esperandoEntrada = true;
                        currentIndex = 0;
                    })
                    .catch(error => console.error("Error al mostrar colores:", error));
            }, 1000);
        }
    } else {
        alert("¡Has perdut! Torneu a intentar.");
        reiniciarJuego();
        return; // Detiene la ejecución
    }
}

    function reiniciarJuego() {
        colors = [];
        esperandoEntrada = false;
        currentIndex = 0;
        document.getElementById('startButton').disabled = false;
    }

    function esperar(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }






