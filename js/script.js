
const productos = [
  { id: 1, nombre: "Manzana", precio: 1000, imagen: "img/manzana.jpg" },
  { id: 2, nombre: "Banana", precio: 950, imagen: "img/pexels-ata-alikate-1914780-32857517.jpg" },
  { id: 3, nombre: "Naranja", precio: 1130, imagen: "img/pexels-pixabay-161559.jpg" },
  { id: 4, nombre: "Mandarina", precio: 1050, imagen: "img/pexels-pixabay-327098.jpg" },
  { id: 5, nombre: "Frutilla", precio: 2100, imagen: "img/pexels-shotbyrain-6944172.jpg" },
  { id: 6, nombre: "Ciruela", precio: 1600, imagen: "img/ciruela.jpg" },
  { id: 7, nombre: "Pera", precio: 1600, imagen: "img/pera.jpg" },
  { id: 8, nombre: "Uva", precio: 2000, imagen: "img/pexels-qjpioneer-708777.jpg" },
  { id: 9, nombre: "Ananá", precio: 2500, imagen: "img/pexels-laker-6157052.jpg" },
  { id: 10, nombre: "Sandía", precio: 3000, imagen: "img/sandia.jpg" },
  { id: 11, nombre: "Durazno", precio: 2100, imagen: "img/durazno.jpg" },
  { id: 12, nombre: "Tomate", precio: 1150, imagen: "img/tomate.jpg" },
  { id: 13, nombre: "Zanahoria", precio: 990, imagen: "img/zanahoria.jpg" },
  { id: 14, nombre: "Papa", precio: 650, imagen: "img/papa.jpg" },
  { id: 15, nombre: "Cebolla", precio: 700, imagen: "img/cebolla.jpg" },
  { id: 16, nombre: "Lechuga", precio: 780, imagen: "img/lechuga.jpg" },
  { id: 17, nombre: "Espinaca", precio: 1300, imagen: "img/pexels-yaroslav-shuraev-8852027.jpg" },
  { id: 18, nombre: "Acelga", precio: 790, imagen: "img/acelga.jpg" },
  { id: 19, nombre: "Brócoli", precio: 1200, imagen: "img/pexels-cup-of-couple-7657091.jpg" },
  { id: 20, nombre: "Coliflor", precio: 1100, imagen: "img/coliflor.jpg" },
  { id: 21, nombre: "Arandanos", precio: 900, imagen: "img/arandanos.jpg" },
  { id: 22, nombre: "Pepino", precio: 850, imagen: "img/pexels-lo-422811-2329440.jpg" },
  { id: 23, nombre: "Apio", precio: 600, imagen: "img/apio.jpg" },
  { id: 24, nombre: "Remolacha", precio: 920, imagen: "img/remolacha.jpg" },
  { id: 25, nombre: "Melon", precio: 1100, imagen: "img/melon.jpg" },
  { id: 26, nombre: "Pimiento", precio: 800, imagen: "img/pimiento.jpg" },
  { id: 27, nombre: "Palta", precio: 2300, imagen: "img/palta.jpg" },
  { id: 28, nombre: "Choclo", precio: 1400, imagen: "img/choclo.jpg" },
  { id: 29, nombre: "Berenjena", precio: 980, imagen: "img/berenjena.jpg" },
  { id: 30, nombre: "Pomelo", precio: 860, imagen: "img/pomelo.jpg" },
  { id: 31, nombre: "Limón", precio: 650, imagen: "img/limon.jpg" }
];

let carrito = {}; 
const $ = sel => document.querySelector(sel);
const $all = sel => Array.from(document.querySelectorAll(sel));
const paso = 0.25; 

const contenedorProductos = $("#lista-productos");
const buscador = $("#buscador");
const spanCantidad = $("#cantidad-productos");
const spanTotal = $("#total");
const botonEnviar = $("#btn-enviar-pedido");
const listaCarrito = $("#lista-carrito");
const whatsappFloat = $("#icon-wsp");

function formateaPrecio(num){
  return num.toLocaleString('es-AR', {minimumFractionDigits: 2, maximumFractionDigits: 2});
}

function cargarCarrito(){
  try {
    const raw = localStorage.getItem('carritoMercadoModelo');
    if(raw){
      carrito = JSON.parse(raw);
    } else {
      carrito = {};
    }
  } catch(e){
    carrito = {};
  }
}

function guardarCarrito(){
  localStorage.setItem('carritoMercadoModelo', JSON.stringify(carrito));
}

function renderProductos(list){
  contenedorProductos.innerHTML = '';
  list.forEach(prod => {
    const precioAnterior = (prod.precio * 1.2);
    const precioSinImp = (prod.precio * 0.9);
    const cantidad = carrito[prod.id] || 0;

    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <div class="img-wrap"><img src="${prod.imagen}" alt="${prod.nombre}" loading="lazy"></div>
      <div class="info">
        <h3>${prod.nombre} x KG</h3>
        <div class="precio-anterior">$${formateaPrecio(precioAnterior)}</div>
        <div class="precio-actual">$${formateaPrecio(prod.precio)}</div>
        <div class="precio-sin-imp">Precio s/imp. $${formateaPrecio(precioSinImp)}</div>
      </div>
      <div class="controles">
        <button class="btn-res" data-id="${prod.id}" aria-label="restar">-</button>
        <div class="cant-display" id="cant-${prod.id}">${cantidad.toFixed(2)}</div>
        <button class="btn-sum" data-id="${prod.id}" aria-label="sumar">+</button>
      </div>
    `;
    contenedorProductos.appendChild(card);
  });

  $all('.btn-sum').forEach(b => b.addEventListener('click', e => {
    const id = Number(e.currentTarget.dataset.id);
    cambiarCantidad(id, paso);
  }));
  $all('.btn-res').forEach(b => b.addEventListener('click', e => {
    const id = Number(e.currentTarget.dataset.id);
    cambiarCantidad(id, -paso);
  }));
}

function cambiarCantidad(id, delta){
  const prod = productos.find(p => p.id === id);
  if(!prod) return;
  const actual = carrito[id] || 0;
  let nueva = +(actual + delta).toFixed(2);
  if(nueva < 0) nueva = 0;
  if(nueva === 0){
    delete carrito[id];
  } else {
    carrito[id] = nueva;
  }
  document.getElementById(`cant-${id}`).innerText = (carrito[id] || 0).toFixed(2);
  actualizarCarrito();
  guardarCarrito();
}

function actualizarCarrito(){
  
  const totalItems = Object.values(carrito).reduce((s, c) => s + c, 0);
  spanCantidad.innerText = totalItems.toFixed(2);

  let totalPrecio = 0;
  listaCarrito.innerHTML = '';
  Object.entries(carrito).forEach(([idStr, cant]) => {
    const id = Number(idStr);
    const prod = productos.find(p => p.id === id);
    if(!prod) return;
    const subtotal = prod.precio * cant;
    totalPrecio += subtotal;

    const li = document.createElement('li');
    li.innerText = `${prod.nombre} x ${cant.toFixed(2)} kg — $${formateaPrecio(subtotal)}`;
    listaCarrito.appendChild(li);
  });

  spanTotal.innerText = formateaPrecio(totalPrecio);
}

function enviarPedidoWhatsApp(){
  const items = Object.entries(carrito);
  if(items.length === 0){
    
    botonEnviar.innerText = 'Carrito vacío';
    setTimeout(()=> botonEnviar.innerText = 'Enviar pedido por WhatsApp', 1500);
    return;
  }

  let mensaje = 'Hola! Quiero hacer el siguiente pedido:%0A';
  let total = 0;
  items.forEach(([idStr, cant], idx) => {
    const id = Number(idStr);
    const prod = productos.find(p => p.id === id);
    const subtotal = prod.precio * cant;
    total += subtotal;
    mensaje += `${idx+1}. ${prod.nombre} x ${cant.toFixed(2)} kg - $${formateaPrecio(subtotal)}%0A`;
  });
  mensaje += `%0ATotal: $${formateaPrecio(total)}`;

  const numero = '3482332865'; 
  const url = `https://wa.me/54${numero}?text=${encodeURIComponent(decodeURIComponent(mensaje))}`;
  window.open(url, '_blank');
}

function filtrarProductos(text){
  const t = text.trim().toLowerCase();
  if(!t) return productos;
  return productos.filter(p => p.nombre.toLowerCase().includes(t));
}

document.addEventListener('DOMContentLoaded', () => {
  cargarCarrito();
  renderProductos(productos); 
  actualizarCarrito();


  buscador.addEventListener('input', (e) => {
    const filtrados = filtrarProductos(e.target.value);
    renderProductos(filtrados);

    Object.keys(carrito).forEach(id => {
      const el = document.getElementById(`cant-${id}`);
      if(el) el.innerText = carrito[id].toFixed(2);
    });
  });

  botonEnviar.addEventListener('click', enviarPedidoWhatsApp);

  if(whatsappFloat){
    whatsappFloat.addEventListener('click', (e) => {
    });
  }
});
