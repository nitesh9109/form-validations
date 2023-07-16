let username = document.querySelector("#username");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let confirmPassword = document.querySelector("#confirm-password");
let form = document.querySelector("form");
let togglePassword = document.querySelector(".pwd");
let togglePasswordConfirm = document.querySelector(".confirmPwd");

let temp = true;
togglePassword.addEventListener("click", () => {
  if (temp) {
    togglePassword.classList = "bi-eye";
    password.type = "text";
    password.style.marginLeft = "-20px";
    temp = false;
  } else {
    togglePassword.classList = "bi bi-eye-slash";
    password.type = "password";
    temp = true;
  }
});

let temp2 = true;

togglePasswordConfirm.addEventListener("click", () => {
  if (temp2) {
    togglePasswordConfirm.classList = "bi-eye";
    confirmPassword.type = "text";
    confirmPassword.style.marginLeft = "-20px";
    temp2 = false;
  } else {
    togglePasswordConfirm.classList = "bi bi-eye-slash";
    confirmPassword.type = "password";
    temp2 = true;
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let isUsernameValid = checkUsername(),
    isEmailValid = checkEmail(),
    isPasswordValid = checkPassword(),
    isconfirmPassword = confirmThePassword();

  let isFromValid =
    isUsernameValid && isEmailValid && isPasswordValid && isconfirmPassword;
});

function isRequired(value) {
  return value == "" ? false : true;
}

function isBetween(length, min, max) {
  return length > min && length < max ? true : false;
}

function isEmailValid(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function isPasswordSecure(password) {
  const re = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  return re.test(password);
}

function showError(input, msg) {
  let formField = input.parentElement;
  formField.classList.remove("success");
  formField.classList.add("error");

  const error = formField.querySelector("small");
  error.textContent = msg;
}

function showSuccess(input, msg) {
  let formField = input.parentElement;
  formField.classList.remove("error");
  formField.classList.add("success");

  const error = formField.querySelector("small");
  error.textContent = msg;
}

function checkUsername() {
  let valid = false;
  const min = 3,
    max = 25;
  const userN = username.value.trim();

  if (!isRequired(userN)) {
    showError(username, "Username cannot be blank");
  } else if (!isBetween(userN.length, min, max)) {
    showError(
      username,
      `Username must be between ${min} and ${max} characters.`
    );
  } else {
    showSuccess(username);
    valid = true;
  }
  return valid;
}

function checkEmail() {
  let valid = false;
  const emailE1 = email.value.trim();

  if (!isRequired(emailE1)) {
    showError(email, "Email cannot be blank");
  } else if (!isEmailValid(emailE1)) {
    showError(email, "Email is not valid");
  } else {
    showSuccess(email);
    valid = true;
  }

  return valid;
}

function checkPassword() {
  let valid = false;
  const passwordE1 = password.value.trim();

  if (!isRequired(passwordE1)) {
    showError(password, "Password cannot be blank");
  } else if (!isPasswordSecure(passwordE1)) {
    showError(
      password,
      "Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*"
    );
  } else {
    showSuccess(password);
    valid = true;
  }

  return valid;
}

function confirmThePassword() {
  let valid = false;

  const confirmPasswordE1 = confirmPassword.value.trim();
  let passwordE1 = password.value.trim();

  if (!isRequired(confirmPasswordE1)) {
    showError(confirmPassword, "Please enter the password again");
  } else if (passwordE1 !== confirmPasswordE1) {
    showError(confirmPassword, "Confirm password does not match");
  } else {
    showSuccess(confirmPassword);
    valid = true;
  }
  return valid;
}
