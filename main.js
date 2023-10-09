//para comentar "//"
/* y 
asi
para 
en
bloque
*/

/*
let edad =5; //variable de tipo number
let nombre= "andres"; //una variable de tipo string

//forma no recomendada para declarar variables
var direccion = "AV";

const IVA = 0.21;

nombre = "juan";

console.log (direccion + " " + nombre)
*/


/*
let numeroUno = 5;
let numeroDos = 10;

let resultadoSuma = numeroUno + numeroDos;
let resultadoResta = numeroUno - numeroDos;
let resultadoMultiplicacion = numeroUno * numeroDos;
let resultadoDivision = numeroUno / numeroDos;

console.log("Resultado suma", resultadoSuma);
console.log("Resultado resta", resultadoResta);
console.log("Resultado multiplicacion", resultadoMultiplicacion);
console.log("Resultado division", resultadoDivision);
*/

/*let saludo ="Hola"
let nombre ="Pepito"

let saludoCompleto = saludo + " " + nombre;
console.log(saludoCompleto);
console.log(saludo);
console.log(nombre);
*/

/*let numero = Number (prompt("Ingrese un numero"))
alert(numero + 4)
*/

let nombre = prompt ("Ingrese nombre ")
alert("Hola"+ " " + nombre)

let mail = prompt ("Ingrese mail para recibir las ultimas ofertas ")
alert("El mail:"+ " " + mail+" "+"ha sido ingresado correctamente" )

 let edad = prompt ("Ingrese edad ")

 if (edad >= 18) {
   alert("Para pagos con tarjeta presentar C.I.")

 } else {
alert("Solo compras en el local acompanado de un mayor");

}

let carrito = [];
let totalCarrito = 0;

while (true) {
    let opcion = prompt(`Seleccione una opción:
    1. Patilleras
    2. Cortapelos
    3. Rasuradoras
    4. Mostrar carrito
    Escriba "salir" para salir.`);

    if (opcion === 'salir') {
        break;
    }

    switch (opcion) {
        case '1':
            let submenuPatilleras = '';
            while (submenuPatilleras !== 'menu') {
                submenuPatilleras = prompt(`Submenu Patilleras:
                1. KEMEII - $50
                2. CRONIER - $40
                3. SAMSUNG - $30
                Escriba "menu" para volver al menú principal.`);

                if (submenuPatilleras === '1') {
                    carrito.push('KEMEII');
                    totalCarrito += 50;
                } else if (submenuPatilleras === '2') {
                    carrito.push('CRONIER');
                    totalCarrito += 40;
                } else if (submenuPatilleras === '3') {
                    carrito.push('SAMSUNG');
                    totalCarrito += 30;
                }
            }
            break;

        case '2':
            let submenuCortapelos = '';
            while (submenuCortapelos !== 'menu') {
                submenuCortapelos = prompt(`Submenu Cortapelos:
                1. HTC - $60
                2. GAMA - $45
                3. WAHL - $55
                Escriba "menu" para volver al menú principal.`);

                if (submenuCortapelos === '1') {
                    carrito.push('HTC');
                    totalCarrito += 60;
                } else if (submenuCortapelos === '2') {
                    carrito.push('GAMA');
                    totalCarrito += 45;
                } else if (submenuCortapelos === '3') {
                    carrito.push('WAHL');
                    totalCarrito += 55;
                }
            }
            break;

        case '3':
            let submenuRasuradoras = '';
            while (submenuRasuradoras !== 'menu') {
                submenuRasuradoras = prompt(`Submenu Rasuradoras:
                1. KEMEII - $70
                2. PHILIPS - $65
                3. VGR - $80
                Escriba "menu" para volver al menú principal.`);

                if (submenuRasuradoras === '1') {
                    carrito.push('KEMEII');
                    totalCarrito += 70;
                } else if (submenuRasuradoras === '2') {
                    carrito.push('PHILIPS');
                    totalCarrito += 65;
                } else if (submenuRasuradoras === '3') {
                    carrito.push('VGR');
                    totalCarrito += 80;
                }
            }
            break;

        case '4':
            if (carrito.length === 0) {
                alert('El carrito está vacío.');
            } else {
                alert(`Carrito:
                Productos: ${carrito.join(', ')}
                Total: $${totalCarrito}`);
            }
            break;

        default:
            alert('Opción incorrecta');
            break;
    }
}