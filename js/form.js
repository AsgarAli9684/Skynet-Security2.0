 
document.addEventListener("DOMContentLoaded", function () {
  
  // EMAILJS CONFIGURATION
  
  const PUBLIC_KEY = "YOUR_PUBLIC_KEY";
  const SERVICE_ID = "YOUR_SERVICE_ID";

  // Separate templates for contact and demo forms
  const CONTACT_TEMPLATE_ID = "YOUR_CONTACT_TEMPLATE_ID";
  const DEMO_TEMPLATE_ID = "YOUR_DEMO_TEMPLATE_ID";

  // INITIALIZE EMAILJS
  
  emailjs.init({
    publicKey: PUBLIC_KEY
  });

  const forms = document.querySelectorAll("form[data-form]");

  forms.forEach(function (form) {

    form.addEventListener("submit", function (event) {

      event.preventDefault();

      // Find button and status message
      const submitButton = form.querySelector(
        'button[type="submit"]'
      );

      const statusElement = form.querySelector(
        ".form-status"
      );

      // Prevent duplicate clicks
      if (submitButton.disabled) {
        return;
      }

      // Validate required fields
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      // Check which form was submitted
      const isContactForm = form.querySelector("#c-first") !== null;

      const isDemoForm = form.querySelector("#d-first") !== null;

      // Select the correct EmailJS template
      const templateID = isContactForm
        ? CONTACT_TEMPLATE_ID
        : DEMO_TEMPLATE_ID;

      // SHOW LOADING
      
      const originalButtonText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";

      if (statusElement) {
        statusElement.textContent = "";
        statusElement.className = "form-status";
      }

      // SEND EMAIL USING EMAILJS
      
      emailjs.sendForm(SERVICE_ID, templateID, form)
      .then(function (response) {
        console.log("SUCCESS!",response.status,response.text);

        // Show success message from HTML
        const successMessage =
          form.dataset.successMessage ||
          "Your message has been sent successfully!";

        if (statusElement) {
          statusElement.textContent = successMessage;
          statusElement.classList.add("success");
        }

        // Clear all form fields
        form.reset();
      })

      .catch(function (error) {
        console.error(
          "EMAILJS FAILED...",
          error
        );

        if (statusElement) {
          statusElement.textContent =
            "Something went wrong. Please try again later.";
          statusElement.classList.add("error");
        }

      })

      .finally(function () {

        // Restore button
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;

      });

    });

  });

});