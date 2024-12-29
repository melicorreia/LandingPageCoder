let productos = [];

const obtenerProductos = async () => {
    try {
        const response = await fetch("./json/productos.json");
        const data = await response.json();
        
        productos = data;
        
        console.log(productos);
        cargarProductos();
    } catch (error) {
        Swal.fire({
            title: "Página en mantenimiento",
            text: "Disculpe las molestias ocasionadas, la página estará disponible a la brevedad. Mientras tanto puedes comunicarte por mail a lowindigital@gmail.com y le responderemos pronto",
            color:" #000000",
            backdrop: "rgba(251, 96, 117, 0.58)",
            allowEscapeKey: false,
            allowOutsideClick: false,
            showConfirmButton: false
            });

        console.log(error);
    }
};
obtenerProductos();

const contenedorProductos = document.querySelector("#contenedor-productos");

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1500,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});

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

    Toast.fire({
        icon: "success",
        title: "Producto agregado al carrito"
    });
}

function quitarProducto(id) {
    const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
    const productoIndex = carrito.findIndex(producto => producto.id === id);

    if (productoIndex >= 0) {
        (carrito[productoIndex].cantidad > 1) ? carrito[productoIndex].cantidad -= 1 : carrito.splice(productoIndex, 1);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
    actualizarContador(carrito.reduce((suma, item) => suma + item.cantidad, 0));

    Toast.fire({
        title: "Producto eliminado del carrito"
    });
}

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
                <i class="fa-solid fa-minus"></i>
            </button>
        </div>
        <div class="boton-container2">
            <button class="agregar-producto" onclick="agregar('${id}')">
                <i class="fa-solid fa-plus"></i>
            </button>
        </div>
    `;

        items.append(div);
        
    });

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

function vaciarCarrito() {

    Swal.fire({
        title: "¿Está seguro que desea vaciar su carrito?",
        text: "Esta acción no se puede revertir",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, vaciarlo"
    }).then((result) => {
        if (result.isConfirmed) {

            localStorage.removeItem("carrito");
            actualizarContador(0);
            document.getElementById("contenedor-carrito-productos").innerHTML = "";

            Swal.fire({
            title: "Carrito vacio",
            text: "Se ha vaciado el carrito con éxito",
            icon: "success"
            });
        }
    });
}

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
    </div>
    <div class="producto-agregar-container">
        <button onclick="agregar('${producto.id}')" class="producto-agregar">Agregar al carrito</button>
    </div>
`;

        contenedorProductos.append(div);

    })
}
const popoverButton = document.getElementById('contenedor-iconos');
const popover = document.getElementById('popover');
const closeButton = document.getElementById('close-popover');
const vaciarCarritoButton = document.getElementById('vaciar-carro')

popoverButton.addEventListener('click', () => {
    actualizarCarrito()
    popover.style.display = 'block';
});

closeButton.addEventListener('click', () => {
    popover.style.display = 'none';
});

vaciarCarritoButton.addEventListener('click', vaciarCarrito)

cargarProductos();

const currentMode = localStorage.getItem('theme') || 'light';

if (currentMode === 'dark') {
document.body.classList.add('dark-mode');
} else {
document.body.classList.remove('dark-mode');
}

const modeToggle = document.getElementById('mode-toggle');
modeToggle.addEventListener('change', () => {

const currentMode = document.body.classList.contains('dark-mode') ? 'light' : 'dark';

localStorage.setItem('theme', currentMode);

if (currentMode === 'dark') {
    document.body.classList.add('dark-mode');
} else {
    document.body.classList.remove('dark-mode');
}
});