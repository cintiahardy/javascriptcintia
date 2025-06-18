const productos = [
  { nombre: "Manzana", precio: 2550 },
  { nombre: "Banana", precio: 3120 },
  { nombre: "Naranja", precio: 1130 },
  { nombre: "Zanahoria", precio: 990 },
  { nombre: "Lechuga", precio: 1000 },
  { nombre: "Ciruela", precio: 3500 },
  { nombre: "Zapallo", precio: 750 },
  { nombre: "Pera", precio: 2700 },
  { nombre: "Tomate", precio: 1800 },
  { nombre: "Pepino", precio: 1250 },
  { nombre: "Frutilla", precio: 3900 },
  { nombre: "Cebolla", precio: 950 },
  { nombre: "Palta", precio: 4200 }
];

const carrito = [];

function agregarAlCarrito() {
  let seguirComprando = true;

  while (seguirComprando) {
    let mensaje = "Seleccione un producto para agregar al carrito:\n";
    productos.forEach((producto, index) => {
      mensaje += (index + 1) + ". " + producto.nombre + " - $" + producto.precio + "\n";
    });

    let opcion = parseInt(prompt(mensaje)) - 1;

    if (productos[opcion]) {
      carrito.push(productos[opcion]);
      alert(productos[opcion].nombre + " agregado al carrito.");
    } else {
      alert("Opción inválida. Intente nuevamente.");
    }

    seguirComprando = confirm("¿Desea agregar otro producto?");
  }
}

function calcularTotal() {
  let total = 0;
  carrito.forEach(producto => {
    total += producto.precio;
  });
  return total;
}

function mostrarResumen() {
  if (carrito.length === 0) {
    alert("El carrito está vacío.");
    return;
  }

  let resumen = "Resumen de tu compra:\n";
  carrito.forEach((producto, index) => {
    resumen += (index + 1) + ". " + producto.nombre + " - $" + producto.precio + "\n";
  });

  let cantidad = carrito.length;
  let total = calcularTotal();

  resumen += "\nCantidad de productos: " + cantidad;
  resumen += "\nTotal a pagar: $" + total;

  alert(resumen);
}

window.onload = function () {
  alert("Bienvenido al simulador de compras de Mercado Modelo");
  agregarAlCarrito();
  mostrarResumen();
};
