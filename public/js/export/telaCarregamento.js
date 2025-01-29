const loading = () => {
  const telaCarregamento = document.querySelector(".loading");

  if (telaCarregamento) {
    window.addEventListener("load", () => {
      telaCarregamento.style.transition = "opacity 0.5s ease";
      telaCarregamento.style.opacity = "0";

      telaCarregamento.addEventListener("transitionend", () => {
        telaCarregamento.style.display = "none";
      });
    });
  } else {
    console.error("Elemento .loading não encontrado");
  }
};

export default loading;
loading();
