function validateStep(step) {
  let isValid = true;
  let form;

  if (step === 1) {
    form = document.getElementById("contactForm");
  } else if (step === 2) {
    form = document.getElementById("loadForm");
  }

  const inputs = form.querySelectorAll(
    "input[required], select[required], textarea[required]"
  );

  inputs.forEach((input) => {
    if (input.value.trim() === "") {
      input.style.borderColor = "red";
      isValid = false;
    } else {
      input.style.borderColor = "";
    }
  });

  return isValid;
}

function changeStep(step) {
  if (step !== 1 && !validateStep(step - 1)) {
    alert("Por favor, preencha todos os campos obrigatórios.");
    return;
  }

  // Ocultar todas as etapas
  const allSteps = document.querySelectorAll(".step-content");
  allSteps.forEach((stepContent) => stepContent.classList.remove("active"));

  // Mostrar a etapa clicada
  const currentStep = document.getElementById(`step${step}-content`);
  currentStep.classList.add("active");

  // Atualizar a barra de progresso
  updateProgressBar(step);

  updateStepIndicators(step);
}

function updateProgressBar(step) {
  const progress = document.getElementById("progress");
  const progressPercentage = (step - 1) * 50; // Cada etapa tem 50% do progresso
  progress.style.width = `${progressPercentage}%`;
}

// Função para atualizar os indicadores das etapas
function updateStepIndicators(step) {
  const steps = document.querySelectorAll(".step");
  steps.forEach((stepElement, index) => {
    if (index < step) {
      stepElement.classList.add("completed");
    } else {
      stepElement.classList.remove("completed");
    }
  });
}

// Adicionar a lógica de confirmação de agendamento
document
  .getElementById("confirmBooking")
  .addEventListener("click", showConfirmationModal);

// Mostrar o modal de confirmação
function showConfirmationModal() {
  const modal = document.getElementById("viewerSucess");
  modal.style.display = "flex"; // Exibir o modal

  // Fechar o modal quando o botão for clicado
  document
    .getElementById("closeModal")
    .addEventListener("click", closeConfirmationModal);
}

// Fechar o modal de confirmação
function closeConfirmationModal() {
  const modal = document.getElementById("viewerSucess");
  window.location.reload();
}

// Função para retornar à etapa anterior
document.getElementById("prevStep2").addEventListener("click", function () {
  changeStep(1); // Voltar para a Etapa 1
});

document.getElementById("prevStep3").addEventListener("click", function () {
  changeStep(2); // Voltar para a Etapa 2
});

function displayConfirmationData() {
  const confirmationData = document.getElementById("confirmationData");
  const deliveryDate = document.getElementById("deliveryDate").value; // Suponha que seja no formato "YYYY-MM-DD"
  const deliveryHour = document.getElementById("deliveryHour").value; // Suponha que seja no formato "HH:mm"

  function formatDate(date) {
    const [year, month, day] = date.split("-");
    const months = [
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
    ];
    return `${parseInt(day)} de ${months[parseInt(month) - 1]} de ${year}`;
  }

  function formatHour(hour) {
    return hour.replace(":", "h");
  }

  const formattedDate = formatDate(deliveryDate);
  const formattedHour = formatHour(deliveryHour);

  const deliveryDateFormate = `${formattedDate}, às ${formattedHour}`;

  confirmationData.innerHTML = `  
    <p><strong>Data e Horário de Entrega:</strong> ${deliveryDateFormate}</p>
    
  `;
}

document.getElementById("nextStep2").addEventListener("click", function () {
  displayConfirmationData();
  changeStep(3);
});

window.onload = function () {
  changeStep(1);
};
