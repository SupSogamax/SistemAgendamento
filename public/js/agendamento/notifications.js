document.addEventListener("DOMContentLoaded", () => {
  const handlerSidebar = () => {
    const showModalExit = () => {
      const modalExit = document.querySelector("#exitSessionModal");
      const btnCancelar = document.getElementById("btnCancelar");
      const btnDeslogin = document.getElementById("btnDeslogin");

      document
        .querySelector(".navbar-subitem")
        .addEventListener("click", () => {
          modalExit.classList.add("show");
        });

      btnCancelar.addEventListener("click", () => {
        modalExit.classList.remove("show");
      });

      btnDeslogin.addEventListener("click", () => {
        sessionStorage.clear();
        localStorage.clear();
        window.location.href = "/src/view/index.html";
      });
    };

    showModalExit();

    const handlerSibebarNavigation = () => {
      const sidebarItems = document.querySelectorAll("li[data-page]");
      sidebarItems.forEach((item) => {
        item.addEventListener("click", () => {
          const page = item.getAttribute("data-page");

          switch (page) {
            case "dashboard":
              window.location.href = "/src/view/agendamento/dashboard.html";
              break;
            case "waiting":
              window.location.href =
                "/src/view/agendamento/appointments-awaiting.html";
              break;
            case "completed":
              window.location.href =
                "/src/view/agendamento/appointments-history.html";
              break;
            case "notifications":
              window.location.href = "/src/view/agendamento/notifications.html";
          }
        });
      });
    };
    handlerSibebarNavigation();
  };

  handlerSidebar();

  window.addEventListener("load", () => {
    const loadingOverlay = document.getElementById("loadingOverlay");
    loadingOverlay.style.display = "none";
  });
});
