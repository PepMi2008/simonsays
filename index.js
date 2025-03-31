
const cadacolor = ['red', 'green', 'blue', 'purple', 'orange', 'brown', 'pink', 'cian'];
let posicioAleatoria;
let colors = [];
//let esperandoEntrada = false;
//let currentIndex = 0;

function comensar() {
    document.getElementById('startButton').disabled = true;
    posicioAleatoria = Math.floor(Math.random() * cadacolor.length);
    let selectedColor = cadacolor[posicioAleatoria];
    colors.push(selectedColor);

    console.log("Color seleccionado:", selectedColor);
    console.log("Colores seleccionados:", colors);

    mostrar_colors(1500).then(() => {
        esperandoEntrada = true; // Habilita los clics del usuario
        currentIndex = 0; // Reinicia la posición del usuario en la secuencia
    });
}

async function mostrar_colors(temps) {
    for (let i = 0; i < colors.length; i++) {
        let button = document.getElementById(colors[i]); // Selecciona el botón correcto
        if (button) {
            button.style.filter = "brightness(1.5)"; // Hace el color más claro
            await esperar(temps);
            button.style.filter = "brightness(1)"; // Restaura el color original
        }
        await esperar(temps);
    }
}


function esperar(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}





