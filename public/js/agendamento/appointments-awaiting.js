document.addEventListener("DOMContentLoaded", () => {
  const handlerSidebar = () => {
    const showModalExit = () => {
      const modalExit = document.querySelector("#exitSessionModal");
      const btnCancelar = document.getElementById("btnCancelar");
      const btnDeslogin = document.getElementById("btnDeslogin");

      document
        .querySelector(".navbar-subitem")
        .addEventListener("click", () => {
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

    showModalExit();

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
    handlerSibebarNavigation();
  };

  handlerSidebar();

  window.addEventListener("load", () => {
    const loadingOverlay = document.getElementById("loadingOverlay");
  });

  const filterTable = () => {
    const fornecedorFilter = document
      .querySelector("#filterFornecedor")
      .value.toLowerCase();
    const dataFilter = document.querySelector("#filterData").value;

    const rows = document.querySelectorAll("#agendamentosTable tbody tr");

    rows.forEach((row) => {
      const fornecedorCell = row.cells[1].textContent.toLowerCase();
      const dataCell = row.cells[2].textContent;

      const [day, month, year] = dataCell.split("/");
      const formattedDataCell = `${year}-${month}-${day}`;

      const matchesFornecedor = fornecedorCell.includes(fornecedorFilter);
      const matchesData = dataFilter
        ? formattedDataCell.includes(dataFilter)
        : true;

      if (matchesFornecedor && matchesData) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  };

  document
    .querySelector("#filterFornecedor")
    .addEventListener("keyup", filterTable);
  document.querySelector("#filterData").addEventListener("input", filterTable);

  const showModalDetalhes = () => {
    const modalDetalhes = document.getElementById("detalhesModal"); // Modal de detalhes
    const closeModal = document.getElementById("closeModal"); // Botão de fechar
    const closeModalBtn = document.getElementById("closeModalBtn"); // Botão de fechar na parte inferior

    // Função para preencher os campos do modal com os dados da linha
    const fillModalDetails = (row) => {
      const id = row.cells[0].textContent;
      const fornecedor = row.cells[1].textContent;
      const data = row.cells[2].textContent;
      const horario = row.cells[3].textContent;
      const volume = row.cells[4].textContent;
      const status = row.cells[5].textContent;

      // Preenche os campos do modal
      document.getElementById("modalName").value = fornecedor; // Exemplo de preenchimento
      document.getElementById("modalEmail").value = ""; // Preencher conforme necessário
      document.getElementById("modalPhone").value = ""; // Preencher conforme necessário
      document.getElementById("modalProduct").value = ""; // Preencher conforme necessário
      document.getElementById("modalQuantity").value = ""; // Preencher conforme necessário
      document.getElementById("modalInvoiceNumber").value = ""; // Preencher conforme necessário
      document.getElementById("modalLoadType").value = ""; // Preencher conforme necessário
      document.getElementById("modalDeliveryDate").value = ""; // Preencher conforme necessário
      document.getElementById("modalDeliveryHour").value = horario; // Exemplo de preenchimento
      document.getElementById("modalVehicleType").value = ""; // Preencher conforme necessário
      document.getElementById("modalObservations").value = ""; // Preencher conforme necessário
      document.getElementById("modalStatus").value = status; // Exemplo de preenchimento
    };

    // Adiciona o evento de clique para cada linha da tabela
    document.querySelectorAll("#agendamentosTable tbody tr").forEach((row) => {
      row.addEventListener("click", () => {
        fillModalDetails(row); // Preenche os detalhes
        modalDetalhes.style.display = "flex"; // Exibe o modal
      });
    });

    // Fecha o modal quando clicar no botão de fechar
    closeModal.addEventListener("click", () => {
      modalDetalhes.style.display = "none"; // Fecha o modal
    });

    // Fecha o modal quando clicar no botão de fechar na parte inferior
    closeModalBtn.addEventListener("click", () => {
      modalDetalhes.style.display = "none"; // Fecha o modal
    });
  };

  showModalDetalhes();
});
