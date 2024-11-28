class Producto {
    constructor(codigo = 0, nombre = " ", categoria = " ", precio = 0) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = precio;
    }
    precioConIVA() {
        return this.precio * 1.21;
    }
}

const productos = [
    new Producto(1, 'Taza de polímero', 'Tazas', 6000),
    new Producto(2, 'Taza de céramica', 'Tazas', 10000),
    new Producto(3, 'Portaretrato simple', 'Cuadros', 6500),
    new Producto(4, 'Portaretrato doble', 'Cuadros', 8500),
    new Producto(5, 'Cuaderno', 'Librería', 20000),
    new Producto(6, 'Agenda', 'Librería', 22000),
    new Producto(7, 'Tarjetas', 'Papelería', 3500),
    new Producto(8, 'Etiquetas', 'Papelería', 3500)
];

// NUEVO ARRAY CON EL PRECIO CON IVA

const productosConIVA = productos.map(producto => {
    return {
        precioConIVA: producto.precioConIVA()
    };
});

// FILTRADO POR CATEGORÍA PARA EN UN FUTURO ARMAR LA PAGE DE CADA UNA

const categoriaTazas = productos.filter(producto => producto.categoria == "Tazas");
const categoriaCuadros = productos.filter(producto => producto.categoria == "Cuadros");
const categoriaLibreria = productos.filter(producto => producto.categoria == "Librería");
const categoriaPapeleria = productos.filter(producto => producto.categoria == "Papelería");

console.log(categoriaTazas);
console.log(categoriaCuadros);
console.log(categoriaLibreria);
console.log(categoriaPapeleria);



