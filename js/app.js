//variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

//Listeners
//cargaEventListeners();

(function cargaEventListeners() {
  cursos.addEventListener('click', comprarCurso);
  carrito.addEventListener('click', eliminarCurso);
  vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
  document.addEventListener('DOMContentLoaded', leerLocalStorage);
})();

//Funciones

function comprarCurso(e) {
  e.preventDefault();

  if (e.target.classList.contains('agregar-carrito')) {
    const curso = e.target.parentElement.parentElement;

    leerDatosCurso(curso);
  }
}

function leerDatosCurso(curso) {
  let arregloBorrar = document.querySelectorAll('.borrar-curso');
  let copiaCursos = [];
  arregloBorrar.forEach((item) => copiaCursos.push(item.id));

  const infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
  };

  if (copiaCursos.filter((numId) => numId == infoCurso.id).length == 0) {
    insertarCurso(infoCurso);
    guardarCursoLocalStorage(infoCurso);
  } else {
    console.log('curso ya agregado');
  }
}

function insertarCurso(curso) {
  const row = document.createElement('tr');

  row.innerHTML = `
    <td>
        <img src=${curso.imagen} width=100px >
    </td>
    <td>${curso.titulo}</td>
    <td>${curso.precio}</td>
    <td>
        <a href="#" class="borrar-curso" id="${curso.id}">X</a>
    </td>`;

  listaCursos.appendChild(row);
  console.log(`curso agregado numero ${curso.id}`);
}

function eliminarCurso(e) {
  e.preventDefault();

  let curso, cursoId;

  if (e.target.classList.contains('borrar-curso')) {
    curso = e.target.parentElement.parentElement;
    cursoId = curso.querySelector('a').getAttribute('id');
    e.target.parentElement.parentElement.remove();
  }

  eliminarCursoLocalStorage(cursoId);
}

function vaciarCarrito() {
  while (listaCursos.firstChild) {
    listaCursos.removeChild(listaCursos.firstChild);
  }

  localStorage.clear();
}

function guardarCursoLocalStorage(curso) {
  let cursos = obtenerCursosLocalStorage();

  cursos.push(curso);

  localStorage.setItem('cursos', JSON.stringify(cursos));
}

function obtenerCursosLocalStorage() {
  let cursosLS;

  if (localStorage.getItem('cursos') === null) {
    cursosLS = [];
  } else {
    cursosLS = JSON.parse(localStorage.getItem('cursos'));
  }

  return cursosLS;
}

function leerLocalStorage() {
  let cursosLS = obtenerCursosLocalStorage();

  console.log(cursosLS);

  if (cursosLS != []) {
    cursosLS.forEach((item) => insertarCurso(item));
  }
}

function eliminarCursoLocalStorage(cursoId) {
  let cursoLs = obtenerCursosLocalStorage();

  cursoLs.forEach((item, index) => {
    if (item.id === cursoId) {
      console.log(cursoLs);
      cursoLs.splice(index, 1);
    }
  });

  localStorage.setItem('cursos', JSON.stringify(cursoLs));
}
