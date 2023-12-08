// variables para el carrito y el total
let carritoActual = obtenerCarritoDelLocalStorage();
let totalCarrito = 0;

// eventos para el botón de agregar productos
document.querySelectorAll(".agregar").forEach(button => {
    button.addEventListener("click", () => {
        const titulo = button.getAttribute("data-titulo");
        const precio = parseFloat(button.getAttribute("data-precio"));
        const imagen = button.getAttribute("data-imagen");
        agregarAlCarrito(titulo, precio, imagen);
    });
});

// reiniciar el carrito
document.getElementById("reiniciar-carrito").addEventListener("click", reiniciarCarrito);

// función agregar productos al carrito
function agregarAlCarrito(titulo, precio, imagen) {
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
        onClick: function () { } // Callback after click
    }).showToast();
    const carrito = document.getElementById("productos-carrito");
    const productoElement = document.createElement("li");
    productoElement.innerHTML = `
        <img src="${imagen}" alt="${titulo}" />
        ${titulo} - $${precio}
    `;
    

    // agregar o eliminar productos
    const eliminarBoton = document.createElement("button");
    eliminarBoton.textContent = "Quitar";
    eliminarBoton.className = "quitar";
    eliminarBoton.addEventListener("click", () => {
        quitarDelCarrito(titulo, precio);
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
            onClick: function () { } // Callback after click
        }).showToast();
    });
    productoElement.appendChild(eliminarBoton);

    carrito.appendChild(productoElement);

    // actualizar el total cuando se agrega un producto
    totalCarrito += precio;
    actualizarTotal();

    // actualizar el carritoActual y guardar en el Local Storage
    carritoActual.push({ titulo, precio, imagen });
    actualizarCarritoEnLocalStorage();

}

function cargarProductosDesdeJSON() {
    fetch('./json/productos.json')
        .then(response => response.json())
        .then(data => {
            agregarProductosAlContenedor(data);
        })
        .catch(error => console.error('Error al cargar productos desde el archivo JSON:', error));
}

function agregarProductosAlContenedor(productos) {
    const contenedorProductos = document.getElementById("contenedor-productos");

    productos.forEach(producto => {
        const productoElement = document.createElement("div");
        productoElement.className = "producto";
        productoElement.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.titulo}" />
            <h3>${producto.titulo}</h3>
            <p>Precio: $${producto.precio.toFixed(2)}</p>
            <button class="agregar" data-titulo="${producto.titulo}" data-precio="${producto.precio}" data-imagen="${producto.imagen}">Agregar al Carrito</button>
        `;

        contenedorProductos.appendChild(productoElement);

        // evento click al botón para agregar al carrito
        const botonAgregar = productoElement.querySelector(".agregar");
        botonAgregar.addEventListener("click", () => {
            const titulo = botonAgregar.getAttribute("data-titulo");
            const precio = parseFloat(botonAgregar.getAttribute("data-precio"));
            const imagen = botonAgregar.getAttribute("data-imagen");
            agregarAlCarrito(titulo, precio, imagen);
        });
    });
}

// función para cargar productos desde el JSON
cargarProductosDesdeJSON();

// función eliminar un producto del carrito
function quitarDelCarrito(titulo, precio) {
    const carrito = document.getElementById("productos-carrito");
    const productos = carrito.getElementsByTagName("li");

    for (let i = 0; i < productos.length; i++) {
        const producto = productos[i];
        const texto = producto.textContent;
        if (texto.includes(titulo)) {
            // Remueve solo el producto específico
            carrito.removeChild(producto);
            break; // Sal del bucle después de encontrar y eliminar el producto
        }
    }

    // actualizar el total
    totalCarrito -= precio;
    actualizarTotal();

    // actualizar el carrito en el almacenamiento local
    actualizarCarritoEnLocalStorage();
}
// función para actualizar el total en la interfaz
function actualizarTotal() {
    const totalCarritoElement = document.getElementById("total-carrito");
    totalCarritoElement.textContent = totalCarrito.toFixed(2);
}


// función para guardar o actualizar el carrito en el local storage
function actualizarCarritoEnLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(carritoActual));
}

// función para obtener el carrito desde el local storage
function obtenerCarritoDelLocalStorage() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

window.addEventListener('beforeunload', () => {
    actualizarCarritoEnLocalStorage();
});


document.addEventListener('DOMContentLoaded', () => {
    carritoActual = obtenerCarritoDelLocalStorage();

    // limpiar completamente el carrito en la interfaz antes de recargar
    const carrito = document.getElementById("productos-carrito");
    carrito.innerHTML = "";

    // recargar el carrito en la interfaz
    carritoActual.forEach(producto => {
        agregarAlCarrito(producto.titulo, producto.precio, producto.imagen);
    });

    // actualizar el total
    actualizarTotal();
});


// función para reiniciar el carrito
function reiniciarCarrito() {
    Swal.fire("Carrito vaciado!");
    
    // reiniciar las variables globales
    carritoActual = [];
    totalCarrito = 0;

    // vaciar el carrito en la interfaz
    const carrito = document.getElementById("productos-carrito");
    carrito.innerHTML = "";

    // actualizar el total
    actualizarTotal();

    // vaciar el almacenamiento local (localStorage)
    localStorage.removeItem("carrito");

    // actualizar el carrito en el Local Storage después de reiniciar
    actualizarCarritoEnLocalStorage();
}