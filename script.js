// 1. Cambiar entre modo claro y oscuro
const botonesTema = document.querySelectorAll('[data-theme-toggle]');

function cambiarTema() {
  const oscuro = document.documentElement.classList.toggle('dark');
  for (const boton of botonesTema) {
    boton.setAttribute('aria-pressed', oscuro);
  }
}

for (const boton of botonesTema) {
  boton.addEventListener('click', cambiarTema);
}

// 2. Abrir y cerrar el menú móvil
const menu = document.querySelector('#mobile-menu');
const botonAbrir = document.querySelector('#menu-open');
const botonCerrar = document.querySelector('#menu-close');

botonAbrir.addEventListener('click', function () {
  menu.showModal();
  document.body.classList.add('menu-open');
  botonAbrir.setAttribute('aria-expanded', 'true');
});

botonCerrar.addEventListener('click', function () {
  menu.close();
});

menu.addEventListener('close', function () {
  document.body.classList.remove('menu-open');
  botonAbrir.setAttribute('aria-expanded', 'false');
});

for (const enlace of menu.querySelectorAll('a')) {
  enlace.addEventListener('click', function (evento) {
    evento.preventDefault();
    menu.close();
    const seccion = document.querySelector(enlace.hash);
    seccion.querySelector('h2').focus({ preventScroll: true });
    seccion.scrollIntoView();
  });
}

window.matchMedia('(min-width: 1024px)').addEventListener('change', function (evento) {
  if (evento.matches) {
    menu.close();
  }
});

// 3. Mostrar los productos de la categoría elegida
const filtros = document.querySelectorAll('[data-filter]');
const productos = document.querySelectorAll('[data-product]');
const contador = document.querySelector('#product-count');

for (const boton of filtros) {
  boton.addEventListener('click', function () {
    const categoria = boton.dataset.filter;
    let visibles = 0;

    for (const producto of productos) {
      if (categoria === 'todo' || producto.dataset.category === categoria) {
        producto.hidden = false;
        visibles = visibles + 1;
      } else {
        producto.hidden = true;
      }
    }

    for (const filtro of filtros) {
      filtro.setAttribute('aria-pressed', filtro === boton);
    }
    contador.textContent = 'Mostrando ' + visibles + ' productos';
  });
}

// 4. Iniciar Splide, la librería del carrusel
if (typeof Splide !== 'undefined') {
  new Splide('#season-carousel', {
    type: 'loop',
    perPage: 1,
    perMove: 1,
    gap: '1.5rem',
    speed: 280,
    pagination: false,
    autoplay: false,
    keyboard: 'focused',
    mediaQuery: 'min',
    breakpoints: {
      640: { perPage: 2 },
      1024: { perPage: 3 }
    },
    i18n: {
      prev: 'Especialidad anterior',
      next: 'Especialidad siguiente',
      first: 'Primera especialidad',
      last: 'Última especialidad',
      carousel: 'carrusel',
      slide: 'especialidad',
      slideLabel: '%s de %s'
    }
  }).mount();
}
