document.addEventListener('DOMContentLoaded', () => {

  const customSelects = document.querySelectorAll('.custom-select');

  customSelects.forEach(select => {
    const trigger = select.querySelector('.select-trigger');
    const options = select.querySelectorAll('.select-option');
    const valueDisplay = select.querySelector('.select-value');

    // 1. Abrir/Cerrar al hacer clic en la caja
    trigger.addEventListener('click', (e) => {
      // Cierra otros selects que estén abiertos
      customSelects.forEach(s => {
        if (s !== select) s.classList.remove('open');
      });
      // Alterna el estado del actual
      select.classList.toggle('open');
      e.stopPropagation(); // Evita que el evento burbujee al document
    });

    // 2. Comportamiento al elegir una opción
    options.forEach(option => {
      option.addEventListener('click', (e) => {
        // Actualiza el texto visual
        valueDisplay.textContent = option.textContent;

        // Remueve la clase 'selected' de todos y la añade al actual
        options.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');

        // Cierra el menú (esto activa la animación de cierre y rota la flecha)
        select.classList.remove('open');
        e.stopPropagation();
      });
    });
  });

  // 3. Cerrar el select si se hace clic fuera de él
  document.addEventListener('click', () => {
    customSelects.forEach(select => {
      select.classList.remove('open');
    });
  });

});