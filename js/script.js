// ---------- Referencias del DOM ----------
const productosContainer = document.getElementById("productos-container");
const carritoList       = document.getElementById("carrito-list");
const totalElement      = document.getElementById("total");
const buscador          = document.getElementById("searchInput");
const btnVaciar         = document.getElementById("vaciarCarrito");
const carritoContainer  = document.getElementById("carrito-container");
const btnVerCarrito     = document.getElementById("verCarrito");
const carritoCount      = document.getElementById("carrito-count");

// ---------- Estado ----------
let productos = [];
let carrito   = JSON.parse(localStorage.getItem("carrito")) || [];

// ---------- Toast SweetAlert2 ----------
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1600,
  timerProgressBar: true
});

// ---------- Cargar productos con fetch ----------
async function cargarProductos() {
  try {
    // Ruta relativa al index.html -> tu JSON está en js/data/
    const res = await fetch("js/data/productos.json");
    if (!res.ok) throw new Error("No se pudo cargar productos.json");
    productos = await res.json();
    renderizarProductos(productos);
  } catch (err) {
    console.error(err);
    Swal.fire("Error", "No se pudieron cargar los productos", "error");
  }
}

// ---------- Renderizar catálogo ----------
function renderizarProductos(lista) {
  productosContainer.innerHTML = "";

  lista.forEach((producto) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>$${producto.precio}</p>
      <div class="cantidad-control">
        <button class="btn-restar">-</button>
        <span class="cantidad">1</span>
        <button class="btn-sumar">+</button>
      </div>
      <button class="btn-agregar">Agregar al carrito</button>
    `;

    // Manejo de cantidad
    let cantidad = 1;
    const spanCantidad = card.querySelector(".cantidad");
    card.querySelector(".btn-sumar").addEventListener("click", () => {
      cantidad++; spanCantidad.textContent = cantidad;
    });
    card.querySelector(".btn-restar").addEventListener("click", () => {
      if (cantidad > 1) { cantidad--; spanCantidad.textContent = cantidad; }
    });

    // Agregar al carrito
    card.querySelector(".btn-agregar").addEventListener("click", () => {
      agregarAlCarrito(producto, cantidad);
    });

    productosContainer.appendChild(card);
  });
}

// ---------- Carrito ----------
function agregarAlCarrito(producto, cantidad) {
  const existente = carrito.find((p) => p.id === producto.id);
  if (existente) {
    existente.cantidad += cantidad;
  } else {
    carrito.push({ ...producto, cantidad });
  }
  guardarCarrito();
  renderizarCarrito();

  Toast.fire({ icon: "success", title: "Agregado al carrito" });
}

function renderizarCarrito() {
  carritoList.innerHTML = "";

  carrito.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.nombre} x${item.cantidad}</span>
      <span>$${item.precio * item.cantidad}</span>
      <button class="btn-eliminar">❌</button>
    `;
    li.querySelector(".btn-eliminar").addEventListener("click", () => {
      eliminarDelCarrito(item.id);
    });
    carritoList.appendChild(li);
  });

  const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  totalElement.textContent = `Total: $${total}`;

  const totalItems = carrito.reduce((acc, p) => acc + p.cantidad, 0);
  carritoCount.textContent = totalItems;
}

function eliminarDelCarrito(id) {
  carrito = carrito.filter((item) => item.id !== id);
  guardarCarrito();
  renderizarCarrito();
  Toast.fire({ icon: "info", title: "Producto eliminado" });
}

btnVaciar.addEventListener("click", async () => {
  const { isConfirmed } = await Swal.fire({
    title: "Vaciar carrito",
    text: "¿Seguro que querés eliminar todos los productos?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, vaciar",
    cancelButtonText: "Cancelar"
  });
  if (isConfirmed) {
    carrito = [];
    guardarCarrito();
    renderizarCarrito();
    Toast.fire({ icon: "success", title: "Carrito vacío" });
  }
});

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// ---------- Buscador ----------
buscador.addEventListener("input", (e) => {
  const texto = e.target.value.toLowerCase();
  const filtrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(texto)
  );
  renderizarProductos(filtrados);
});

// ---------- Mostrar / ocultar carrito ----------
btnVerCarrito.addEventListener("click", () => {
  carritoContainer.classList.toggle("hidden");
});

// ---------- Inicialización ----------
cargarProductos();
renderizarCarrito();
