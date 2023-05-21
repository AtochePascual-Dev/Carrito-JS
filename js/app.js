//* VARIABLES
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const btnVaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
const carritoCursos = [];


// * EVENTOS
document.addEventListener('DOMContentLoaded', () => {
  listaCursos.addEventListener('click', agregarCurso);
});


//* FUNCIONES

// * Agrega un curso al carrito
const agregarCurso = (event) => {
  event.preventDefault();

  if (event.target.classList.contains('agregar-carrito')) {

    const cursoHTML = event.target.parentElement.parentElement;

    const cursoObj = obtenerDatosCursos(cursoHTML);

    const existe = existeCursoEnCarritoCursos(cursoObj);

  }
}

//* Obtiene los datos del curso seleccionado
const obtenerDatosCursos = (cursoHTML) => {
  const objetoCurso = {
    imagen: cursoHTML.querySelector('img').src,
    titulo: cursoHTML.querySelector('h4').textContent,
    precio: cursoHTML.querySelector('.precio span').textContent,
    id: cursoHTML.querySelector('a').getAttribute('data-id'),
    cantidad: 1,
  };
  return objetoCurso;
};

//* Verifica si ya existe el curso en el carrito de cursos
const existeCursoEnCarritoCursos = (cursoObj) => {
  return carritoCursos.some(curso => curso.id === cursoObj.id);
};