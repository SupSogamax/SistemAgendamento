const sidebar = () => {
  const redirectToPages = () => {
    const pages = document.querySelectorAll(".listNavigation li");

    pages.forEach((item) => {
      item.addEventListener("click", () => {
        if (item.innerHTML.includes("Início")) {
          window.location.href = "/src/view/app.html";
        } else if (item.innerHTML.includes("Minha Agenda")) {
          window.location.href = "/src/view/agenda.html";
        } else if (item.innerHTML.includes("Relatórios")) {
          window.location.href = "/src/view/relatorio.html";
        } else {
          window.location.href = "/src/view/today.html";
        }
      });
    });
  };
  redirectToPages();
};

export default sidebar;
sidebar();
