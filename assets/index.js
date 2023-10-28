// Btn para abrir y cerrar menu
const menuBtn = document.querySelector(".menu__label");
// Menu (Hamburguesa)
const barsMenu = document.querySelector(".navbar__list");
// Contenedor de noticias
const reportsContainer = document.querySelector(".news__container");

//Fc menu hamburguesa
const toggleMenu = () => {
  barsMenu.classList.toggle("open-menu");
};

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
  renderReports(reportsData);
};

init();
