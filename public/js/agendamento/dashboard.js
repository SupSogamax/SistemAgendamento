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
      const btnCancelar = document.querySelector(".cancel-btn");
      const btnDeslogin = document.querySelector(".logout-btn");

      document.getElementById("subMenu").addEventListener("click", () => {
        modalExit.classList.remove("hidden");
        modalExit.classList.add("show");
      });

      // Fechar o modal ao clicar no botão "Cancelar"
      btnCancelar.addEventListener("click", () => {
        modalExit.style.display = "none";
      });

      btnDeslogin.addEventListener("click", () => {
        sessionStorage.clear();
        localStorage.clear();
        window.location.href = "/src/view/index.html";
      });
    };

    // Chama as funções
    toggleSubmenu();
    showModalExit();

    const showModalGenerate = () => {
      document
        .getElementById("generate")
        .addEventListener("click", function () {
          const alertGenerateModal =
            document.getElementById("alertGenerateModal");
          alertGenerateModal.classList.add("show");
        });

      document
        .getElementById("btnCancelar")
        .addEventListener("click", function () {
          const alertGenerateModal =
            document.getElementById("alertGenerateModal");
          alertGenerateModal.classList.remove("show");
        });

      document
        .getElementById("btnConfirmar")
        .addEventListener("click", function () {
          const alertGenerateModal =
            document.getElementById("alertGenerateModal");
          alertGenerateModal.classList.remove("show");

          const authLinkModal = document.getElementById("authLinkModal");
          authLinkModal.classList.add("show");
        });

      document
        .getElementById("btnCloseAuthModal")
        .addEventListener("click", function () {
          const authLinkModal = document.getElementById("authLinkModal");
          authLinkModal.classList.remove("show");
        });

      document
        .getElementById("copyPasswordBtn")
        .addEventListener("click", function () {
          var passwordField = document.getElementById("authPassword");

          passwordField.select();
          passwordField.setSelectionRange(0, 99999);

          document.execCommand("copy");

          alert("Senha copiada para a área de transferência!");
        });
    };

    const handlerSidebarNavigation = () => {
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

    handlerSidebarNavigation();
    showModalGenerate();
  };

  handlerSidebar();

  window.addEventListener("load", () => {
    const loadingOverlay = document.getElementById("loadingOverlay");
    loadingOverlay.style.display = "none";
  });
});
