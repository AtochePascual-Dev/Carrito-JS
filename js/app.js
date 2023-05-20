//* VARIABLES
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const btnVaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');


// * EVENTOS
document.addEventListener('DOMContentLoaded', () => {
  listaCursos.addEventListener('click', agregarCurso);
});


//* FUNCIONES

// * Agrega un curso al carrito
const agregarCurso = (event) => {
  event.preventDefault();

  if (event.target.classList.contains('agregar-carrito')) {
    const curso = event.target.parentElement.parentElement;
    obtenerDatosCursos(curso);
  }
}

//* Obtiene los datos del curso seleccionado
const obtenerDatosCursos = (curso) => {
  const objetoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
    cantidad: 1,
  };

  console.log(objetoCurso);
};