let packs = [];
// traigo los objetos del json
const traerObjetos = async()=>{
    const response = await fetch("./../packs.json")
    const data = await response.json()
    packs = data
    mostratCatalogo()
}

traerObjetos()

let productosEnCarrito = JSON.parse(localStorage.getItem("carrito")) || []; 
// Capturas del dom
let divProductos = document.getElementById("productos")
let modalBodyCarrito = document.getElementById("modal-bodyCarrito");
let botonCarrito = document.getElementById("botonCarrito");
let botonFinalizarCompra = document.getElementById("botonFinalizarCompra");
let divPrecioTotal = document.getElementById("precioTotal");


function mostratCatalogo(){ // funcion para crear las cards de cada producto
    divProductos.innerHTML = ""
    for(let pack of packs){
        let nuevoPack = document.createElement("div")
        nuevoPack.classList.add("col-12", "col-md-6", "col-lg-4", "mb-3")
        nuevoPack.innerHTML = `
                        <div id=${pack.id} class="card border-dark""
                            <div class="card border-dark">
                            <img src="./../assets/images/${pack.imagen}"height="200px" alt="Bebidas alcohólicas" class="card-img-top"/>
                            <div class="card-body">
                                <h5 class="card-title">${pack.nombre}</h5>
                                <p class="card-text">${pack.descripcion}</p>
                                <p class="card-text"><strong>$${pack.precio}</strong></p>
                                <button id="agregarBtn${pack.id}" class="btn btn-outline-info">
                                Contratar Pack
                                </button>
                            </div>
                            </div>
    </div>`

        divProductos.appendChild(nuevoPack)
        let btnAgregar = document.getElementById(`agregarBtn${pack.id}`); // evento para agregar producto al carrito del storage
        btnAgregar.addEventListener("click", ()=>{
                agregarAlCarrito(pack);
            })
            
    }; 

}
// funcion para agregar al carrito
function agregarAlCarrito(pack){
    productosEnCarrito.push(pack)
    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))

    Toastify({
        text: "Producto agregado al carrito",
        duration: 1500,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: false,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        offset: {
            y: "5rem"
            }, 
        style: {
          background: "linear-gradient(to right, #1c68da, #728aad)",
          color: "black",
          borderRadius: "2rem"
        },
        onClick: function(){} // Callback after click
      }).showToast();
}
// me muestra el precio total del carrito si hay items y sino me dice que no hay productos en carrito
function compraTotal(array){
    let acumulador = 0;
    acumulador = array.reduce((acumula, productoCarrito)=> acumula + productoCarrito.precio, 0)
    acumulador == 0 ? divPrecioTotal.innerHTML = `<p>No hay productos en el carrito</p>` : divPrecioTotal.innerHTML = `<p>El total de el carrito es:$<strong>${acumulador}</strong></p>`;
}
// funcion para mostrar los productos en el model
function CargarProductosCarrito(array){
    modalBodyCarrito.innerHTML = ""
    array.forEach((productoCarrito) => {
        modalBodyCarrito.innerHTML += `
                    <div class="card border mb-3" id ="productoCarrito${productoCarrito.id}" style="max-width: 540px;">
                        <img class="card-img-top" height="250px" src="./../assets/images/${productoCarrito.imagen}" alt="Bebidas alcohólicas">
                        <div class="card-body">
                                <h4 class="card-title">${productoCarrito.nombre}</h4>
                            
                                <p class="card-text">$${productoCarrito.precio}</p> 
                                <button class= "btn btn-danger" id="botonEliminar${productoCarrito.id}"><i class="fas fa-trash-alt"></i></button>
                        </div>    
                    </div>
        `
    })
    array.forEach((productoCarrito, indice)=>{ // elimino el producto del carrito
        document.getElementById(`botonEliminar${productoCarrito.id}`).addEventListener("click", ()=>{
            let CardDeProducto = document.getElementById(`productoCarrito${productoCarrito.id}`)
            CardDeProducto.remove()

            productosEnCarrito.splice(indice, 1)

            localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));
            compraTotal(array);
        })
    })
    compraTotal(array);
}
// evento para que al apretar en el boton del carrito se generen los productos agregados
botonCarrito.addEventListener("click", ()=>{
    CargarProductosCarrito(productosEnCarrito)
})
// sweet alerts para los procesos de finalizacion de compra
function finalizarCompra(){
    Swal.fire({
        title: '¿Seguro queres realizar la compra?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Sí, seguro',
        cancelButtonText: 'No, no quiero',
        confirmButtonColor: 'green',
        cancelButtonColor: 'red',
    }).then((result)=>{
        if(result.isConfirmed){
            Swal.fire({
            title: 'Compra realizada con exito',
            icon: 'success',
            confirmButtonColor: 'green',
            text: `En breve nos pondremos en contacto via mail para decirte los pasos a seguir. !Gracias por confiar en nosotros! `,
            
            })
            productosEnCarrito =[]
            localStorage.removeItem("carrito")
        }else{
            //Va a entrar cuando ponga
            Swal.fire({
                title: 'Compra cancelada',
                icon: 'info',
                text: `La compra no ha sido realizada. Sus productos siguen en el carrito.`,
                confirmButtonColor: 'green',
                timer:3500
            })
        }
    })
}


botonFinalizarCompra.addEventListener("click", ()=>{
    finalizarCompra()
})