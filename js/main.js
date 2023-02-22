const cafeteria = document.getElementById("cafeteria");
const click_carrito = document.getElementById("click_carrito");
const cafes_en_el_carrito = document.getElementById("cafes_en_el_carrito");
const cantidad_de_cafes = document.getElementById("cantidad-de-cafes");

let carrito = JSON.parse(localStorage.getItem("guardar")) || [];   /* Local Storage ----> Get Item */


/* Asincronia y Promesa */

const menuEnJson = async () => {
    const response = await fetch("./js/menu.json");
    const data = await response.json();


/* Recorriendo el Menu con Each */

    data.forEach((menu_cafe) => {
        let div_menu = document.createElement("div");
        div_menu.innerHTML = `
        <img src= "${menu_cafe.img}">
        <h3>${menu_cafe.nombre}</h3>
        <p>${menu_cafe.precio} $</p>`;

        cafeteria.append(div_menu);


/* Boton de Compra */

        let comprar = document.createElement("button");
        comprar.innerText = "Comprar";

        div_menu.append(comprar);


/* Evento para el Boton */

        comprar.addEventListener("click", () => {

            const agregarElMismoProducto = carrito.some((repetirProducto) => repetirProducto.id === menu_cafe.id);

            if (agregarElMismoProducto) {
                carrito.map((coffee) => {
                    if (coffee.id === menu_cafe.id) {
                        coffee.cantidad++;  //----> Agregando 2 o mas veces el mismo cafe al carrito
                    }
                });

            } else {

                carrito.push({
                    id: menu_cafe.id,
                    img: menu_cafe.img,
                    nombre: menu_cafe.nombre,
                    precio: menu_cafe.precio,
                    cantidad: menu_cafe.cantidad,
                });
            }
            carritoNumero();  // ----> Funcion de numero de cantidad en el carrito
            guardarLocalStorage();  // ---> Funcion Local Storage
        });
    });
};

menuEnJson();


/* Local Storage ----> Set Item */

const guardarLocalStorage = () => {
    localStorage.setItem("guardar", JSON.stringify(carrito));
};







