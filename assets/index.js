// Btn para abrir y cerrar menu
const menuBtn = document.querySelector(".menu__label");
// Menu (Hamburguesa)
const barsMenu = document.querySelector(".navbar__list");
// Btn de favoritos
const favBtn = document.querySelector(".fav-label");
// Favoritos div
const favMenu = document.querySelector(".fav");
// Contenedor de favoritos
const reportsFav = document.querySelector(".fav__container");
// Contenedor de noticias
const reportsContainer = document.querySelector(".news__container");

// ----- FAVORITOS -----
//Setear fav
let favoritos = [];

//Fc template de la noticia en favoritos
const createFavNoticiaTemplate = (favReport) => {
  const { img, title, date } = favReport;

  return `
            <div class="fav-item">
              <img src="${img}" alt="${title}" />
              <div class="item__info">
                <h3>"${title}"</h3>
                <p>"${date}"</p>
                <button class="more__btn">Leer más</button>
              </div>
            </div>
            <div class="divider"></div>`;
};

// Render Fav
const renderFav = () => {
  if (!favoritos.length) {
    reportsFav.innerHTML = `<p class="empty-msg">No tienes noticias en favoritos</p>`;
    return;
  }
  reportsFav.innerHTML = favoritos.map(createFavNoticiaTemplate).join("");
};

//Logica favoritos
const addReport = (e) => {
  if (!e.target.classList.contains("fav__btn")) return;
  const noticia = e.target.dataset;

  if (isExistingFavNoticia(noticia)) {
    alert("Esta noticia ya está en tus favoritos.");
    return;
  }
  createFavNoticia(noticia);

  renderFav();
  console.log(favoritos);
};

//Fc crear objetos con info de la noticia para agregar a favoritos
const createFavNoticia = (noticia) => {
  favoritos = [...favoritos, { ...noticia, quantity: 1 }];
};

//Comprobar si la noticia existe en favoritos
const isExistingFavNoticia = (noticia) => {
  return favoritos.find((item) => item.id === noticia.id);
};

// ------ MENUES -----
//Fc menu hamburguesa
const toggleMenu = () => {
  barsMenu.classList.toggle("open-menu");

  if (favMenu.classList.contains("open-fav")) {
    favMenu.classList.remove("open-fav");
    return;
  }
};

//Fc fav div
const toggleFav = () => {
  favMenu.classList.toggle("open-fav");

  if (barsMenu.classList.contains("open-menu")) {
    barsMenu.classList.remove("open-menu");
    return;
  }
};

//Fc para cerrar menues cuando scrolleamos
const closeOnScroll = () => {
  if (
    !barsMenu.classList.contains("open-menu") &&
    !favMenu.classList.contains("open-fav")
  ) {
    return;
  }

  barsMenu.classList.remove("open-menu");
  favMenu.classList.remove("open-fav");
};

// ----- SECCION DE NOTICIAS -----
// Fc html template
const createReportTemplate = (report) => {
  const { id, title, date, synopsis, cardImg } = report;
  return `<div class="new">
  <img
    src="${cardImg}"
    alt="${title}"
  />
  
  <div class="new__info">
    <div class="new-top">
      <p>${date}</p>
      <h3>${title}</h3>
    </div>
    <div class="new-mid">
      <p>${synopsis}</p>
    </div>
    <div class="new-bot">
      <button class="more__btn">Leer más</button>
      <i
        class="fa-regular fa-bookmark fav__btn"

        data-id = '${id}'
        data-title = '${title}'
        data-img = '${cardImg}'
        data-date = '${date}'
        style="color: #000000"
      ></i>
    </div>
  </div>
  </div>`;
};

// Fc para renderizar noticias
const renderReports = (reportsList) => {
  reportsContainer.innerHTML += reportsList.map(createReportTemplate).join("");
};

//Funcion init
const init = () => {
  menuBtn.addEventListener("click", toggleMenu);
  favBtn.addEventListener("click", toggleFav);
  window.addEventListener("scroll", closeOnScroll);

  renderReports(reportsData);

  reportsContainer.addEventListener("click", addReport);
  document.addEventListener("DOMContentLoaded", renderFav);
};

init();
