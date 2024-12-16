const productos = [
    {
        id: "01",
        titulo: 'Curriculum Vitae',
        imagen: "img/cv.png",
        precio: 3000
    },
    {
        id: "02",
        titulo: 'Tarjeta Personal',
        imagen: "img/tarjeta.png",
        precio: 3500
    },
    {
        id: "03",
        titulo: 'Invitación Personalizada',
        imagen: "img/invitacion.png",
        precio: 4000
    },
];


const contenedorProductos = document.querySelector("#contenedor-productos");
function agregar(id) {
    const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
    let newCarrito = [...carrito];
    const productoGuardado = carrito?.findIndex(producto => producto.id == id);

    if (productoGuardado >= 0) {
        newCarrito[productoGuardado] = {
            ...newCarrito[productoGuardado],
            cantidad: newCarrito[productoGuardado].cantidad + 1
        };
    } else {
        newCarrito = [...newCarrito, {
            id, cantidad: 1
        }];
    }

    localStorage.setItem("carrito", JSON.stringify(newCarrito));
    actualizarContador(newCarrito.reduce((suma, item) => suma + item.cantidad, 0));
    actualizarCarrito();
}


function quitarProducto(id) {
    const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
    const productoIndex = carrito.findIndex(producto => producto.id === id);

    if (productoIndex >= 0) {
        if (carrito[productoIndex].cantidad > 1) {

            carrito[productoIndex].cantidad -= 1;
        } else {

            carrito.splice(productoIndex, 1);
        }
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
    actualizarContador(carrito.reduce((suma, item) => suma + item.cantidad, 0));
}


/* ACTUALIZAR CARRITO */

function actualizarCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
    const contenedorCarrito = document.getElementById("contenedor-carrito-productos");

    let items = document.createElement("div");

    
    const encabezado = document.createElement("div");
    encabezado.classList.add("carrito-header");
    encabezado.innerHTML = `
        <p>Cantidad</p>
        <p>Título</p>
        <p>Precio</p>
        <p>Sacar</p>
        <p>Agregar</p>
        
    `;
    items.append(encabezado);

    // PRODUCTOS EN EL CARRITO
    carrito.forEach(({ id, cantidad }) => {
        const producto = productos.find(producto => id === producto.id);

        const div = document.createElement("div");
        div.classList.add("producto-row");
        div.innerHTML = `
        <p>${cantidad}</p>
        <p>${producto.titulo}</p>
        <p>$${producto.precio}</p>
        <div class="boton-container1">
            <button class="eliminar-producto" onclick="quitarProducto('${id}')">
                <img src="https://img.icons8.com/material-outlined/24/x-coordinate.png" alt="x-coordinate"/>
            </button>
        </div>
        <div class="boton-container2">
            <button class="agregar-producto" onclick="agregar('${id}')">
                <img src="https://img.icons8.com/material-rounded/24/filled-plus-2-math.png" alt="filled-plus-2-math"/>
            </button>
        </div>
    `;

        items.append(div);
        
    });

    // TOTAL
    const total = document.createElement("div");
    total.classList.add("carrito-total");
    total.innerHTML = `
        <p></p>
        <p>TOTAL:</p>
        <p>$${carrito.reduce((suma, { id, cantidad }) => {
        const producto = productos.find(producto => id === producto.id);
        return suma + (producto.precio * cantidad);
    }, 0)}</p>
    `;
    items.append(total);

    contenedorCarrito.innerHTML = items.outerHTML;
}

function actualizarContador(cantidad) {
    const contador = document.getElementById("contador")
    contador.textContent = cantidad
}

/* VACIAR CARRITO */

function vaciarCarrito() {
    localStorage.removeItem("carrito");
    actualizarContador(0);
    document.getElementById("contenedor-carrito-productos").innerHTML = "";
}

/* CARGAR TARJETAS */

function cargarProductos() {
    const carrito = JSON.parse(localStorage.getItem("carrito") || "[]")
    actualizarContador(carrito.reduce((suma, item) => suma + item.cantidad, 0))
    productos.forEach(producto => {
        const id = producto.id
        const div = document.createElement("div");
        div.classList.add('producto');
        div.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.titulo}">
        <div class="info-card">
            <p class='producto-titulo'>${producto.titulo}</p>
            <div class="producto-precio">
                <p>$${producto.precio}</p>
            </div>
            <button onclick="agregar(id)" class="producto-agregar" id='${producto.id}'>Agregar al carrito</button>
         `;

        contenedorProductos.append(div);

    })
}
const popoverButton = document.getElementById('contenedor-iconos');
const popover = document.getElementById('popover');
const closeButton = document.getElementById('close-popover');
const vaciarCarritoButton = document.getElementById('vaciar-carro')

// MOSTRAR EL POP-OVER
popoverButton.addEventListener('click', () => {
    actualizarCarrito()
    popover.style.display = 'block';
});

// CERRAR EL POP-OVER
closeButton.addEventListener('click', () => {
    popover.style.display = 'none';
});

vaciarCarritoButton.addEventListener('click', vaciarCarrito)


cargarProductos();