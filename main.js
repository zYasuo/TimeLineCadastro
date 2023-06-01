const steps = Array.from(document.querySelectorAll('.step'));
const formParts = Array.from(document.querySelectorAll('.form-part'));
const nextButtons = Array.from(document.querySelectorAll('.next'));
const progressBar = document.querySelector('.bar-filled');
const requiredFields = Array.from(document.querySelectorAll('input[required]'));
const progressPerStep = 100 / (steps.length - 1);

let currentStep = 1;

requiredFields.forEach(field => field.addEventListener('input', updateProgressBar));

function allFieldsFilled(formPart) {
  const allFilled = Array.from(formPart.querySelectorAll('input[required]')).every(input => input.value.trim() !== '');
  formPart.classList.toggle('completed', allFilled);
  const index = formParts.indexOf(formPart);
  steps[index].classList.toggle('completed-step', allFilled);
  return allFilled;
}

function changeStep(newStep) {
  if (newStep > currentStep && !allFieldsFilled(formParts[currentStep - 1])) {
    alert('Por favor, preencha todos os campos obrigatórios antes de prosseguir.');
    return;
  }

  formParts[currentStep - 1].classList.remove('active');
  steps[currentStep - 1].classList.remove('active');

  currentStep = newStep;

  formParts[currentStep - 1].classList.add('active');
  steps[currentStep - 1].classList.add('active');
  updateProgressBar();

  steps.forEach((step, index) => {
    const isCurrentStep = index === currentStep - 1;
    const isPreviousStep = index < currentStep;
    step.classList.toggle('completed-step', isPreviousStep);
    step.classList.toggle('highlight', isPreviousStep);
    step.classList.toggle('active', isCurrentStep);
  });
}

function updateProgressBar() {
  let totalProgress = 0;

  for (let i = 0; i < currentStep; i++) {
    const fieldsInStep = formParts[i].querySelectorAll('input[required]');
    const filledFieldsInStep = Array.from(fieldsInStep).filter(field => field.value.trim() !== '').length;
    totalProgress += (filledFieldsInStep / fieldsInStep.length) * progressPerStep;
  }

  progressBar.style.width = `${totalProgress}%`;
}

steps.forEach((step, index) => step.addEventListener('click', () => changeStep(index + 1)));
nextButtons.forEach((button, index) => button.addEventListener('click', (e) => {
  e.preventDefault();
  changeStep(index + 2);
}));

document.addEventListener('DOMContentLoaded', function () {
  const elems = document.querySelectorAll('select');
  const instances = M.FormSelect.init(elems);
});

changeStep(currentStep);
