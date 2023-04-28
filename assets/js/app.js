let packs = [];
const pack1 = new Pack(1, "Pack basico", "2 bases alcohólicas a elección (de segunda marca), con la posibilidad de hacer 4 tragos distintos", 10000, "Pack1.jpg");
const pack2 = new Pack(2, "Pack intermedio", "4 bases alcohólicas a elección (de primera marca), con la posibilidad de hacer 8 tragos distintos", 25000, "Pack2.jpg");
const pack3 = new Pack(3, "Pack completo", "la cantidad de bases alcohólicas que quiera el contratador y a varidad de tragos que quiera(de primera marca)", 50000, "Pack3.jpg");

if (localStorage.getItem("packs")){ // si hay en el localstorage packs los traigo
    packs = JSON.parse(localStorage.getItem("packs"));
    
}else{ // si no hay los creo por primera vez
    packs.push(pack1, pack2, pack3);
    localStorage.setItem("packs", JSON.stringify(packs));
}
let productosEnCarrito = JSON.parse(localStorage.getItem("carrito")) || []; 
let divProductos = document.getElementById("productos")

function mostratCatalogo(array){ // funcion para crear las cards de cada producto
    divProductos.innerHTML = ""
    for(let pack of array){
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
}
// uso la funcion para mostrar los productos
mostratCatalogo(packs)