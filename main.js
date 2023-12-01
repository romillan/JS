// variables para el carrito y el total
let carritoActual = obtenerCarritoDelLocalStorage();
let totalCarrito = 0;

// eventos para el boton de agregar productos
document.querySelectorAll(".agregar").forEach(button => {
    button.addEventListener("click", () => {
        const nombre = button.getAttribute("data-nombre");
        const precio = parseFloat(button.getAttribute("data-precio"));
        agregarAlCarrito(nombre, precio);
    });
});

// reiniciar el carrito
document.getElementById("reiniciar-carrito").addEventListener("click", reiniciarCarrito);

// funcion agregar productos al carrito
function agregarAlCarrito(nombre, precio) {
    Toastify({
        text: "Producto agregado al carrito",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
        background: "linear-gradient(to right, #000000, #ff0000)",
        },
        onClick: function(){} // Callback after click
        }).showToast();
    const carrito = document.getElementById("productos-carrito");
    const productoElement = document.createElement("li");
    productoElement.textContent = `${nombre} - $${precio}`;

    // agregar o eliminar productos
    const eliminarBoton = document.createElement("button");
    eliminarBoton.textContent = "Quitar";
    eliminarBoton.className = "quitar";
    eliminarBoton.addEventListener("click", () => {
        quitarDelCarrito(nombre, precio);
        Toastify({
            text: "Producto eliminado del carrito",
            duration: 3000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
            background: "linear-gradient(to right, #000000, #ff0000)",
            },
            onClick: function(){} // Callback after click
        }).showToast();
    });
    productoElement.appendChild(eliminarBoton);

    carrito.appendChild(productoElement);

    // actualizar el total
    totalCarrito += precio;
    actualizarTotal();


    // guardar productos en el local storage
    guardarCarritoEnLocalStorage();
}


// función,archivo JSON
function cargarProductosDesdeJSON() {
    fetch('./js/productos.json')
        .then(response => response.json())
        .then(data => {
            console.log('Productos cargados desde el archivo JSON:', data);
        })
        .catch(error => console.error('Error al cargar productos desde el archivo JSON:', error));
}


//  función para cargar productos desde el archivo JSON
cargarProductosDesdeJSON();

// funcion eliminar un producto del carrito
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

    // actualizar el total
    totalCarrito -= precio;
    actualizarTotal();

    // actualizar el carrito en el almacenamiento local
    actualizarCarritoEnLocalStorage();
}

// funcion para actualizar el total en la interfaz
function actualizarTotal() {
    const totalCarritoElement = document.getElementById("total-carrito");
    totalCarritoElement.textContent = totalCarrito.toFixed(2);
}

// funcion para guardar el carrito en el local storage
function guardarCarritoEnLocalStorage() {
    const carritoActual = obtenerCarritoDelLocalStorage();
    carritoActual.push({ nombre, precio });
    localStorage.setItem("carrito", JSON.stringify(carritoActual));
}

// funcion para actualizar el carrito en el local storage
function actualizarCarritoEnLocalStorage() {
    const carritoActual = obtenerCarritoDelLocalStorage();
    const productoIndex = carritoActual.findIndex(item => item.nombre === nombre);
    if (productoIndex !== -1) {
        carritoActual.splice(productoIndex, 1);
        localStorage.setItem("carrito", JSON.stringify(carritoActual));
    }
}

// funcion para obtener el carrito desde el local storage
function obtenerCarritoDelLocalStorage() {
    const carrito = localStorage.getItem("carrito");
    return carrito ? JSON.parse(carrito) : [];
}

// funcion para cargar el carrito desde el local storage al cargar la página
document.addEventListener('DOMContentLoaded', cargarCarritoDesdeLocalStorage);


// funcion para reiniciar el carrito
function reiniciarCarrito() {
    Swal.fire("Carrito vaciado!");
    // Reiniciar las variables globales
    carritoActual = [];
    totalCarrito = 0;

    // vaciar el carrito en la interfaz
    const carrito = document.getElementById("productos-carrito");
    carrito.innerHTML = "";

    // actualizar el total
    actualizarTotal();

    // vaciar el almacenamiento local (localStorage)
    localStorage.removeItem("carrito");
}

