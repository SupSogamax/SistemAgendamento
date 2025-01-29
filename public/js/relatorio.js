import sidebar from "/public/js/export/sideBar.js";
import navbar from "/public/js/export/navBar.js";
import sessionModal from "/public/js/export/sessionModal.js";
import randomFrase from "./export/radomFrases.js";
import tela from "./export/telaCarregamento.js";

document.addEventListener("DOMContentLoaded", () => {
  const generateRelatorios = () => {
    const agendamentos = [
      {
        tipo: "Consulta",
        data: "2025-01-02",
        hora: "14:00",
        status: "Confirmado",
      },
      {
        tipo: "Reunião",
        data: "2025-01-03",
        hora: "11:00",
        status: "Cancelado",
      },
      {
        tipo: "Entrega",
        data: "2025-01-04",
        hora: "10:00",
        status: "Pendente",
      },
    ];

    const dataInicial = document.getElementById("data-inicial").value;
    const dataFinal = document.getElementById("data-final").value;
    const periodo = document.getElementById("periodo").value;
    const status = document.getElementById("status").value;

    const filtrados = agendamentos.filter((agendamento) => {
      const agendamentoData = new Date(agendamento.data);

      const dentroDoIntervalo =
        (!dataInicial || agendamentoData >= new Date(dataInicial)) &&
        (!dataFinal || agendamentoData <= new Date(dataFinal));

      const hora = parseInt(agendamento.hora.split(":")[0], 10);
      const periodoValido =
        periodo === "todosPeriodo" ||
        (periodo === "manhaPeriodo" && hora >= 6 && hora < 12) ||
        (periodo === "tardePeriodo" && hora >= 12 && hora < 18) ||
        (periodo === "noitePeriodo" && hora >= 18);

      const statusValido =
        status === "todosStatus" || agendamento.status === status;

      return dentroDoIntervalo && periodoValido && statusValido;
    });

    generateExcel(filtrados);
  };

  const generateExcel = (data) => {
    const rows = data.map((item) => [
      item.tipo,
      item.data,
      item.hora,
      item.status,
    ]);
    const headers = ["Tipo", "Data", "Hora", "Status"];
    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Agendamentos");
    XLSX.writeFile(workbook, "relatorio-agendamentos.xlsx");
  };

  document
    .getElementById("gerar-relatorio")
    .addEventListener("click", generateRelatorios);
});
