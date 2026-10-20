const form = document.getElementById("contactForm");

const fields = {
name: document.getElementById("name"),
email: document.getElementById("email"),
phone: document.getElementById("phone"),
message: document.getElementById("message")
};

const statusMessage = document.getElementById("formStatus");

const emailPattern = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
const phonePattern = /^[+]?[\d\s()-]{7,20}$/;

function validateField(field) {
const value = field.value.trim();
let error = "";

switch (field.name) {
    case "name":
        if (value === "") {
            error = "Please enter your full name.";
        } else if (value.length < 2) {
            error = "Name must contain at least 2 characters.";
        }
        break;

    case "email":
        if (value === "") {
            error = "Please enter your email address.";
        } else if (!emailPattern.test(value)) {
            error = "Please enter a valid email address.";
        }
        break;

    case "phone":
        if (value === "") {
            error = "Please enter your phone number.";
        } else if (!phonePattern.test(value)) {
            error = "Please enter a valid phone number.";
        } else if (value.replace(/\D/g, "").length < 7) {
            error = "Phone number must contain at least 7 digits.";
        }
        break;

    case "message":
        if (value === "") {
            error = "Please enter your message.";
        } else if (value.length < 10) {
            error = "Message must contain at least 10 characters.";
        }
        break;
}

const errorElement = document.getElementById(
    field.id + "Error"
);

errorElement.textContent = error;
field.setAttribute("aria-invalid", error ? "true" : "false");

return error === "";
}

// Live validation while the user types
Object.values(fields).forEach(function (field) {
field.addEventListener("input", function () {
validateField(field);
statusMessage.textContent = "";
});

field.addEventListener("blur", function () {
    if (field.value.trim() !== "") {
        validateField(field);
    }
});
});

// Validate all fields before submission
form.addEventListener("submit", function (event) {
event.preventDefault();

let formIsValid = true;
let firstInvalidField = null;

Object.values(fields).forEach(function (field) {
    const isValid = validateField(field);

    if (!isValid) {
        formIsValid = false;

        if (!firstInvalidField) {
            firstInvalidField = field;
        }
    }
});

if (!formIsValid) {
    statusMessage.textContent =
        "Please correct the errors before submitting.";

    firstInvalidField.focus();
    return;
}

statusMessage.textContent =
    "Thank you! Your message has been validated successfully.";

form.reset();

Object.values(fields).forEach(function (field) {
    field.removeAttribute("aria-invalid");
});
});

