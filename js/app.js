//* VARIABLES
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const btnVaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let carritoCursos = [];
let notificacion = 0;


// * EVENTOS
document.addEventListener('DOMContentLoaded', () => {

  listaCursos.addEventListener('click', agregarCurso);

  carrito.addEventListener('click', eliminarCurso);

  //* Vacia el carrito
  btnVaciarCarrito.addEventListener('click', () => {
    carritoCursos = [];

    limpiarCarritoHTML();

    mostrarCarritoHTML();

    mostrarNotificacion();
  });

  // Obtine los datos de local storage
  carritoCursos = JSON.parse(localStorage.getItem('carrito')) || [];

  mostrarCarritoHTML();
  mostrarNotificacion();
});


//* FUNCIONES

// * Agrega un curso al carrito
const agregarCurso = (event) => {
  event.preventDefault();

  if (event.target.classList.contains('agregar-carrito')) {

    const cursoHTML = event.target.parentElement.parentElement;

    const cursoObj = obtenerDatosCursos(cursoHTML);

    const existe = existeCursoEnCarritoCursos(cursoObj);

    (existe)
      ? aumentcarCantidadCurso(cursoObj)
      : agregarCursoCarrito(cursoObj);

    mostrarCarritoHTML();

    mostrarNotificacion();

    // Sincroniza con el local storage
    sincronizarStorage();
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

//* Agrega un curso al carrito
const agregarCursoCarrito = (cursoObj) => {
  carritoCursos = [cursoObj, ...carritoCursos];
}

//* Aumenta la cantidad de un curso ya existente en el carrito
const aumentcarCantidadCurso = (cursoObj) => {
  carritoCursos = carritoCursos.map(curso => {
    if (curso.id === cursoObj.id) {
      curso.cantidad++;
    };
    return curso;
  });
};

//* Muestra el carrito de cursos en el html
const mostrarCarritoHTML = () => {

  //* Limpiamos el html previo
  limpiarCarritoHTML();

  carritoCursos.forEach(curso => {
    const { imagen, titulo, precio, id, cantidad } = curso;

    const row = document.createElement('tr');
    row.innerHTML = `
    <td><img src="${imagen}" width="150"/></td>
    <td>${titulo}</td>
    <td>${precio}</td>
    <td>${cantidad}</td>
    <td>
    <a class="borrar-curso" data-id="${id}"> X </a>
    </td>
    `;

    contenedorCarrito.appendChild(row);
  });
};

// * Limpia el carrito HTML
const limpiarCarritoHTML = () => {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.firstChild.remove();
  }
};

//* Elimina un curso del carrito
const eliminarCurso = (event) => {
  event.preventDefault();

  if (event.target.classList.contains('borrar-curso')) {
    const cursoID = event.target.getAttribute('data-id');

    carritoCursos = carritoCursos.filter(curso => curso.id != cursoID);

    mostrarCarritoHTML();

    mostrarNotificacion();

    sincronizarStorage();
  }
};

//* Muestra las notificaciones del carrito
const mostrarNotificacion = () => {

  notificacion = carritoCursos.length;

  const existeNotificacion = document.querySelector('.notificacion');

  if (existeNotificacion) {
    document.querySelector('.notificacion').remove();
  }

  if (notificacion > 0) {
    const notificacionHTML = document.createElement('p');
    notificacionHTML.textContent = notificacion;
    notificacionHTML.classList.add('notificacion', 'notificacion-activo');

    document.querySelector('.submenu').appendChild(notificacionHTML);
  }
};



// * Sincroniza con el localStorage
const sincronizarStorage = () => {
  localStorage.setItem('carrito', JSON.stringify(carritoCursos));
};