document.addEventListener("DOMContentLoaded", () => {
  const login = () => {
    const loginBtn = document.querySelector("#login-btn");
    const usernameField = document.querySelector("#username");
    const passwordField = document.querySelector("#password");

    loginBtn.addEventListener("click", (event) => {
      event.preventDefault();

      const user = usernameField.value;
      const pass = passwordField.value;

      if (user === "Diego" && pass === "2006") {
        location.href = "/src/view/agendamento/dashboard.html";
      } else {
        alert("Usuário ou senha incorretos. Tente novamente.");
      }
    });

    const showPass = () => {
      const passwordField = document.querySelector("#password");
      const togglePasswordIcon = document.querySelector("#toggle-password");

      togglePasswordIcon.addEventListener("click", () => {
        if (passwordField.type === "password") {
          passwordField.type = "text";
          togglePasswordIcon.classList.remove("ri-eye-off-line");
          togglePasswordIcon.classList.add("ri-eye-line");
        } else {
          passwordField.type = "password";
          togglePasswordIcon.classList.remove("ri-eye-line");
          togglePasswordIcon.classList.add("ri-eye-off-line");
        }
      });
    };

    showPass();
  };
  login();
});
