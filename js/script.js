const productos = [
  { nombre: "Manzana", precio: 255, imagen: "img/7589787-uhd_2160_3840_25fps" },
  { nombre: "Banana", precio: 210, imagen: "img/pexeñs-ata-alikate-1914780-3285517" },
  { nombre: "Naranja", precio: 190, imagen: "img/naranja.jpg" },
  { nombre: "Pera", precio: 230, imagen: "img/pera.jpg" },
  { nombre: "Frutilla", precio: 300, imagen: "img/frutilla.jpg" },
  { nombre: "Melón", precio: 550, imagen: "img/melon.jpg" },
  { nombre: "Sandía", precio: 700, imagen: "img/sandia.jpg" },
  { nombre: "Ananá", precio: 480, imagen: "img/anana.jpg" },
  { nombre: "Durazno", precio: 290, imagen: "img/durazno.jpg" },
  { nombre: "Ciruela", precio: 310, imagen: "img/ciruela.jpg" },
  { nombre: "Mandarina", precio: 180, imagen: "img/mandarina.jpg" },
  { nombre: "Kiwi", precio: 400, imagen: "img/kiwi.jpg" },
  { nombre: "Uva", precio: 350, imagen: "img/uva.jpg" },
  { nombre: "Limón", precio: 150, imagen: "img/limon.jpg" },
  { nombre: "Pomelo", precio: 200, imagen: "img/pomelo.jpg" },
  { nombre: "Zanahoria", precio: 90, imagen: "img/zanahoria.jpg" },
  { nombre: "Lechuga", precio: 100, imagen: "img/lechuga.jpg" },
  { nombre: "Acelga", precio: 110, imagen: "img/acelga.jpg" },
  { nombre: "Espinaca", precio: 120, imagen: "img/espinaca.jpg" },
  { nombre: "Brócoli", precio: 250, imagen: "img/brocoli.jpg" },
  { nombre: "Coliflor", precio: 260, imagen: "img/coliflor.jpg" },
  { nombre: "Papa", precio: 80, imagen: "img/papa.jpg" },
  { nombre: "Batata", precio: 90, imagen: "img/batata.jpg" },
  { nombre: "Cebolla", precio: 70, imagen: "img/cebolla.jpg" },
  { nombre: "Morrón", precio: 210, imagen: "img/morron.jpg" },
  { nombre: "Apio", precio: 150, imagen: "img/apio.jpg" },
  { nombre: "Repollo", precio: 190, imagen: "img/repollo.jpg" },
  { nombre: "Pepino", precio: 130, imagen: "img/pepino.jpg" },
  { nombre: "Berenjena", precio: 200, imagen: "img/berenjena.jpg" },
  { nombre: "Zapallo", precio: 175, imagen: "img/zapallo.jpg" },
  { nombre: "Calabaza", precio: 185, imagen: "img/calabaza.jpg" },
  { nombre: "Tomate", precio: 170, imagen: "img/tomate.jpg" },
  { nombre: "Rúcula", precio: 100, imagen: "img/rucula.jpg" },
  { nombre: "Hinojo", precio: 120, imagen: "img/hinojo.jpg" },
  { nombre: "Chauchas", precio: 220, imagen: "img/chauchas.jpg" },
  { nombre: "Arvejas", precio: 240, imagen: "img/arvejas.jpg" },
  { nombre: "Lentejas", precio: 200, imagen: "img/lentejas.jpg" },
  { nombre: "Garbanzos", precio: 210, imagen: "img/garbanzos.jpg" },
  { nombre: "Aceitunas", precio: 300, imagen: "img/aceitunas.jpg" },
  { nombre: "Champiñones", precio: 280, imagen: "img/champiniones.jpg" }
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function actualizarCarrito() {
  const lista = document.getElementById("carrito-lista");
  const cantidad = document.getElementById("cantidad");
  const total = document.getElementById("total");

  lista.innerHTML = "";
  let suma = 0;

  carrito.forEach(producto => {
    const item = document.createElement("li");
    item.textContent = `${producto.nombre} - $${producto.precio}`;
    lista.appendChild(item);
    suma += producto.precio;
  });

  cantidad.textContent = carrito.length;
  total.textContent = suma;

  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarAlCarrito(index) {
  carrito.push(productos[index]);
  actualizarCarrito();
}

function renderizarProductos() {
  const contenedor = document.getElementById("lista-productos");
  productos.forEach((producto, index) => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" />
      <h3>${producto.nombre}</h3>
      <p>$${producto.precio}</p>
      <button onclick="agregarAlCarrito(${index})">Agregar</button>
    `;
    contenedor.appendChild(div);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderizarProductos();
  actualizarCarrito();
});
