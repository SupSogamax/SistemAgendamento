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

    setTimeout(() => {
      loadingOverlay.style.display = "none";
    }, 500);
  });

  const filterTable = () => {
    const fornecedorFilter = document
      .querySelector("#filterFornecedor")
      .value.toLowerCase();
    const statusFilter = document
      .querySelector("#filterStatus")
      .value.toLowerCase();
    const dataFilter = document.querySelector("#filterData").value;

    const rows = document.querySelectorAll("#agendamentosTable tbody tr");

    rows.forEach((row) => {
      const fornecedorCell = row.cells[1].textContent.toLowerCase();
      const statusCell = row.cells[5].textContent.toLowerCase();
      const dataCell = row.cells[2].textContent;

      const [day, month, year] = dataCell.split("/");
      const formattedDataCell = `${year}-${month}-${day}`;

      const matchesFornecedor = fornecedorCell.includes(fornecedorFilter);
      const matchesStatus = statusCell.includes(statusFilter);
      const matchesData = dataFilter
        ? formattedDataCell.includes(dataFilter)
        : true;

      row.style.display =
        matchesFornecedor && matchesStatus && matchesData ? "" : "none";
    });
  };

  document
    .querySelector("#filterFornecedor")
    .addEventListener("keyup", filterTable);
  document
    .querySelector("#filterStatus")
    .addEventListener("keyup", filterTable);
  document.querySelector("#filterData").addEventListener("input", filterTable);

  let currentSort = { column: "id", order: "asc" };

  const sortTable = (column) => {
    const table = document.querySelector("#agendamentosTable tbody");
    const rows = Array.from(table.querySelectorAll("tr"));
    const isNumeric = column === "id" || column === "volume";
    const isDate = column === "data";

    rows.sort((a, b) => {
      const cellA = a.cells[getColumnIndex(column)].textContent;
      const cellB = b.cells[getColumnIndex(column)].textContent;

      let valA = isDate
        ? new Date(cellA.split("/").reverse().join("-"))
        : cellA;
      let valB = isDate
        ? new Date(cellB.split("/").reverse().join("-"))
        : cellB;

      if (isNumeric) {
        valA = parseFloat(valA.replace(/[^\d.-]/g, ""));
        valB = parseFloat(valB.replace(/[^\d.-]/g, ""));
      }

      return currentSort.order === "asc"
        ? valA > valB
          ? 1
          : -1
        : valA < valB
        ? 1
        : -1;
    });

    rows.forEach((row) => table.appendChild(row));
    currentSort.order = currentSort.order === "asc" ? "desc" : "asc";
    updateArrowIcons(column);
  };

  const getColumnIndex = (column) => {
    const headers = document.querySelectorAll("#agendamentosTable thead th");
    const header = Array.from(headers).find(
      (th) => th.getAttribute("data-column") === column
    );
    return Array.from(header.parentElement.children).indexOf(header);
  };

  const updateArrowIcons = (column) => {
    const arrows = document.querySelectorAll(".arrow-icon");
    arrows.forEach((arrow) => (arrow.style.display = "none"));

    const currentArrow = document.querySelector(
      `[data-column="${column}"] .arrow-icon`
    );
    currentArrow.style.display = "inline-block";
    currentArrow.classList.toggle(
      "ri-arrow-up-s-line",
      currentSort.order === "asc"
    );
    currentArrow.classList.toggle(
      "ri-arrow-down-s-line",
      currentSort.order !== "asc"
    );
  };

  document.querySelectorAll(".sortable").forEach((th) => {
    th.addEventListener("click", () => {
      const column = th.getAttribute("data-column");
      sortTable(column);
    });
  });

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
