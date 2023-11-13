// agregar productos al carrito
function agregarAlCarrito(nombre, precio) {
    const carrito = document.getElementById("productos-carrito");
    const productoElement = document.createElement("li");
    productoElement.textContent = `${nombre} - $${precio}`;

    // agregar o eliminar productos
    const eliminarBoton = document.createElement("button");
    eliminarBoton.textContent = "Quitar";
    eliminarBoton.addEventListener("click", () => {
        quitarDelCarrito(nombre, precio);
    });
    productoElement.appendChild(eliminarBoton);

    carrito.appendChild(productoElement);

    const totalCarrito = document.getElementById("total-carrito");
    let total = parseFloat(totalCarrito.textContent);
    total += precio;
    totalCarrito.textContent = total;

    // guardar productos en el local
    const carritoActual = obtenerCarritoDelLocalStorage();
    carritoActual.push({ nombre, precio });
    localStorage.setItem("carrito", JSON.stringify(carritoActual));
}

// eliminar un producto 
function quitarDelCarrito(nombre, precio) {
    const carrito = document.getElementById("productos-carrito");
    const productos = carrito.getElementsByTagName("li");

    for (let i = 0; i < productos.length; i++) {
        const producto = productos[i];
        const texto = producto.textContent;
        if (texto.includes(nombre)) {
            carrito.removeChild(producto);
        }
    }

    const totalCarrito = document.getElementById("total-carrito");
    let total = parseFloat(totalCarrito.textContent);
    total -= precio;
    totalCarrito.textContent = total;

    // Actualiza el carrito en el almacenamiento local (localStorage)
    const carritoActual = obtenerCarritoDelLocalStorage();
    const productoIndex = carritoActual.findIndex(item => item.nombre === nombre);
    if (productoIndex !== -1) {
        carritoActual.splice(productoIndex, 1);
        localStorage.setItem("carrito", JSON.stringify(carritoActual));
    }
}

// resultados
function obtenerCarritoDelLocalStorage() {
const carrito = localStorage.getItem("carrito");
return carrito ? JSON.parse(carrito) : [];
}

// cargar el carrito desde el almacenamiento local 
function cargarCarritoDesdeLocalStorage() {
    const carritoActual = obtenerCarritoDelLocalStorage();
    const totalCarrito = document.getElementById("total-carrito");
    let total = 0;

    carritoActual.forEach(item => {
        agregarAlCarrito(item.nombre, item.precio);
        total += item.precio;
    });

    totalCarrito.textContent = total;
}

// botones
document.querySelectorAll(".agregar").forEach(button => {
    button.addEventListener("click", () => {
        const nombre = button.getAttribute("data-nombre");
        const precio = parseFloat(button.getAttribute("data-precio"));
        agregarAlCarrito(nombre, precio);
    });
});

cargarCarritoDesdeLocalStorage();


// reiniciar carrito
function reiniciarCarrito() {
    localStorage.removeItem("carrito");
    location.reload();
}

document.getElementById("reiniciar-carrito").addEventListener("click", reiniciarCarrito);
