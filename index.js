const usernameInput = document.getElementById("usernameInput");
const userEmailInput = document.getElementById("userEmailInput");
const userPasswordInput = document.getElementById("userPasswordInput");
const signupBtn = document.getElementById("signupBtn");

let usersinfo;
try {
  usersinfo = JSON.parse(localStorage.getItem("users")) || [];
} catch (e) {
  usersinfo = [];
}

function usernameValidation() {
  const regex = /^[A-Za-z]{3,10}(\s?[A-Za-z]{3,10})?$/;
  const usernameAlert = document.getElementById("usernameAlert");
  if (usernameAlert && regex.test(usernameInput.value)) {
    usernameInput.classList.add("is-valid");
    usernameInput.classList.remove("is-invalid");
    usernameAlert.classList.replace("d-block", "d-none");
    return true;
  } else {
    usernameInput.classList.add("is-invalid");
    usernameInput.classList.remove("is-valid");
    if (usernameAlert) {
      usernameAlert.classList.replace("d-none", "d-block");
    }
    return false;
  }
}

function userPasswordValidation() {
  const regex = /^.{5,15}$/;
  const userPasswordAlert = document.getElementById("userPasswordAlert");
  if (userPasswordAlert && regex.test(userPasswordInput.value)) {
    userPasswordInput.classList.add("is-valid");
    userPasswordInput.classList.remove("is-invalid");
    userPasswordAlert.classList.replace("d-block", "d-none");
    return true;
  } else {
    userPasswordInput.classList.add("is-invalid");
    userPasswordInput.classList.remove("is-valid");
    if (userPasswordAlert) {
      userPasswordAlert.classList.replace("d-none", "d-block");
    }
    return false;
  }
}

function userEmailValidation() {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const userEmailAlert = document.getElementById("userEmailAlert");
  if (userEmailAlert && regex.test(userEmailInput.value)) {
    userEmailInput.classList.add("is-valid");
    userEmailInput.classList.remove("is-invalid");
    userEmailAlert.classList.replace("d-block", "d-none");
    return true;
  } else {
    userEmailInput.classList.add("is-invalid");
    userEmailInput.classList.remove("is-valid");
    if (userEmailAlert) {
      userEmailAlert.classList.replace("d-none", "d-block");
    }
    return false;
  }
}

function isExist() {
  const accountExistMsg = document.getElementById("accountExistMsg");

  for (let i = 0; i < usersinfo.length; i++) {
    if (
      usersinfo[i].name.toLowerCase() === usernameInput.value.toLowerCase() ||
      usersinfo[i].email.toLowerCase() === userEmailInput.value.toLowerCase()
    ) {
      if (accountExistMsg) {
        accountExistMsg.classList.replace("d-none", "d-block");
      }
      usernameInput.classList.remove("is-valid");
      userEmailInput.classList.remove("is-valid");
      userPasswordInput.classList.remove("is-valid");
      return true;
    }
  }
  return false;
}

function userInputsValidation() {
  const isUsernameValid = usernameValidation();
  const isEmailValid = userEmailValidation();
  const isPasswordValid = userPasswordValidation();
  return isUsernameValid && isEmailValid && isPasswordValid;
}

function signUp() {
  const confirmMsg = document.getElementById("confirmMsg");
  const signin = document.getElementById("signin");
  const tryAgainMsg = document.getElementById("tryAgainMsg");

  if (userInputsValidation() && !isExist()) {
    const user = {
      name: usernameInput.value,
      email: userEmailInput.value,
      password: userPasswordInput.value,
    };
    usersinfo.push(user);
    localStorage.setItem("users", JSON.stringify(usersinfo));
    if (confirmMsg) confirmMsg.classList.replace("d-none", "d-block");
    if (signin) signin.classList.replace("d-none", "d-block");
  } else {
    if (tryAgainMsg) tryAgainMsg.classList.replace("d-none", "d-block");
  }
}

var username = localStorage.getItem("sessionUserName");

function login() {
  const loginEmail = document.getElementById("loginEmail");
  const loginPassword = document.getElementById("loginPassword");
  const loginBtn = document.getElementById("loginBtn");
  const wrongMsg = document.getElementById("wrongMsg");
  const fillMsg = document.getElementById("fillMsg");

  if (!loginEmail.value || !loginPassword.value) {
    if (fillMsg) fillMsg.classList.replace("d-none", "d-block");
    return false;
  }

  for (let i = 0; i < usersinfo.length; i++) {
    if (
      usersinfo[i].email.toLowerCase() === loginEmail.value.toLowerCase() &&
      usersinfo[i].password === loginPassword.value
    ) {
      localStorage.setItem("sessionUserName", usersinfo[i].name);
      if (loginBtn) loginBtn.setAttribute("href", "welcome.html");
      return;
    }
  }

  if (wrongMsg) wrongMsg.classList.replace("d-none", "d-block");
}

function displayWelcomeUser() {
  const usernameDisplay = document.getElementById("username");
  if (usernameDisplay) {
    usernameDisplay.innerHTML = `Welcome ya ${username}`;
  }
}

function logout() {
  localStorage.removeItem("sessionUserName");
}
