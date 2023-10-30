function Producto(nombre, precio) {
    this.nombre = nombre;
    this.precio = precio;
}

let carrito = [];
let totalCarrito = 0;

function agregarAlCarrito(producto) {
    carrito.push(producto);
    totalCarrito += producto.precio;
    alert(`${producto.nombre} ha sido agregado al carrito.`);
}

function mostrarCarrito() {
    if (carrito.length === 0) {
        alert('El carrito está vacío.');
    } else {
        let productosEnCarrito = carrito.map(producto => producto.nombre);
        alert(`Carrito:
        Productos: ${productosEnCarrito.join(', ')}
        Total: $${totalCarrito}`);
    }
}

carrito.buscarProducto = function(nombreProducto) {
    return this.find(producto => producto.nombre === nombreProducto);
};

carrito.filtrarPorPrecio = function(precioMaximo) {
    return this.filter(producto => producto.precio <= precioMaximo);
};

while (true) {
    let opcion = prompt(`Seleccione una opción:
    1. Patilleras
    2. Cortapelos
    3. Rasuradoras
    4. Mostrar carrito
    5. Buscar producto por nombre
    6. Filtrar productos por precio
    Escriba "salir" para salir.`);

    if (opcion === 'salir') {
        break;
    }

    switch (opcion) {
        case '1':
            let submenuPatilleras = '';
            while (submenuPatilleras !== 'salir') {
                submenuPatilleras = prompt(`Submenu Patilleras:
                1. KEMEII - $50
                2. CRONIER - $40
                3. SAMSUNG - $30
                Escriba "salir" para volver al menú principal.`);

                if (submenuPatilleras === '1') {
                    agregarAlCarrito(new Producto('KEMEII', 50));
                } else if (submenuPatilleras === '2') {
                    agregarAlCarrito(new Producto('CRONIER', 40));
                } else if (submenuPatilleras === '3') {
                    agregarAlCarrito(new Producto('SAMSUNG', 30));
                }
            }
            break;

        case '2':
            let submenuCortapelos = '';
            while (submenuCortapelos !== 'salir') {
                submenuCortapelos = prompt(`Submenu Cortapelos:
                1. HTC - $60
                2. GAMA - $45
                3. WAHL - $55
                Escriba "salir" para volver al menú principal.`);

                if (submenuCortapelos === '1') {
                    agregarAlCarrito(new Producto('HTC', 60));
                } else if (submenuCortapelos === '2') {
                    agregarAlCarrito(new Producto('GAMA', 45));
                } else if (submenuCortapelos === '3') {
                    agregarAlCarrito(new Producto('WAHL', 55));
                }
            }
            break;

        case '3':
            let submenuRasuradoras = '';
            while (submenuRasuradoras !== 'salir') {
                submenuRasuradoras = prompt(`Submenu Rasuradoras:
                1. KEMEII - $70
                2. PHILIPS - $65
                3. VGR - $80
                Escriba "salir" para volver al menú principal.`);

                if (submenuRasuradoras === '1') {
                    agregarAlCarrito(new Producto('KEMEII', 70));
                } else if (submenuRasuradoras === '2') {
                    agregarAlCarrito(new Producto('PHILIPS', 65));
                } else if (submenuRasuradoras === '3') {
                    agregarAlCarrito(new Producto('VGR', 80));
                }
            }
            break;

        case '4':
            mostrarCarrito();
            break;

        case '5':
            let nombreProducto = prompt('Ingrese el nombre del producto a buscar:');
            const productoEncontrado = carrito.buscarProducto(nombreProducto);
            if (productoEncontrado) {
                alert(`Producto encontrado: ${productoEncontrado.nombre}, Precio: $${productoEncontrado.precio}`);
            } else {
                alert('Producto no encontrado en el carrito.');
            }
            break;

        case '6':
            let precioMaximo = parseFloat(prompt('Ingrese el precio máximo para filtrar productos:'));
            const productosFiltrados = carrito.filtrarPorPrecio(precioMaximo);
            if (productosFiltrados.length > 0) {
                let productosFiltradosNombres = productosFiltrados.map(producto => producto.nombre);
                alert(`Productos encontrados: ${productosFiltradosNombres.join(', ')}`);
            } else {
                alert('No se encontraron productos que cumplan con el filtro.');
            }
            break;

        default:
            alert('Opción incorrecta');
            break;
    }
}