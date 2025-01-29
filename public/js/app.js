import navbar from "/public/js/export/navBar.js";
import sidebar from "/public/js/export/sideBar.js";
import sessionModal from "/public/js/export/sessionModal.js";
import randomFrase from "./export/radomFrases.js";
import tela from "./export/telaCarregamento.js";

document.addEventListener("DOMContentLoaded", () => {
  const newAgenda = () => {
    const buttonNewAgenda = document.querySelector("#buttonNewAgenda");
    const modalEntrega = document.querySelector("#choose-delivery");

    buttonNewAgenda.addEventListener("click", () => {
      modalEntrega.classList.add("visible");
    });

    const buttonClosedModal = document.querySelector("#closedModal");
    buttonClosedModal.addEventListener("click", () => {
      modalEntrega.classList.remove("visible");
    });

    const buttonRedirectEntrega = document.querySelector(".button-text");
    buttonRedirectEntrega.addEventListener("click", () => {
      window.location.href = "/src/view/solicitar.html";
    });
  };
  newAgenda();
});
