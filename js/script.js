const productos = [
  { nombre: "Manzana", precio: 2550 },
  { nombre: "Banana", precio: 3120 },
  { nombre: "Naranja", precio: 1130 },
  { nombre: "Zanahoria", precio: 990 },
  { nombre: "Lechuga", precio: 1000 },
  { nombre: "Ciruela", precio: 3500 },
  { nombre: "Zapallo", precio: 750 }
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const contenedorProductos = document.getElementById("productos");
const listaCarrito = document.getElementById("carrito");
const totalCarrito = document.getElementById("total");
const btnFinalizar = document.getElementById("finalizar");

function renderizarProductos() {
  productos.forEach((producto, index) => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
      <h3>${producto.nombre}</h3>
      <p>Precio: $${producto.precio}</p>
      <button onclick="agregarAlCarrito(${index})">Agregar</button>
    `;
    contenedorProductos.appendChild(div);
  });
}

function agregarAlCarrito(index) {
  carrito.push(productos[index]);
  guardarCarrito();
  renderizarCarrito();
}

function renderizarCarrito() {
  listaCarrito.innerHTML = "";
  let total = 0;
  carrito.forEach((producto, i) => {
    total += producto.precio;
    const li = document.createElement("li");
    li.textContent = `${producto.nombre} - $${producto.precio}`;
    listaCarrito.appendChild(li);
  });
  totalCarrito.textContent = total;
}

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

btnFinalizar.addEventListener("click", () => {
  if (carrito.length === 0) {
    alert("El carrito está vacío.");
    return;
  }

  let resumen = "Resumen de tu compra:\n";
  carrito.forEach((producto, i) => {
    resumen += `${i + 1}. ${producto.nombre} - $${producto.precio}\n`;
  });

  resumen += `\nTotal a pagar: $${carrito.reduce((acc, prod) => acc + prod.precio, 0)}`;

  alert(resumen);

  carrito = [];
  guardarCarrito();
  renderizarCarrito();
});

renderizarProductos();
renderizarCarrito();
