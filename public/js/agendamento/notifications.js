document.addEventListener("DOMContentLoaded", () => {
  const handlerSidebar = () => {
    const toggleSubmenu = () => {
      const submenu = document.querySelector("#subMenu");
      const arrowOption = document.querySelector(".arrow-option");

      document.querySelector("#config").addEventListener("click", () => {
        submenu.classList.toggle("toggle");
        arrowOption.classList.toggle("ri-arrow-up-s-line");
        arrowOption.classList.toggle("ri-arrow-down-s-line");
      });
    };

    const showModalExit = () => {
      const modalExit = document.querySelector("#exitSessionModal");
      const btnCancelar = document.getElementById("btnCancelar");
      const btnDeslogin = document.getElementById("btnDeslogin");

      document.getElementById("subMenu").addEventListener("click", () => {
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

    toggleSubmenu();
    showModalExit();
    handlerSibebarNavigation();
  };

  handlerSidebar();

  window.addEventListener("load", () => {
    const loadingOverlay = document.getElementById("loadingOverlay");
    loadingOverlay.style.display = "none";
  });
});
