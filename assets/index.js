// Btn para abrir y cerrar menu
const menuBtn = document.querySelector(".menu__label");
// Menu (Hamburguesa)
const barsMenu = document.querySelector(".navbar__list");
// Btn de favoritos
const favBtn = document.querySelector(".fav-label");
// Favoritos div
const favMenu = document.querySelector(".fav");
// Btn eliminar favoritos
const deleteBtn = document.querySelector(".delete__btn");
// Contenedor de favoritos
const reportsFav = document.querySelector(".fav__container");
// Contenedor de noticias
const reportsContainer = document.querySelector(".news__container");
// Formulario de contacto
const formContacto = document.querySelector(".form__container");
// Inputs
const nameInput = document.getElementById("name");
const lastNameInput = document.getElementById("lastName");
const emailInput = document.getElementById("email");
const telInput = document.getElementById("telephone");
const messageInput = document.getElementById("message");

// ----- CONTACTO -----
const message = [];

const saveToLocalStorage = () => {
  localStorage.setItem("message", JSON.stringify(message));
};
//Fc validar input no vacio
const isEmpty = (input) => {
  return !input.value.trim().length;
};

//Fc validar largo de input
const isBetween = (input, min, max) => {
  return input.value.length >= min && input.value.length <= max;
};

//Fc para mostrar el error a validar input
const showError = (input, message) => {
  const formField = input.parentElement;
  formField.classList.add("error");

  const error = formField.querySelector("small");
  error.style.display = "block";
  error.textContent = message;
};

//Fc validacion correcta
const successInput = (input) => {
  const formField = input.parentElement;
  formField.classList.remove("error");

  const error = formField.querySelector("small");
  error.textContent = "";
};

//Fc validar email(regex)
const isEmailValid = (input) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

  return emailRegex.test(input.value.trim());
};

//Fc validar telefono(regex)
const isPhoneValid = (input) => {
  const phoneRegex = /^[0-9]{10}$/;

  return phoneRegex.test(input.value.trim());
};

//Fc mostrar msg formulario enviado
const sendedForm = () => {
  const success = formContacto.querySelector(".formMsg");
  success.style.display = "block";
  success.classList.add("success");
  success.textContent = "Mensaje enviado";
};

//Fc para validar name y lastName
const checkInput = (input) => {
  let valid = false;

  const MIN_CHARACTER = 3;
  const MAX_CHARACTER = 15;

  if (isEmpty(input)) {
    showError(input, "Este campo es obligatorio");
    return;
  }

  if (!isBetween(input, MIN_CHARACTER, MAX_CHARACTER)) {
    showError(
      input,
      `El campo debe tener entre ${MIN_CHARACTER} y ${MAX_CHARACTER} caracteres`
    );
    return;
  }

  successInput(input);
  valid = true;
  return valid;
};

//Fc validar email
const checkEmail = (input) => {
  let valid = false;
  if (isEmpty(input)) {
    showError(input, "Este campo es obligatorio");
    return;
  }

  if (!isEmailValid(input)) {
    showError(input, "Ingrese un mail válido");
    return;
  }

  successInput(input);
  valid = true;
  return valid;
};

//Fc validar telefono
const checkTelephone = (input) => {
  let valid = false;

  if (isEmpty(input)) {
    showError(input, "Este campo es obligatorio");
    return;
  }

  if (!isPhoneValid(input)) {
    showError(input, "El telefono no es valido");
    return;
  }

  successInput(input);
  valid = true;
  return valid;
};

//Fc validar msg
const checkMessage = (input) => {
  let valid = false;

  if (isEmpty(input)) {
    showError(input, "Este campo es obligatorio");
    return;
  }

  successInput(input);
  valid = true;
  return valid;
};

//Fc validar formulario
const validateForm = (e) => {
  e.preventDefault();

  let isNameValid = checkInput(nameInput);
  let isLastNameValid = checkInput(lastNameInput);
  let isEmailValid = checkEmail(emailInput);
  let isPhoneValid = checkTelephone(telInput);
  let isMsgValid = checkMessage(messageInput);

  let isValidForm =
    isNameValid &&
    isLastNameValid &&
    isEmailValid &&
    isPhoneValid &&
    isMsgValid;

  if (isValidForm) {
    message.push({
      name: nameInput.value,
      lastName: lastNameInput.value,
      email: emailInput.value,
      phone: telInput.value,
      message: messageInput.value,
    });
    saveToLocalStorage(message);
    sendedForm();
  }
};

// ----- FAVORITOS -----

//Setear fav (o extraemos los fav del LS)
let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

//Fc guardar favoritos en LS
const saveFav = () => {
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
};

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

  updateFavState();
};

//Fc crear objetos con info de la noticia para agregar a favoritos
const createFavNoticia = (noticia) => {
  favoritos = [...favoritos, { ...noticia, quantity: 1 }];
};

//Comprobar si la noticia existe en favoritos
const isExistingFavNoticia = (noticia) => {
  return favoritos.find((item) => item.id === noticia.id);
};

//Fc para borrar favoritos
const resetFavItems = () => {
  favoritos = [];
  updateFavState();
};

const completeFavAction = (confirmMsg) => {
  if (!favoritos.length) return;

  if (window.confirm(confirmMsg)) {
    resetFavItems();
  }
};

const deleteFav = () => {
  completeFavAction("¿Deseas borrar tus favoritos?");
};

//Fc para habilitar delete btn
const disableBtn = (deleteBtn) => {
  if (!favoritos.length) {
    deleteBtn.classList.add("disabled");
  } else {
    deleteBtn.classList.remove("disabled");
  }
};

//Fc para ejecutar fc de actualidar el estado del fav
const updateFavState = () => {
  saveFav();
  renderFav();
  disableBtn(deleteBtn);
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

// ----- VALIDACION DE CONTACTO -----

//Funcion init
const init = () => {
  menuBtn.addEventListener("click", toggleMenu);
  favBtn.addEventListener("click", toggleFav);
  window.addEventListener("scroll", closeOnScroll);

  renderReports(reportsData);

  reportsContainer.addEventListener("click", addReport);
  document.addEventListener("DOMContentLoaded", renderFav);

  disableBtn(deleteBtn);
  deleteBtn.addEventListener("click", deleteFav);

  nameInput.addEventListener("input", () => checkInput(nameInput));
  lastNameInput.addEventListener("input", () => checkInput(lastNameInput));
  emailInput.addEventListener("input", () => checkEmail(emailInput));
  telInput.addEventListener("input", () => checkTelephone(telInput));
  messageInput.addEventListener("input", () => checkMessage(messageInput));
  formContacto.addEventListener("submit", validateForm);
};

init();
