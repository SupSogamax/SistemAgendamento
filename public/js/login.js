document.addEventListener("DOMContentLoaded", () => {
  const isValidadeLogin = () => {
    document.querySelector("#openLogin").addEventListener("click", (event) => {
      const email = document.querySelector("#emailLogin").value.trim();
      const password = document.querySelector("#passLogin").value.trim();

      if (email === "suportedev@sogamax.com.br" && password === "170106") {
        event.preventDefault();
        window.location.href = "/src/view/app.html";
      } else {
        event.preventDefault();
        alert("❌ Email ou senha incorretos. Tente novamente!");
      }
    });
  };
  isValidadeLogin();

  const toggleShowPass = () => {
    const icon = document.querySelector("#togglePassword");
    const password = document.querySelector("#passLogin");

    icon.addEventListener("click", () => {
      if (password.type === "password") {
        password.type = "text";
        icon.classList.remove("ri-eye-line");
        icon.classList.add("ri-eye-off-line");
      } else {
        password.type = "password";
        icon.classList.remove("ri-eye-off-line");
        icon.classList.add("ri-eye-line");
      }
    });
  };

  toggleShowPass();
});
