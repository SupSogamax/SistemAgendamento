document.addEventListener("DOMContentLoaded", () => {
  // Função para ler e processar o arquivo XML
  const ReadXML = () => {
    document
      .getElementById("anexoNota")
      .addEventListener("change", function (event) {
        const file = event.target.files[0];

        if (file && file.type === "text/xml") {
          const reader = new FileReader();
          reader.onload = function (e) {
            try {
              const parser = new DOMParser();
              const xmlDoc = parser.parseFromString(
                e.target.result,
                "text/xml"
              );

              // Processamento das informações do emitente
              const emitente = {
                nome:
                  xmlDoc.getElementsByTagName("xNome")[0]?.textContent ||
                  "Não informado",
                cnpj:
                  xmlDoc.getElementsByTagName("CNPJ")[0]?.textContent ||
                  "Não informado",
                endereco: {
                  logradouro:
                    xmlDoc.getElementsByTagName("xLgr")[0]?.textContent ||
                    "Não informado",
                  numero:
                    xmlDoc.getElementsByTagName("nro")[0]?.textContent ||
                    "Não informado",
                  bairro:
                    xmlDoc.getElementsByTagName("xBairro")[0]?.textContent ||
                    "Não informado",
                  cidade:
                    xmlDoc.getElementsByTagName("xMun")[0]?.textContent ||
                    "Não informado",
                  uf:
                    xmlDoc.getElementsByTagName("UF")[0]?.textContent ||
                    "Não informado",
                  cep:
                    xmlDoc.getElementsByTagName("CEP")[0]?.textContent ||
                    "Não informado",
                  telefone:
                    xmlDoc.getElementsByTagName("fone")[0]?.textContent ||
                    "Não informado",
                },
                ie:
                  xmlDoc.getElementsByTagName("IE")[0]?.textContent ||
                  "Não informado",
              };

              // Processamento das informações do destinatário
              const destinatario = {
                nome:
                  xmlDoc.getElementsByTagName("xNome")[1]?.textContent ||
                  "Não informado",
                cnpj:
                  xmlDoc.getElementsByTagName("CNPJ")[1]?.textContent ||
                  "Não informado",
                endereco: {
                  logradouro:
                    xmlDoc.getElementsByTagName("xLgr")[1]?.textContent ||
                    "Não informado",
                  numero:
                    xmlDoc.getElementsByTagName("nro")[1]?.textContent ||
                    "Não informado",
                  bairro:
                    xmlDoc.getElementsByTagName("xBairro")[1]?.textContent ||
                    "Não informado",
                  cidade:
                    xmlDoc.getElementsByTagName("xMun")[1]?.textContent ||
                    "Não informado",
                  uf:
                    xmlDoc.getElementsByTagName("UF")[1]?.textContent ||
                    "Não informado",
                  cep:
                    xmlDoc.getElementsByTagName("CEP")[1]?.textContent ||
                    "Não informado",
                  telefone:
                    xmlDoc.getElementsByTagName("fone")[1]?.textContent ||
                    "Não informado",
                },
              };

              // Processamento das informações da nota fiscal
              const notaFiscal = {
                chaveAcesso:
                  xmlDoc.getElementsByTagName("chNFe")[0]?.textContent ||
                  "Não informado",
                dataEmissao:
                  xmlDoc.getElementsByTagName("dhEmi")[0]?.textContent ||
                  "Não informado",
                valorTotal:
                  xmlDoc.getElementsByTagName("vNF")[0]?.textContent ||
                  "Não informado",
                produtos: [],
              };

              const produtos = xmlDoc.getElementsByTagName("det");
              for (let i = 0; i < produtos.length; i++) {
                const produto = produtos[i];
                notaFiscal.produtos.push({
                  descricao:
                    produto.getElementsByTagName("xProd")[0]?.textContent ||
                    "Não informado",
                  quantidade:
                    produto.getElementsByTagName("qCom")[0]?.textContent ||
                    "Não informado",
                  valorUnitario:
                    produto.getElementsByTagName("vUnCom")[0]?.textContent ||
                    "Não informado",
                  valorTotal:
                    produto.getElementsByTagName("vProd")[0]?.textContent ||
                    "Não informado",
                });
              }

              // Exibição das informações na página
              document.getElementById("emitente-nome-text").textContent =
                emitente.nome;
              document.getElementById("emitente-cnpj-text").textContent =
                emitente.cnpj;
              document.getElementById(
                "emitente-endereco-text"
              ).textContent = `${emitente.endereco.logradouro}, ${emitente.endereco.numero}, ${emitente.endereco.bairro}, ${emitente.endereco.cidade} - ${emitente.endereco.uf}, ${emitente.endereco.cep}`;
              document.getElementById("destinatario-nome-text").textContent =
                destinatario.nome;
              document.getElementById("destinatario-cnpj-text").textContent =
                destinatario.cnpj;
              document.getElementById(
                "destinatario-endereco-text"
              ).textContent = `${destinatario.endereco.logradouro}, ${destinatario.endereco.numero}, ${destinatario.endereco.bairro}, ${destinatario.endereco.cidade} - ${destinatario.endereco.uf}, ${destinatario.endereco.cep}`;

              // Listagem de produtos
              const produtosList = document.getElementById("produtos-list");
              produtosList.innerHTML = "";
              notaFiscal.produtos.forEach((produto) => {
                const li = document.createElement("li");
                li.textContent = `${produto.descricao} - Quantidade: ${produto.quantidade}`;
                produtosList.appendChild(li);
              });

              document.getElementById("notaConfirmada").style.display = "block";
              document.getElementById("btnAvancar").disabled = false;
            } catch (error) {
              alert("Erro ao processar o arquivo XML. Verifique o formato.");
            }
          };

          reader.readAsText(file);
        } else {
          alert("Por favor, envie um arquivo XML válido.");
        }
      });
  };
  // Função para confirmar o agendamento
  const paramHorario = () => {
    const dataInput = document.getElementById("agendamento-data");
    const horaInput = document.getElementById("agendamento-hora");
    const confirmarButton = document.getElementById("confirmarAgendamento");

    // Define o mínimo permitido para a data como hoje
    const today = new Date().toISOString().split("T")[0];
    dataInput.setAttribute("min", today);

    // Adiciona evento de clique ao botão de confirmar
    confirmarButton.addEventListener("click", () => {
      const data = dataInput.value;
      const hora = horaInput.value;

      // Verifica se a data selecionada é válida
      if (!data || new Date(data) < new Date(today)) {
        alert("Por favor, selecione uma data válida (hoje ou futura).");
        return;
      }

      // Verifica se o horário foi selecionado
      if (!hora) {
        alert("Por favor, selecione um horário válido.");
        return;
      }

      // Exibe a mensagem de sucesso
      document.getElementById("success-message").style.display = "flex";
    });
  };

  // Controle das etapas (steps) do fluxo
  const Steps = () => {
    const btnAvancar = document.getElementById("btnAvancar");
    const btnAvancar2 = document.getElementById("btnAvancar2");
    const btnVoltar2 = document.getElementById("btnVoltar2");
    const btnConfirmarAgendamento = document.getElementById(
      "confirmarAgendamento"
    );

    const step1 = document.querySelector(".step--1");
    const step2 = document.querySelector(".step--2");
    const step3 = document.querySelector(".step--3");

    const anexoNotaFiscal = document.getElementById("anexoNota");

    navCOLORS(0);
    const agendamentoData = document.getElementById("agendamento-data");
    const agendamentoHora = document.getElementById("agendamento-hora");

    // Avançar e voltar entre as etapas
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
      navCOLORS(2);
    });

    btnAvancar2.addEventListener("click", () => {
      step2.classList.remove("step--active");
      step3.classList.add("step--active");
      navCOLORS(2);
    });
  };

  // Função para atualizar os ícones da barra de navegação
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

  // Visualização do XML na página
  const viewerXML = () => {
    const anexoNota = document.getElementById("anexoNota");
    const uploadArea = document.getElementById("uploadArea");
    const notaConfirmada = document.getElementById("notaConfirmada");

    anexoNota.addEventListener("change", () => {
      if (anexoNota.files.length > 0) {
        uploadArea.style.display = "none";
        notaConfirmada.style.display = "block";
      }
    });
  };

  // Função para retornar à página inicial
  const returnHome = () => {
    document
      .querySelector(".navbar__close-btn")
      .addEventListener("click", () => {
        window.location.href = "/src/view/app.html";
      });
  };

  ReadXML();
  paramHorario();
  Steps();
  viewerXML();
  returnHome();
});
