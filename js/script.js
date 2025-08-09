const productos = [
  { nombre: "Manzana", precio: 1000, imagen: "../img/manzana.jpg" },
  { nombre: "Banana", precio: 950, imagen: "../img/pexels-ata-alikate-1914780-32857517.jpg" },
  { nombre: "Naranja", precio: 1130, imagen: "../img/pexels-pixabay-161559.jpg" },
  { nombre: "Mandarina", precio: 1050, imagen: "../img/pexels-pixabay-327098.jpg" },
  { nombre: "Frutilla", precio: 2100, imagen: "../img/pexels-shotbyrain-6944172.jpg" },
  { nombre: "Ciruela", precio: 1600, imagen: "../img/ciruela.jpg" },
  { nombre: "Pera", precio: 1600, imagen: "../img/pera.jpg" },
  { nombre: "Uva", precio: 2000, imagen: "../img/pexels-qjpioneer-708777.jpg" },
  { nombre: "Ananá", precio: 2500, imagen: "../img/pexels-laker-6157052.jpg" },
  { nombre: "Sandía", precio: 3000, imagen: "../img/sandia.jpg" },
  { nombre: "Durazno", precio: 2100, imagen: "../img/durazno.jpg" },
  { nombre: "Tomate", precio: 1150, imagen: "../img/tomate.jpg" },
  { nombre: "Zanahoria", precio: 990, imagen: "../img/zanahoria.jpg" },
  { nombre: "Papa", precio: 650, imagen: "../img/papa.jpg" },
  { nombre: "Cebolla", precio: 700, imagen: "../img/cebolla.jpg" },
  { nombre: "Lechuga", precio: 780, imagen: "../img/lechuga.jpg" },
  { nombre: "Espinaca", precio: 1300, imagen: "../img/pexels-yaroslav-shuraev-8852027.jpg" },
  { nombre: "Acelga", precio: 790, imagen: "../img/acelga.jpg" },
  { nombre: "Brócoli", precio: 1200, imagen: "../img/pexels-cup-of-couple-7657091.jpg" },
  { nombre: "Coliflor", precio: 1100, imagen: "../img/coliflor.jpg" },
  { nombre: "Arandanos", precio: 900, imagen: "../img/arandanos.jpg" },
  { nombre: "Pepino", precio: 850, imagen: "../img/pexels-lo-422811-2329440.jpg" },
  { nombre: "Apio", precio: 600, imagen: "../img/apio.jpg" },
  { nombre: "Remolacha", precio: 920, imagen: "../img/remolacha.jpg" },
  { nombre: "Melon", precio: 1100, imagen: "../img/melon.jpg" },
  { nombre: "Pimiento", precio: 800, imagen: "../img/pimiento.jpg" },
  { nombre: "Palta", precio: 2300, imagen: "../img/palta.jpg" },
  { nombre: "Choclo", precio: 1400, imagen: "../img/choclo.jpg" },
  { nombre: "Berenjena", precio: 980, imagen: "../img/berenjena.jpg" },
  { nombre: "Pomelo", precio: 860, imagen: "../img/pomelo.jpg" },
  { nombre: "Limón", precio: 650, imagen: "../img/limon.jpg" }
];

let carrito = {};

function mostrarProductos(lista) {
  const contenedor = document.getElementById("lista-productos");
  contenedor.innerHTML = "";

  lista.forEach((producto) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre} x KG</h3>
      <p><s>$${(producto.precio * 1.2).toFixed(2)}</s></p>
      <p><strong>$${producto.precio.toFixed(2)}</strong></p>
      <p class="precio-sin-imp">Precio s/imp. $${(producto.precio * 0.9).toFixed(2)}</p>
      <div class="controles">
        <button onclick="restar('${producto.nombre}')">-</button>
        <span id="cantidad-${producto.nombre}">0.00</span>
        <button onclick="sumar('${producto.nombre}')">+</button>
      </div>
    `;
    contenedor.appendChild(card);
  });
}

function sumar(nombre) {
  if (!carrito[nombre]) carrito[nombre] = 0;
  carrito[nombre] += 1;
  actualizarCantidad(nombre);
  actualizarCarrito();
}

function restar(nombre) {
  if (carrito[nombre]) {
    carrito[nombre] -= 1;
    if (carrito[nombre] <= 0) delete carrito[nombre];
  }
  actualizarCantidad(nombre);
  actualizarCarrito();
}

function actualizarCantidad(nombre) {
  const cantidad = carrito[nombre] || 0;
  document.getElementById(`cantidad-${nombre}`).innerText = cantidad.toFixed(2);
}

function actualizarCarrito() {
  const totalItems = Object.values(carrito).reduce((a, b) => a + b, 0);
  const totalPrecio = Object.entries(carrito).reduce((acc, [nombre, cant]) => {
    const prod = productos.find(p => p.nombre === nombre);
    return acc + prod.precio * cant;
  }, 0);

  document.getElementById("cantidad-productos").innerText = totalItems;
  document.getElementById("total").innerText = `$${totalPrecio.toFixed(2)}`;
}

function enviarPedido() {
  const mensaje = Object.entries(carrito).map(([nombre, cant]) => {
    return `- ${nombre} x ${cant}KG`;
  }).join('%0A');
  const total = document.getElementById("total").innerText;
  const texto = `Hola! Quiero hacer el siguiente pedido:%0A${mensaje}%0ATotal: ${total}`;
  const numero = "3482332865";
  window.open(`https://wa.me/${numero}?text=${texto}`, "_blank");
}

document.getElementById("buscador").addEventListener("input", (e) => {
  const filtro = e.target.value.toLowerCase();
  const filtrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(filtro)
  );
  mostrarProductos(filtrados);
});

document.getElementById("btn-wsp").addEventListener("click", enviarPedido);

document.addEventListener("DOMContentLoaded", () => {
  mostrarProductos(productos);
});
