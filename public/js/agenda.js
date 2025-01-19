document.addEventListener("DOMContentLoaded", () => {
  // Inicializa o nome do usuário no perfil
  const initializeNavbar = () => {
    const nameUser = document.querySelector("#userName")?.textContent?.trim();
    const profile = document.querySelector("#profile");

    if (nameUser && nameUser.length >= 2) {
      const initials = nameUser[0].toUpperCase() + nameUser[1].toUpperCase();
      profile.textContent = initials;
    }
  };

  initializeNavbar();

  const redirectPages = () => {
    const itensNav = document.querySelectorAll(".listNavigation li");

    itensNav.forEach((item) => {
      item.addEventListener("click", () => {
        if (item.innerHTML.includes("Início")) {
          window.location.href = "/src/view/app.html";
        } else if (item.innerHTML.includes("Minha Agenda")) {
          window.location.href = "/src/view/agenda.html";
        } else if (item.innerHTML.includes("Relatórios")) {
          window.location.href = "/src/view/relatorios.html";
        }
      });
    });
  };

  redirectPages();

  // Agendamentos de exemplo
  const agendamentos = [
    {
      tipo: "Consulta",
      data: "2025-01-02",
      hora: "14:00",
      status: "Confirmado",
    },
    { tipo: "Reunião", data: "2025-01-03", hora: "11:00", status: "Cancelado" },
    { tipo: "Entrega", data: "2025-01-04", hora: "10:00", status: "Pendente" },
    {
      tipo: "Novo Agendamento",
      data: "2025-01-01",
      hora: "09:00",
      status: "Confirmado",
    },
  ];

  const itemsPerPage = 3;
  let currentPage = 1;

  // Função para formatar hora
  const formatTime = (time) => {
    const [hour, minute] = time.split(":").map((v) => parseInt(v, 10));
    let ampm = hour >= 12 ? "PM" : "AM";
    let hour12 = hour % 12;
    hour12 = hour12 ? hour12 : 12;
    return `${hour12}:${minute < 10 ? "0" + minute : minute} ${ampm}`;
  };

  // Função para formatar data
  const formatDate = (date) => {
    const dateObj = new Date(date);
    const dayOfWeek = [
      "Domingo",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
    ][dateObj.getUTCDay()];
    const day = dateObj.getUTCDate();
    const month = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ][dateObj.getUTCMonth()];
    const year = dateObj.getUTCFullYear();
    return `${dayOfWeek}, ${day} de ${month} de ${year}`;
  };

  // Função para renderizar os agendamentos
  const renderAgendamentos = (agendamentosFiltrados) => {
    const container = document.getElementById("agendamentos-container");
    container.innerHTML = "";

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = agendamentosFiltrados.slice(startIndex, endIndex);

    if (paginatedItems.length === 0) {
      container.innerHTML = "<p>Nenhum agendamento encontrado.</p>";
      return;
    }

    paginatedItems.forEach((item) => {
      const agendamentoElement = document.createElement("div");
      agendamentoElement.classList.add("agendamento");
      const statusClass = item.status.toLowerCase();
      const formattedTime = formatTime(item.hora);
      const formattedDate = formatDate(item.data);

      agendamentoElement.innerHTML = `
        <div class="agendamento-info">
          <h3>${item.tipo}</h3>
          <p><strong>Data:</strong> ${formattedDate}</p>
          <p><strong>Hora:</strong> ${formattedTime}</p>
          <p><strong>Status:</strong> <span class="${statusClass}">${
        item.status
      }</span></p>
        </div>
        <button class="agendamento-button" data-agendamento='${JSON.stringify(
          item
        )}'>Detalhes</button>
      `;

      container.appendChild(agendamentoElement);
    });

    renderPagination(agendamentosFiltrados.length);
  };

  // Função para renderizar a paginação
  const renderPagination = (totalItems) => {
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = "";

    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pageStart = Math.floor((currentPage - 1) / 5) * 5 + 1;
    const pageEnd = Math.min(pageStart + 4, totalPages);

    const createButton = (label, isActive, isDisabled, onClick) => {
      const button = document.createElement("button");
      button.textContent = label;
      if (isActive) button.classList.add("active");
      if (isDisabled) button.disabled = true;
      button.addEventListener("click", onClick);
      return button;
    };

    paginationContainer.appendChild(
      createButton("Anterior", false, currentPage === 1, () => {
        currentPage--;
        renderAgendamentos(applyFilters());
      })
    );

    for (let page = pageStart; page <= pageEnd; page++) {
      paginationContainer.appendChild(
        createButton(page, page === currentPage, false, () => {
          currentPage = page;
          renderAgendamentos(applyFilters());
        })
      );
    }

    paginationContainer.appendChild(
      createButton("Próxima", false, currentPage === totalPages, () => {
        currentPage++;
        renderAgendamentos(applyFilters());
      })
    );
  };

  // Função para normalizar a data para comparação
  const formatDateForComparison = (date) => {
    const [year, month, day] = date.split("-");
    return new Date(Date.UTC(year, month - 1, day)).toISOString().split("T")[0];
  };

  // Função para aplicar filtros
  const applyFilters = () => {
    const filterDate = document.getElementById("filter-date")?.value;
    const filterStatus = document.getElementById("filter-status")?.value;
    const filterTime = document.getElementById("filter-time")?.value;

    let filtered = [...agendamentos];

    if (filterDate) {
      filtered = filtered.filter((item) => {
        const itemDate = new Date(item.data).toISOString().split("T")[0];
        const selectedDate = new Date(filterDate).toISOString().split("T")[0];
        return itemDate === selectedDate;
      });
    }

    if (filterStatus) {
      filtered = filtered.filter(
        (item) => item.status.toLowerCase() === filterStatus.toLowerCase()
      );
    }

    if (filterTime) {
      const timeRanges = {
        manha: [6, 12],
        tarde: [12, 18],
        noite: [18, 23],
      };

      const [start, end] = timeRanges[filterTime] || [];
      if (start !== undefined && end !== undefined) {
        filtered = filtered.filter((item) => {
          const [hour] = item.hora.split(":").map((v) => parseInt(v, 10));
          return hour >= start && hour < end;
        });
      }
    }

    return filtered;
  };

  // Evento de filtro
  document.getElementById("apply-filters")?.addEventListener("click", () => {
    currentPage = 1;
    renderAgendamentos(applyFilters());
  });

  renderAgendamentos(agendamentos);

  const manageDetailsModal = () => {
    const modalDetails = document.querySelector("#agendamentoModal");

    // Função para abrir o modal com os dados do agendamento
    const openModal = (details) => {
      document.getElementById("remetenteNome").textContent =
        details.remetente?.nome || "Não informado";
      document.getElementById("remetenteCnpj").textContent =
        details.remetente?.cnpj || "Não informado";
      document.getElementById("remetenteEndereco").textContent =
        details.remetente?.endereco || "Não informado";
      document.getElementById("destinatarioNome").textContent =
        details.destinatario?.nome || "Não informado";
      document.getElementById("destinatarioCnpj").textContent =
        details.destinatario?.cnpj || "Não informado";
      document.getElementById("destinatarioEndereco").textContent =
        details.destinatario?.endereco || "Não informado";

      modalDetails.style.display = "flex"; // Exibe o modal
    };

    // Função para fechar o modal
    const closeModal = () => {
      modalDetails.style.display = "none"; // Esconde o modal
    };

    // Adiciona evento de clique ao documento
    document.addEventListener("click", (event) => {
      const target = event.target;

      // Se o alvo for o botão de "Ver Detalhes"
      if (target.classList.contains("agendamento-button")) {
        const agendamentoData = JSON.parse(
          target.getAttribute("data-agendamento")
        );
        openModal(agendamentoData); // Abre o modal com os dados
      }

      // Fecha o modal se clicar fora do modal
      if (target === modalDetails) {
        closeModal();
      }
    });
  };

  manageDetailsModal();
});
