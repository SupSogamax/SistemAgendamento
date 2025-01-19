document.addEventListener("DOMContentLoaded", () => {
  const navbar = () => {
    const sigleName = () => {
      const nameUser = document.querySelector("#userName").textContent.trim();
      const profile = document.querySelector("#profile");

      if (nameUser.length >= 2) {
        const initials = nameUser[0].toUpperCase() + nameUser[1].toUpperCase();
        profile.textContent = initials;
      }
    };

    sigleName();
  };

  navbar();

  const sidebar = () => {
    const redirect = () => {
      const minhaAgenda = document
        .querySelector("#agenda")
        .addEventListener("click", () => {
          window.location.href = "/src/view/agenda.html";
        });
    };
    redirect();
  };
  sidebar();

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
