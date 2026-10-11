const form = document.getElementById("contact-form");

const fields = {
  name: document.getElementById("name"),
  email: document.getElementById("email"),
  message: document.getElementById("message")
};

const formStatus = document.getElementById("form-status");

const touched = {
  name: false,
  email: false,
  message: false
};

let submitAttempted = false;


function validateForm(values) {
  const errors = {};

  const fullName = values.name.trim();
  const nameParts = fullName.split(/\s+/);

  if (!fullName) {
    errors.name = "Enter your first and last name.";
  } else if (
    nameParts.length < 2 ||
    nameParts.some(part => part.length < 2)
  ) {
    errors.name = "Enter both first and last name.";
  }

  const email = values.email.trim();

  if (!email) {
    errors.email = "Please enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email, like name@example.com.";
  }

  const message = values.message.trim();

  if (!message) {
    errors.message = "Please enter your message.";
  } else if (message.length < 3) {
    errors.message = "Message must be at least 3 characters.";
  }

  return errors;
}


function getValues() {
  return {
    name: fields.name.value,
    email: fields.email.value,
    message: fields.message.value
  };
}


function showErrors() {
  const errors = validateForm(getValues());

  for (const fieldName in fields) {
    const input = fields[fieldName];
    const errorElement = document.getElementById(`${fieldName}-error`);

    const shouldShowError = touched[fieldName] || submitAttempted;
    const message = shouldShowError ? errors[fieldName] : "";

    errorElement.textContent = message || "";

    if (message) {
      input.setAttribute("aria-invalid", "true");
    } else {
      input.removeAttribute("aria-invalid");
    }
  }

  return errors;
}


for (const fieldName in fields) {
  const input = fields[fieldName];

  input.addEventListener("blur", function () {
    touched[fieldName] = true;
    showErrors();
  });

  input.addEventListener("input", function () {
    showErrors();
    formStatus.textContent = "";
  });
}


form.addEventListener("submit", function (event) {
  event.preventDefault();

  submitAttempted = true;

  const errors = showErrors();

  if (Object.keys(errors).length === 0) {
    formStatus.textContent = "Your message has been validated successfully!";

    form.reset();

    submitAttempted = false;

    for (const fieldName in touched) {
      touched[fieldName] = false;
    }

    showErrors();
  } else {
    formStatus.textContent = "";

    const firstInvalidField = Object.keys(errors)[0];
    fields[firstInvalidField].focus();
  }
});