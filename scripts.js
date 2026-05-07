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

  // 4. Custom Datepicker Logic
  const datepicker = document.getElementById('datepicker-solicitud');
  if (datepicker) {
    const dateTrigger = datepicker.querySelector('.datepicker-trigger');
    
    dateTrigger.addEventListener('click', (e) => {
      // Cierra otros selects primero
      customSelects.forEach(s => s.classList.remove('open'));
      datepicker.classList.toggle('open');
      e.stopPropagation();
    });

    const days = datepicker.querySelectorAll('.day:not(.prev-month):not(.next-month)');
    days.forEach(day => {
      day.addEventListener('click', (e) => {
        datepicker.querySelectorAll('.day').forEach(d => d.classList.remove('selected'));
        day.classList.add('selected');
        // Add default background logic or rely on CSS. Since inline style was added in HTML, we will update it or class
        // In the HTML we added inline style background-color to the selected one, better to remove inline style on others.
        datepicker.querySelectorAll('.day').forEach(d => {
          if (d.style.backgroundColor) d.style.backgroundColor = '';
        });
        day.style.backgroundColor = '#1A73E8'; // To match the image blue
        
        datepicker.querySelector('.datepicker-value').textContent = day.textContent.padStart(2, '0') + '/04/2026';
        datepicker.classList.remove('open');
        e.stopPropagation();
      });
    });

    // Prevent closing when clicking inside the dropdown
    datepicker.querySelector('.datepicker-dropdown').addEventListener('click', (e) => {
      e.stopPropagation();
    });

    document.addEventListener('click', () => {
      datepicker.classList.remove('open');
    });
  }

  // 5. Loader Logic for Search
  const searchBtn = document.querySelector('.search-btn');
  const searchLoader = document.getElementById('search-loader');
  const dataTable = document.getElementById('data-table');
  const dataPagination = document.getElementById('data-pagination');

  if (searchBtn && searchLoader && dataTable) {
    searchBtn.addEventListener('click', () => {
      // Hide table and pagination initially on click
      dataTable.style.display = 'none';
      if (dataPagination) dataPagination.style.display = 'none';
      
      // Show loader
      searchLoader.style.display = 'flex';

      // Simulate a network request or data loading
      setTimeout(() => {
        // Hide loader
        searchLoader.style.display = 'none';
        
        // Show table and pagination
        dataTable.style.display = 'block';
        if (dataPagination) dataPagination.style.display = 'flex';
      }, 1500); // 1.5s delay
    });
  }

  // 6. Modal Logic for Apply Button
  const btnApply = document.querySelector('.btn-apply');
  const successModal = document.getElementById('success-modal');
  const btnCloseModal = document.getElementById('btn-close-modal');

  if (btnApply && successModal && btnCloseModal) {
    btnApply.addEventListener('click', () => {
      successModal.style.display = 'flex';
    });

    btnCloseModal.addEventListener('click', () => {
      successModal.style.display = 'none';
    });
  }

  // 7. Skeleton Loader Logic for Detalle.html
  const skeletonLoader = document.getElementById('skeleton-loader');
  const actualContent = document.getElementById('actual-content');

  if (skeletonLoader && actualContent) {
    // Simulamos un tiempo de carga de los datos (e.g. 1.5 segundos)
    setTimeout(() => {
      skeletonLoader.style.display = 'none';
      actualContent.style.display = 'block';
    }, 1500);
  }

});