
const cadacolor =['red','green','blue','purple','orange','yellow','pink','cian'];
let colors = [];


let posicioAleatoria =  Math.floor((Math.random() * cadacolor.length));
console.log(posicioAleatoria);
console.log(cadacolor[posicioAleatoria]);
colors.push(cadacolor[posicioAleatoria]);

// Mostrar el resultad
console.log("Color seleccionado:", cadacolor[posicioAleatoria]);
console.log("Colores seleccionados:", colors);



async function mostrar_colors(temps){
    for (let i=0;i<colors.length;i++){
        //TODO instruccions per mostrar el color. Per exemple

        //Crida al mètode esperar
        await esperar(temps);
        console.log(colors[i]);
    }
}
function esperar(milliseconds){
   return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

mostrar_colors(500);

