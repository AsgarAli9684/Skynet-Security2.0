

  document.querySelectorAll('form[data-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      let status = form.querySelector('.form-status');
      if (status) {
        status.textContent = form.getAttribute('data-success-message') ||
          "Thanks — we've received your message and will be in touch shortly.";
        status.classList.add('is-visible', 'success');
      }
      form.reset();
    });
  });