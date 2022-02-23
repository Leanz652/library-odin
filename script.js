
const mostrarCrearLibro = document.getElementById("openCreateBook");
const aceptarCrearLibro = document.getElementById("createBook");
const overlay = document.querySelector(".overlay");
const menuCreacion = document.querySelector(".modal_addbook");
const formLibro = document.querySelector(".creacionLibro");
const cerrarCrearLibro = document.getElementById("closeBook");
let codigo = 0;


let myLibrary = [];

mostrarCrearLibro.addEventListener( "click",() => {
    mostrarMenuCreacion();
})


cerrarCrearLibro.addEventListener ("click", () => {
    apagarMenuCreacion()
    apagarOverlay()
})
aceptarCrearLibro.addEventListener( 'click', () => {
    let titulo = formLibro["GET-TITTLE"].value;
    let autor = formLibro["GET-AUTHOR"].value;
    let paginas = formLibro["GET-PAGES"].value;
    let libro = new Libro(titulo,autor,paginas,codigo); 
    let pos = myLibrary.length;
    agregarLibroATabla(libro, codigo);
    formLibro.reset();
    apagarMenuCreacion()
    apagarOverlay ()

})


function apagarOverlay () {
    overlay.classList.add("hidden");
    overlay.classList.remove("active");  
};

function prenderOverlay() {
overlay.classList.remove("hidden");
overlay.classList.add("active");

}

function agregarLibroATabla(libro) {
    codigo = codigo +1;
    myLibrary.push(libro);
    var table = document.getElementById("tablaLibros");
    var row = table.insertRow()
    row.dataset.codigo = libro.codigo;
    var cell = row.insertCell();
    cell.innerHTML = libro.titulo;
    cell = row.insertCell();
    cell.innerHTML = libro.autor;
    cell = row.insertCell();
    cell.innerHTML = libro.paginas;
    cell = row.insertCell();

    const botonBorrar = document.createElement("button");
    botonBorrar.type = 'button';
    botonBorrar.innerText = "x";
    botonBorrar.dataset.codigo = libro.codigo;
    botonBorrar.classList.add('remove');


    botonBorrar.addEventListener("click", () => {
        removerLibro(botonBorrar.dataset.codigo)
    })

    cell.appendChild(botonBorrar);
}


function removerLibro(codigoDeLibro) {
    const libroABorrar = document.querySelector(`[data-codigo="${codigoDeLibro}"]`)
    libroABorrar.parentElement.removeChild(libroABorrar);
    myLibrary = myLibrary.filter( libro => libro.codigo != codigoDeLibro);

}

function prenderMenuCreacion() {
    menuCreacion.classList.remove("hidden");
    menuCreacion.classList.add("active");}


function apagarMenuCreacion() {
    menuCreacion.classList.remove("active");
    menuCreacion.classList.add("hidden");
}   

function mostrarMenuCreacion() {
    prenderOverlay();
    prenderMenuCreacion();
}

function Libro(titulo,autor,paginas,codigo) {
    this.titulo = titulo
    this.autor = autor
    this.paginas = paginas
    this.codigo = codigo
}

agregarLibroATabla(new Libro("Harry Potter","J.K Rowling",300));