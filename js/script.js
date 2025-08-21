
const productosContainer = document.getElementById("productos-container");
const carritoList       = document.getElementById("carrito-list");
const totalElement      = document.getElementById("total");
const buscador          = document.getElementById("searchInput");
const btnVaciar         = document.getElementById("vaciarCarrito");
const carritoContainer  = document.getElementById("carrito-container");
const btnVerCarrito     = document.getElementById("verCarrito");
const carritoCount      = document.getElementById("carrito-count");
const btnEnviarPedido   = document.getElementById("enviarPedido");

let productos = [];
let carrito   = []; 

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1600,
  timerProgressBar: true
});

async function cargarProductos() {
  try {
    const res = await fetch("js/data/productos.json");
    if (!res.ok) throw new Error("No se pudo cargar productos.json");
    productos = await res.json();
    renderizarProductos(productos);
  } catch (err) {
    console.error(err);
    Swal.fire("Error", "No se pudieron cargar los productos", "error");
  }
}

function renderizarProductos(lista) {
  productosContainer.innerHTML = "";

  lista.forEach((producto) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p class="price">$${producto.precio}</p>

      <div class="cantidad-control">
        <button class="btn-restar">−</button>
        <span class="cantidad">1</span>
        <button class="btn-sumar">+</button>
      </div>

      <button class="btn-agregar">Agregar al carrito</button>
    `;

    let cantidad = 1;
    const spanCantidad = card.querySelector(".cantidad");
    card.querySelector(".btn-sumar").addEventListener("click", () => {
      cantidad++;
      spanCantidad.textContent = cantidad;
    });
    card.querySelector(".btn-restar").addEventListener("click", () => {
      if (cantidad > 1) {
        cantidad--;
        spanCantidad.textContent = cantidad;
      }
    });

    card.querySelector(".btn-agregar").addEventListener("click", () => {
      agregarAlCarrito(producto, cantidad);
    });

    productosContainer.appendChild(card);
  });
}

function agregarAlCarrito(producto, cantidad) {
  const existente = carrito.find((p) => p.id === producto.id);
  if (existente) {
    existente.cantidad += cantidad;
  } else {
    carrito.push({ ...producto, cantidad });
  }
  renderizarCarrito();
  Toast.fire({ icon: "success", title: "Agregado al carrito" });
}

function renderizarCarrito() {
  carritoList.innerHTML = "";

  carrito.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.nombre} x${item.cantidad}</span>
      <span>$${(item.precio * item.cantidad).toFixed(2)}</span>
      <button class="btn-eliminar">❌</button>
    `;
    li.querySelector(".btn-eliminar").addEventListener("click", () => {
      eliminarDelCarrito(item.id);
    });
    carritoList.appendChild(li);
  });

  const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  totalElement.textContent = `Total: $${total.toFixed(2)}`;

  const totalItems = carrito.reduce((acc, p) => acc + p.cantidad, 0);
  carritoCount.textContent = totalItems;
}

function eliminarDelCarrito(id) {
  carrito = carrito.filter((item) => item.id !== id);
  renderizarCarrito();
  Toast.fire({ icon: "info", title: "Producto eliminado" });
}

btnVaciar.addEventListener("click", async () => {
  if (carrito.length === 0) {
    Toast.fire({ icon: "info", title: "El carrito ya está vacío" });
    return;
  }
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
    renderizarCarrito();
    Toast.fire({ icon: "success", title: "Carrito vacío" });
  }
});

btnEnviarPedido.addEventListener("click", () => {
  if (carrito.length === 0) {
    Swal.fire("Carrito vacío", "Agregá productos antes de enviar el pedido", "warning");
    return;
  }
  const detalle = carrito
    .map(i => `${i.nombre} x${i.cantidad} — $${(i.precio * i.cantidad).toFixed(2)}`)
    .join("<br>");

  Swal.fire({
    title: "Pedido enviado ✅",
    html: detalle,
    icon: "success"
  });

  carrito = [];
  renderizarCarrito();
});

buscador.addEventListener("input", (e) => {
  const texto = e.target.value.toLowerCase().trim();
  const filtrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(texto)
  );
  renderizarProductos(filtrados);
});

btnVerCarrito.addEventListener("click", () => {
  carritoContainer.classList.toggle("hidden");
});

cargarProductos();
renderizarCarrito();
