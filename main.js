const barFilled = document.querySelector('.timeline .bar-filled');
const steps = document.querySelectorAll('.step');
const formParts = document.querySelectorAll('.form-part');
const nextButtons = document.querySelectorAll('.next');
const bar = document.querySelector('.bar');
let currentStep = 1;

// Adiciona a classe "active" à barra de progresso
bar.classList.add('active');

// Função para avançar para a próxima parte do formulário
function goToNextFormPart() {
   const currentFormPart = formParts[currentStep - 1];
   const requiredInputs = currentFormPart.querySelectorAll('input[required]');
   let allRequiredFieldsFilled = true;

   requiredInputs.forEach(input => {
       if (input.value.trim() === '') {
           allRequiredFieldsFilled = false;
       }
   });

   if (!allRequiredFieldsFilled) {
       alert('Por favor, preencha todos os campos obrigatórios antes de prosseguir.');
       return;
   }

   if (currentStep >= steps.length) return;

   // Oculta a parte do formulário atual
   formParts[currentStep - 1].classList.remove('active');

   // Avança para a próxima parte do formulário
   steps[currentStep].classList.add('active');
   formParts[currentStep].classList.add('active');
   currentStep++;

   // Atualiza o estilo da barra de progresso
   updateProgressBar();
}

// Adiciona um listener para o clique do botão "Próximo"
nextButtons.forEach(button => {
   button.addEventListener('click', () => {
       goToNextFormPart();
   });
});

// Adiciona um listener para o clique nas etapas da timeline
steps.forEach(step => {
   step.addEventListener('click', () => {
       const stepNumber = Number(step.getAttribute('data-step'));
       if (stepNumber > currentStep) return;
       currentStep = stepNumber;

       // Remove a classe "active" de todas as partes do formulário e etapas da timeline
       formParts.forEach(part => {
           part.classList.remove('active');
       });
       steps.forEach(s => {
           s.classList.remove('active');
       });

       // Adiciona a classe "active" à etapa da timeline e parte do formulário corretas
       step.classList.add('active');
       formParts[currentStep - 1].classList.add('active');

       // Atualiza o estilo da barra de progresso
       updateProgressBar();
   });
});

function updateProgressBar() {
   const progress = ((currentStep - 1) / (steps.length - 1)) * 100;
   barFilled.style.width = `${progress}%`;
}

steps[0].classList.add('active');
formParts[0].classList.add('active');
barFilled.classList.add('active');
