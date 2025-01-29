const sessionModal = () => {
  const modalExit = document.querySelector("#exit-profile");

  const opendModal = () => {
    const circleProfile = document.querySelector(".profile");
    if (circleProfile) {
      circleProfile.removeEventListener("click", toggleModal);
      circleProfile.addEventListener("click", toggleModal);
    }
  };

  const toggleModal = () => {
    modalExit.classList.toggle("visible");
  };

  opendModal();

  const closed = () => {
    const btnCancelarSessao = document.querySelector("#cancel");
    if (btnCancelarSessao) {
      btnCancelarSessao.removeEventListener("click", toggleModal);
      btnCancelarSessao.addEventListener("click", toggleModal);
    }
  };
  closed();

  const disconnect = () => {
    const btnDisconnect = document.querySelector("#disconnect");
    if (btnDisconnect) {
      btnDisconnect.addEventListener("click", () => {
        window.location.href = "/src/view/index.html";
      });
    }
  };
  disconnect();
};
export default sessionModal;
sessionModal();
