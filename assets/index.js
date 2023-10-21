// Btn para abrir y cerrar menu
const menuBtn = document.querySelector(".menu__label");
// Menu (Hamburguesa)
const barsMenu = document.querySelector(".navbar__list");

console.log(menuBtn, barsMenu);

const toggleMenu = () => {
  barsMenu.classList.toggle("open-menu");
};

//Funcion init
const init = () => {
  menuBtn.addEventListener("click", toggleMenu);
};

init();
