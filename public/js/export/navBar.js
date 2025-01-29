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

  const help = () => {
    const btnHelp = document.querySelector(".help");

    btnHelp.addEventListener("click", () => {
      window.open("https://wa.me/5522992156739");
    });
  };
  help();
};

export default navbar;
navbar();
