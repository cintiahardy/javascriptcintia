const productos = [
  { nombre: "Manzana", precio: 1000, imagen: "/img/manzana.jpg" },
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
  { nombre: "pimiento", precio: 800, imagen: "../img/pimiento.jpg" },
  { nombre: "Palta", precio: 2300, imagen: "../img/palta.jpg" },
  { nombre: "Choclo", precio: 1400, imagen: "../img/choclo.jpg" },
  { nombre: "Berenjena", precio: 980, imagen: "../img/berenjena.jpg" },
  { nombre: "pomelo", precio: 860, imagen: "../img/pomelo.jpg" },
  { nombre: "limon", precio: 650, imagen: "../img/limon.jpg" }
];

let carrito = [];

function mostrarProductos(productosFiltrados) {
  const contenedor = document.getElementById('lista-productos');
  contenedor.innerHTML = '';

  productosFiltrados.forEach(producto => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>$${producto.precio}</p>
      <button onclick="agregarAlCarrito('${producto.nombre}')">Agregar</button>
    `;
    contenedor.appendChild(div);
  });
}

function agregarAlCarrito(nombre) {
  const producto = productos.find(p => p.nombre === nombre);
  carrito.push(producto);
  actualizarCarrito();
}

function actualizarCarrito() {
  document.getElementById('cantidad-productos').innerText = carrito.length;
  document.getElementById('total').innerText = carrito.reduce((acc, p) => acc + p.precio, 0);
}

document.getElementById('buscador').addEventListener('input', (e) => {
  const filtro = e.target.value.toLowerCase();
  const filtrados = productos.filter(p => p.nombre.toLowerCase().includes(filtro));
  mostrarProductos(filtrados);
});

document.addEventListener('DOMContentLoaded', () => {
  mostrarProductos(productos);
});

