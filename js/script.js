const productos = [
  { nombre: "Manzana", precio: 1000, imagen: "/img/" },
  { nombre: "Banana", precio: 950, imagen: "../img/pexels-ata-alikate-1914780-32857517.jpg" },
  { nombre: "Naranja", precio: 1130, imagen: "../img/pexels-pixabay-161559.jpg" },
  { nombre: "Mandarina", precio: 1050, imagen: "../img/pexels-pixabay-327098.jpg" },
  { nombre: "Frutilla", precio: 2100, imagen: "../img/pexels-shotbyrain-6944172.jpg" },
  { nombre: "Ciruela", precio: 1600, imagen: "../img/ciruela.jpg" },
  { nombre: "Pera", precio: 1600, imagen: "../img/pexels-karolina-grabowska-4197445.jpg" },
  { nombre: "Uva", precio: 2000, imagen: "../img/pexels-qjpioneer-708777.jpg" },
  { nombre: "Ananá", precio: 2500, imagen: "../img/pexels-laker-6157052.jpg" },
  { nombre: "Sandía", precio: 3000, imagen: "../img/pexels-elaine-bernadine-castro-126177-2403850.jpg" },
  { nombre: "Durazno", precio: 2100, imagen: "../img/pexels-ellie-burgin-1616546-3283450 (1).jpg" },
  { nombre: "Tomate", precio: 1150, imagen: "../img/pexels-betul-gunes-1793145775-32771642.jpg" },
  { nombre: "Zanahoria", precio: 990, imagen: "../img/pexels-kindel-media-7456548.jpg" },
  { nombre: "Papa", precio: 650, imagen: "../img/pexels-valerie-8096137.jpg" },
  { nombre: "Cebolla", precio: 700, imagen: "../img/pexels-stella-sch-681533-2095569.jpg" },
  { nombre: "Lechuga", precio: 780, imagen: "../img/pexels-nc-farm-bureau-marketing-2893639.jpg" },
  { nombre: "Espinaca", precio: 1300, imagen: "../img/pexels-yaroslav-shuraev-8852027.jpg" },
  { nombre: "Acelga", precio: 790, imagen: "../img/pexels-mike-jones-8805168.jpg" },
  { nombre: "Brócoli", precio: 1200, imagen: "../img/pexels-cup-of-couple-7657091.jpg" },
  { nombre: "Coliflor", precio: 1100, imagen: "../img/pexels-alesia-kozik-6065185.jpg" },
  { nombre: "Zapallo", precio: 900, imagen: "../img/pexels-polina-kovaleva-7258430.jpg" },
  { nombre: "Pepino", precio: 850, imagen: "../img/pexels-lo-422811-2329440.jpg" },
  { nombre: "Apio", precio: 600, imagen: "../img/pexels-n-voitekevich-5377346.jpg" },
  { nombre: "Remolacha", precio: 920, imagen: "../img/pexels-alesia-kozik-6631952.jpg" },
  { nombre: "Rabanito", precio: 1100, imagen: "../img/pexels-any-lane-5945662.jpg" },
  { nombre: "Hinojo", precio: 800, imagen: "../img/pexels-arca-teker-855875994-32920518.jpg" },
  { nombre: "Palta", precio: 2300, imagen: "../img/pexels-lena-khrupina-1386611-2683373.jpg" },
  { nombre: "Choclo", precio: 1400, imagen: "../img/pexels-pixabay-27098.jpg" },
  { nombre: "Repollo", precio: 980, imagen: "../img/pexels-elaine-bernadine-castro-126177-2403850.jpg" },
  { nombre: "Radicheta", precio: 860, imagen: "../img/pexels-stella-sch-681533-2095569.jpg" },
  { nombre: "Ajo", precio: 650, imagen: "../img/pexels-karolina-grabowska-4197445.jpg" }
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

