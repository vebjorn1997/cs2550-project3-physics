/* Disclaimer, I did not write this code. */
document.addEventListener("DOMContentLoaded", function() {
    initValidation("myform");

    const showFormBtn = document.getElementById("show-form-btn");
    const formContainer = document.getElementById("form-container");
    const successMessage = document.getElementById("success-message");

    showFormBtn.addEventListener("click", function () {
        formContainer.hidden = !formContainer.hidden;
        showFormBtn.textContent = formContainer.hidden ? "Open Contact Form" : "Hide Contact Form";    
        successMessage.hidden = true;
    });

});