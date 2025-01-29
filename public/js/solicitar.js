document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("anexoNota")
    .addEventListener("change", function (event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(
            e.target.result,
            "application/xml"
          );

          const remetente = {
            razaoSocial:
              xmlDoc.querySelector("emit > xNome")?.textContent ||
              "Não disponível",
            cnpj:
              xmlDoc.querySelector("emit > CNPJ")?.textContent ||
              "Não disponível",
            endereco: {
              logradouro:
                xmlDoc.querySelector("emit > enderEmit > xLgr")?.textContent ||
                "Não disponível",
              numero:
                xmlDoc.querySelector("emit > enderEmit > nro")?.textContent ||
                "Não disponível",
              bairro:
                xmlDoc.querySelector("emit > enderEmit > xBairro")
                  ?.textContent || "Não disponível",
              cep:
                xmlDoc.querySelector("emit > enderEmit > CEP")?.textContent ||
                "Não disponível",
              cidade:
                xmlDoc.querySelector("emit > enderEmit > xMun")?.textContent ||
                "Não disponível",
              estado:
                xmlDoc.querySelector("emit > enderEmit > UF")?.textContent ||
                "Não disponível",
            },
            telefone:
              xmlDoc.querySelector("emit > enderEmit > fone")?.textContent ||
              "Não disponível",
            email:
              xmlDoc.querySelector("emit > email")?.textContent ||
              "Não disponível",
          };

          const destinatario = {
            razaoSocial:
              xmlDoc.querySelector("dest > xNome")?.textContent ||
              "Não disponível",
            cnpj:
              xmlDoc.querySelector("dest > CNPJ")?.textContent ||
              "Não disponível",
            endereco: {
              logradouro:
                xmlDoc.querySelector("dest > enderDest > xLgr")?.textContent ||
                "Não disponível",
              numero:
                xmlDoc.querySelector("dest > enderDest > nro")?.textContent ||
                "Não disponível",
              bairro:
                xmlDoc.querySelector("dest > enderDest > xBairro")
                  ?.textContent || "Não disponível",
              cep:
                xmlDoc.querySelector("dest > enderDest > CEP")?.textContent ||
                "Não disponível",
              cidade:
                xmlDoc.querySelector("dest > enderDest > xMun")?.textContent ||
                "Não disponível",
              estado:
                xmlDoc.querySelector("dest > enderDest > UF")?.textContent ||
                "Não disponível",
            },
            telefone:
              xmlDoc.querySelector("dest > enderDest > fone")?.textContent ||
              "Não disponível",
            email:
              xmlDoc.querySelector("dest > email")?.textContent ||
              "Não disponível",
          };

          const produtos = Array.from(xmlDoc.querySelectorAll("det")).map(
            (produto) => ({
              nome:
                produto.querySelector("prod > xProd")?.textContent ||
                "Não disponível",
              quantidade:
                produto.querySelector("prod > qCom")?.textContent ||
                "Não disponível",
            })
          );

          const detalhesContainer =
            document.getElementById("notaFiscalDetalhes");
          detalhesContainer.innerHTML = `
            <h2>Detalhes da Nota Fiscal</h2>
            <h3>📌 Remetente</h3>
            <p><strong>Razão Social:</strong> ${remetente.razaoSocial}</p>
            <p><strong>CNPJ:</strong> ${remetente.cnpj}</p>
            <p><strong>Endereço:</strong> ${remetente.endereco.logradouro}, ${
            remetente.endereco.numero
          }, ${remetente.endereco.bairro}, ${remetente.endereco.cidade} - ${
            remetente.endereco.estado
          }, CEP: ${remetente.endereco.cep}</p>
            <p><strong>Telefone:</strong> ${remetente.telefone}</p>
            <p><strong>E-mail:</strong> ${remetente.email}</p>
            <h3>📌 Destinatário</h3>
            <p><strong>Razão Social:</strong> ${destinatario.razaoSocial}</p>
            <p><strong>CNPJ:</strong> ${destinatario.cnpj}</p>
            <p><strong>Endereço:</strong> ${
              destinatario.endereco.logradouro
            }, ${destinatario.endereco.numero}, ${
            destinatario.endereco.bairro
          }, ${destinatario.endereco.cidade} - ${
            destinatario.endereco.estado
          }, CEP: ${destinatario.endereco.cep}</p>
            <p><strong>Telefone:</strong> ${destinatario.telefone}</p>
            <p><strong>E-mail:</strong> ${destinatario.email}</p>
            <h3>📦 Produtos</h3>
            <ul>
              ${produtos
                .map(
                  (produto) => `
                <li>
                  <strong>Nome:</strong> ${produto.nome} <br>
                  <strong>Quantidade:</strong> ${produto.quantidade}
                </li>
              `
                )
                .join("")}
            </ul>
          `;
        };

        reader.readAsText(file);
      }
    });

  const viewerXML = () => {
    const anexoNota = document.getElementById("anexoNota");
    const uploadArea = document.getElementById("uploadArea");
    const notaConfirmada = document.getElementById("notaConfirmada");

    anexoNota.addEventListener("change", () => {
      if (anexoNota.files.length > 0) {
        uploadArea.style.display = "none";
        notaConfirmada.style.display = "block";
      } else {
        uploadArea.style.display = "block";
        notaConfirmada.style.display = "none";
      }
    });
  };

  const Steps = () => {
    const btnAvancar = document.getElementById("btnAvancar");
    const btnAvancar2 = document.getElementById("btnAvancar2");
    const btnVoltar2 = document.getElementById("btnVoltar2");
    const step1 = document.querySelector(".step--1");
    const step2 = document.querySelector(".step--2");
    const step3 = document.querySelector(".step--3");
    const anexoNotaFiscal = document.getElementById("anexoNota");

    navCOLORS(0);

    anexoNotaFiscal.addEventListener("change", () => {
      if (anexoNotaFiscal.files.length > 0) {
        btnAvancar.disabled = false;
        document.getElementById("notaConfirmada").style.display = "block";
      } else {
        btnAvancar.disabled = true;
        document.getElementById("notaConfirmada").style.display = "none";
      }
    });

    btnAvancar.addEventListener("click", () => {
      step1.classList.remove("step--active");
      step2.classList.add("step--active");
      navCOLORS(1);
    });

    btnVoltar2.addEventListener("click", () => {
      step2.classList.remove("step--active");
      step1.classList.add("step--active");
      navCOLORS(0);
    });

    btnAvancar2.addEventListener("click", () => {
      step2.classList.remove("step--active");
      step3.classList.add("step--active");
      navCOLORS(2);
    });
  };

  const navCOLORS = (stepNumber) => {
    const navbarItems = document.querySelectorAll(".navbar__item");

    navbarItems.forEach((item, index) => {
      const circle = item.querySelector(".navbar__item-number");

      if (index < stepNumber) {
        circle.classList.add("navbar__item-complete");
        circle.classList.remove("navbar__item-active");
      } else if (index === stepNumber) {
        circle.classList.add("navbar__item-active");
        circle.classList.remove("navbar__item-complete");
      } else {
        circle.classList.remove("navbar__item-active", "navbar__item-complete");
      }
    });
  };

  const returnHome = () => {
    document
      .querySelector(".navbar__close-btn")
      .addEventListener("click", () => {
        window.location.href = "/src/view/app.html";
      });
  };

  const minInputDate = () => {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, "0");
    const dia = String(hoje.getDate()).padStart(2, "0");
    const data = `${ano}-${mes}-${dia}`;

    const inputDataEntrada = document.getElementById("agendamento-data");
    if (inputDataEntrada) {
      inputDataEntrada.setAttribute("min", data);
    }
  };

  const viewerCompleted = () => {
    const btnCompleted = document
      .querySelector("#confirmarAgendamento")
      .addEventListener("click", () => {
        const inputDate = document.querySelector("#agendamento-data");
        const inputHour = document.querySelector("#agendamento-hora");

        const completed = document.querySelector("#success-message");

        if (inputDate.value && inputHour.value) {
          completed.style.display = "flex";
        } else {
          alert("Por favor, preencha a data e o horário para continuar!");
        }
      });
  };

  viewerCompleted();
  viewerXML();
  Steps();
  returnHome();
  minInputDate();
});
