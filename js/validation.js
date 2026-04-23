/* Disclaimer, I wrote this code, based on the template provided. */
let phoneRegex = /^\+?[1-9]\d{1,14}$/;
let emailRegex = /[\w]*@[\w]*.{1}(com|gov|edu|io|net){1}/;
let zipCodeRegex = /(?<zip1>\d{5})([-]?(?<zip2>\d{4}))?(?<ERROR>.+)?/

const stateAbbreviations = [
  'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA',
  'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA',
  'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND',
  'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT',
  'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'
];

let form=null;
let successMsg=null;

function initValidation(formId, successId) {
  form = document.getElementById(formId);
  successMsg = document.getElementById(successId);

  let inputs = form.querySelectorAll("input");
  for (const input of inputs) {
    input.addEventListener("input", fieldInteracted);
    input.addEventListener("blur", fieldInteracted);
  }
  form.addEventListener("submit", submitForm );
}

function fieldInteracted(ev) {
  let el = ev.currentTarget;
  validateForm();
  el.classList.add("was-validated");
}

function submitForm(ev) {
  console.log("in submit");
  let form=ev.currentTarget;
  ev.preventDefault();
  ev.stopPropagation();

  validateForm();

  if (!form.checkValidity()) {
    const allInputs = form.querySelectorAll("input");
    allInputs.forEach((input) => input.classList.add("was-validated"));
  } else {
    const formContainer = document.getElementById("form-container");
    const showFormBtn = document.getElementById("show-form-btn");
    const successElement = successMsg || document.getElementById("success-message");

    if (successElement) {
      successElement.hidden = false;
    }
    if (formContainer) {
      formContainer.hidden = true;
    }
    if (showFormBtn) {
      showFormBtn.textContent = "Open Contact Form";
    }
  }
}

function validateForm() {
  checkRequired("first-name", "First Name is Required");
  checkRequired("last-name", "Last Name is Required");
  checkRequired("address", "Address is Required");
  checkRequired("city", "City is Required");
  
  if(checkRequired("state", "State is Required")){
    validateState("state", "Not a valid State, enter two digit code e.g., UT");
  }
 
  if (checkRequired("email", "Email Address is required")) {
    checkFormat("email", "email format is bad", emailRegex)
  }
  if (checkRequired("zip", "Zip Code is Required")) {
    checkFormat("zip", `malformed zip-code, please use either "#####", or "#####-#### format.`, zipCodeRegex)
  }
  if (checkRequired("phone", "Phone is required")) {
    checkFormat("phone", "phone format is bad", phoneRegex)
  }
  checkRequired("find-internet", "You must select at least one option.");

}

function validateState(id, msg) {
  let el = document.getElementById(id);
  let valid = false;
  const value = el.value.trim().toUpperCase();
  valid = stateAbbreviations.includes(value);
 
  setElementValidity(id, valid, msg);
  return valid;
}

function checkFormat(id, msg, regex) {
  const el = document.getElementById(id);
  const valid = regex.test(el.value.trim());

  setElementValidity(id, valid, msg);
  return valid;

}

function checkRequired(id, message) {
  let el = document.getElementById(id);
  let valid = false;
  let type = el.type;
  switch (type) {
    case 'text':
    case 'email':
    case 'tel':
    case 'password':
      valid = el.value.trim().length > 0;
      break;

    case 'checkbox':
    case 'radio':
      const options = document.querySelectorAll(`input[name="${el.name}"]`);
      valid = Array.from(options).some((option) => option.checked);
      break;

    default:
      valid = el.value.trim().length > 0;
  }
  setElementValidity(id, valid, message);
  

  return valid;
}

function setElementValidity(id, valid, message) {
  let el = document.getElementById(id);

  if (valid) {
    el.setCustomValidity('');
  } else {
    el.setCustomValidity(message);
  }

  const feedback = document.getElementById(`${id}-error`);
  if (feedback) {
    feedback.textContent = valid ? '' : message;
  }
}