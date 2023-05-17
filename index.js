const form = document.getElementById("form");
const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const dateOfBirth = document.getElementById("date-of-birth");
const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordConfirmation = document.getElementById("password-confirmation");
const submitBtn = document.getElementById("btn-submit");
const togglePassword = document.getElementById("toggle-password");

firstName.addEventListener("blur", () => validateField(firstName));
lastName.addEventListener("blur", () => validateField(lastName));
dateOfBirth.addEventListener("blur", () => validateField(dateOfBirth));
email.addEventListener("blur", () => validateField(email));
password.addEventListener("blur", () => validateField(password));
passwordConfirmation.addEventListener("blur", () =>
  validateField(passwordConfirmation)
);

const validateField = (field) => {
  const value = field.value.trim();
  const fieldName = field.dataset.field;

  switch (fieldName) {
    case "firstName":
      validateName(field, value, "First name");
      break;
    case "lastName":
      validateName(field, value, "Last name");
      break;
    case "dateOfBirth":
      validateDateOfBirth(field, value, "Date of birth");
      break;
    case "email":
      validateEmail(field, value, "Email");
      break;
    case "password":
      validatePassword(field, value);
      break;
    case "passwordConfirmation":
      validatePasswordConfirmation(
        password.value.trim(),
        field,
        value,
        "Password confirmation"
      );
      break;
    default:
      break;
  }
};

const validateForm = () => {
  const validations = [
    validateName(firstName, firstName.value.trim(), "First name"),
    validateName(lastName, lastName.value.trim(), "Last name"),
    validateDateOfBirth(dateOfBirth, dateOfBirth.value.trim(), "Date of birth"),
    validateEmail(email, email.value.trim(), "Email"),
    validatePassword(password, password.value.trim()),
    validatePasswordConfirmation(
      password.value.trim(),
      passwordConfirmation,
      passwordConfirmation.value.trim(),
      "Password confirmation"
    ),
  ];

  const isValidForm = validations.every((isValid) => isValid);

  return isValidForm;
};

togglePassword.addEventListener("click", function () {
  const type =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  passwordConfirmation.setAttribute("type", type);

  this.classList.toggle("bi-eye");
  const event = new Event("passwordVisibilityToggled");
  document.dispatchEvent(event);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const isValidForm = validateForm();

  if (isValidForm) {
    const requestBody = JSON.stringify({
      firstName: firstName.value.trim(),
      lastName: lastName.value.trim(),
      dateOfBirth: dateOfBirth.value.trim(),
      email: email.value.trim(),
      password: password.value.trim(),
      passwordConfirmation: passwordConfirmation.value.trim(),
    });

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Request Body:", requestBody);
        console.log("Response Data:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});

const setFieldStatus = (el, message, status) => {
  const input = el.parentElement;
  const errorDisplay = input.querySelector(".error");

  errorDisplay.textContent = message;
  input.classList.remove("error", "success");
  input.classList.add(status);
};

const setRequiredError = (el, fieldName) => {
  const message = `${fieldName} is required`;
  setFieldStatus(el, message, "error");
  return false;
};

const validateName = (el, value, fieldName) => {
  if (value === "") {
    return setRequiredError(el, fieldName);
  }

  if (value.length < 2 || value.length > 25) {
    const message = `${fieldName} should be more than 2 symbols but less than 25`;
    setFieldStatus(el, message, "error");
    return false;
  }

  setFieldStatus(el, "", "success");
  return true;
};

const validateEmail = (el, value, fieldName) => {
  if (value === "") {
    return setRequiredError(el, fieldName);
  }

  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  const isValid = emailRegex.test(value);
  if (!isValid) {
    const message = "Email is not valid";
    setFieldStatus(el, message, "error");
    return false;
  }

  setFieldStatus(el, "", "success");
  return true;
};

const validateDateOfBirth = (el, value, fieldName) => {
  if (value === "") {
    return setRequiredError(el, fieldName);
  }

  const selectedDate = new Date(value);
  const currentDate = new Date();

  if (selectedDate > currentDate) {
    const message = "You are from the future! Please pick a real date of birth";
    setFieldStatus(el, message, "error");
    return false;
  }

  setFieldStatus(el, "", "success");
  return true;
};

const validatePassword = (el, value) => {
  if (value === "") {
    return setRequiredError(el.parentElement, "Password");
  }

  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(value);
  const hasNumber = /\d/.test(value);
  const hasSpecialChar = /[!@#$%]/.test(value);

  const errors = [];
  if (value.length < minLength) {
    const message = "Password must be at least 8 characters long";
    errors.push(message);
  }

  if (!hasUppercase) {
    const message = "Password must contain at least one uppercase letter";
    errors.push(message);
  }

  if (!hasNumber) {
    const message = "Password must contain at least one digit";
    errors.push(message);
  }

  if (!hasSpecialChar) {
    const message =
      "Password must contain at least one special character (!@#$%)";
    errors.push(message);
  }

  if (errors.length > 0) {
    const errorMessage = errors.join(". ");
    setFieldStatus(el.parentElement, errorMessage, "error");
    return false;
  }

  setFieldStatus(el.parentElement, "", "success");
  return true;
};

const validatePasswordConfirmation = (passwordValue, el, value, fieldName) => {
  if (value === "") {
    return setRequiredError(el, fieldName);
  }

  if (value !== passwordValue) {
    const message = "Password should be the same";
    setFieldStatus(el, message, "error");
    return false;
  }

  setFieldStatus(el, "", "success");
  return true;
};
