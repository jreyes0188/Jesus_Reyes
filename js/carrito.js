/* Dentro del Carrito */

/* Titulo dentro del Carrito */

const verCarrito = () => {
    cafes_en_el_carrito.innerHTML = "";
    cafes_en_el_carrito.style.display = "flex";
    const carritoTitulo = document.createElement("div");
    carritoTitulo.className = "carritoTitulo";
    carritoTitulo.innerHTML = `
    <h1 class="carritoTitulo_h1">Carrito</h1>`;
    cafes_en_el_carrito.append(carritoTitulo);


/* Boton X para salir del Carrito */

    const buttonSalir = document.createElement("h1");
    buttonSalir.innerText = "X";
    buttonSalir.className = "buttonSalir_X";
    buttonSalir.addEventListener("click", () => {
        cafes_en_el_carrito.style.display = "none";
    });
    carritoTitulo.append(buttonSalir);


/* Productos que se agregan al carrito */

    carrito.forEach((menu_cafe) => {
        let carritoBody = document.createElement("div");
        carritoBody.className = "carrito-body";
        carritoBody.innerHTML = `
        <img src ="${menu_cafe.img}">
        <h3>${menu_cafe.nombre}</h3>
        <p>${menu_cafe.precio} $</p>
        <span class = "menos"> - </span>
        <p>Cantidad: ${menu_cafe.cantidad}</p>
        <span class = "mas"> + </span>
        <span class = "eliminar"> ✖ </span>
        <p>Total: ${menu_cafe.cantidad * menu_cafe.precio} $</p>
    `;
        cafes_en_el_carrito.append(carritoBody);


/* Boton - (restar productos) */

        let restar = carritoBody.querySelector(".menos");
        restar.addEventListener("click", () => {
            if (menu_cafe.cantidad !== 1) {
                menu_cafe.cantidad--;
            }
            guardarLocalStorage();
            verCarrito();
        });


/* Boton + (agregar productos) */

        let sumar = carritoBody.querySelector(".mas");
        sumar.addEventListener("click", () => {
            menu_cafe.cantidad++;
            guardarLocalStorage();
            verCarrito();
        });


/* Creando boton para eliminar la fila de los productos */

        let eliminar = carritoBody.querySelector(".eliminar");
        eliminar.addEventListener("click", ()=>{
            eliminarcafe(menu_cafe.id);
        });
    });


/* Total a pagar */

    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
    const totalFinal = document.createElement("div");
    totalFinal.className = "total_Final"
    totalFinal.innerText = `Total a pagar es: ${total} $`;

    cafes_en_el_carrito.append(totalFinal);


/* Confirmar Pago Total con Sweet Alert 2 */

    const finalizarPago = document.createElement("button")
    finalizarPago.innerText = "Pagar";

    finalizarPago.addEventListener ("click", () => {
        cafes_en_el_carrito.style.display ="none";
        carrito.length = 0;
        carritoNumero();
        guardarLocalStorage();        
    })

    cafes_en_el_carrito.append(finalizarPago);

    finalizarPago.addEventListener("click", () => {
        Swal.fire({
            title: 'Pago Realizado',
            text: 'Gracias por su Compra',
            icon: 'success',
            iconColor: `green`,
            confirmButtonText: 'Aceptar',
        });
    })
};

click_carrito.addEventListener("click", verCarrito);


/* Eliminar productos con apoyo del metodo find y filter */

const eliminarcafe = (id) => {
    const buscarID = carrito.find((elemento) => elemento.id === id);

    carrito = carrito.filter((carritoId) => {
        return carritoId !== buscarID;
    });

    carritoNumero();
    guardarLocalStorage();
    verCarrito();
};


/* Numero de Cantidad de productos en el Carrito */

const carritoNumero = () => {
    cantidad_de_cafes.style.display = "block";

    const carritoLength = carrito.length;
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));
    cantidad_de_cafes.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};

carritoNumero();

