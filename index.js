const cadacolor = ['red', 'green', 'blue', 'purple', 'orange', 'yellow', 'pink', 'cian'];
let posicioAleatoria; //Contindrà un nombre ale
let colors = [];
function comensar() {

    document.getElementById('startButton').disabled="true";
    posicioAleatoria = Math.floor((Math.random() * cadacolor.length));
    console.log(posicioAleatoria);
    console.log(cadacolor[posicioAleatoria]);
    colors.push(cadacolor[posicioAleatoria]);


// Mostrar el resultad
    console.log("Color seleccionado:", cadacolor[posicioAleatoria]);
    console.log("Colores seleccionados:", colors);
    mostrar_colors(500);

//    comensar.disabled = true;
}

    async function mostrar_colors(temps) {
        for (let i = 0; i < colors.length; i++) {
            //TODO instruccions per mostrar el color. Per exemple

            //Crida al mètode esperar

            document.getElementById('red', 'green', 'blue', 'purple', 'orange', 'yellow', 'pink', 'cian').style.backgroundColor='red', 'green', 'blue', 'purple', 'orange', 'yellow', 'pink', 'cian';
            await esperar(temps);
            document.getElementById('red', 'green', 'blue', 'purple', 'orange', 'yellow', 'pink', 'cian').style.backgroundColor='red', 'green', 'blue', 'purple', 'orange', 'yellow', 'pink', 'cian';


        }
    }


function esperar(milliseconds){
   return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

//mostrar_colors(500);




