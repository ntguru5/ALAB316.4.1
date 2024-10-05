const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const passwordCheck = document.getElementById('passwordCheck');
const terms = document.getElementById('terms');
const errorDisplay = document.getElementById('errorDisplay');

document.getElementById('registration').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission for validation

    // Clear previous errors
    errorDisplay.style.display = 'none';
    errorDisplay.innerHTML = '';


    // Username validation
    const usernameVal = username.value;
    console.log(usernameVal);
    if (!validateUsername(usernameVal)){
        username.focus();
        return;
    }
    // Email validation
    const emailVal = email.value;
    console.log(emailVal);
    if (!validateEmail(emailVal)) {
        email.focus();
        return;
    }



});

console.log(document.getElementById('registration'))
// Display error message and return focus to the input
function displayError(message) {
    console.log('Error display:', message);
    const errorDisplay = document.getElementById('errorDisplay');
    errorDisplay.textContent = message;
    errorDisplay.style.display = 'block';
    // input.focus(); //focus on the field that caused the error
}

// function displaySuccess(message) {
//     const errorDisplay = document.getElementById('errorDisplay');
//     errorDisplay.innerHTML = message;
//     errorDisplay.style.display = 'block';
//     errorDisplay.style.color = 'green';
// }

// function clearErrorDisplay() {
//     console.log('clear error display')
// }

// Username validation
function validateUsername(username) {
    console.log('username value', username);
    try {
        if (username === "") {
            displayError("Username cannot be blank.");
            return false;
        }
        if (username.length < 4) {
            displayError("Username must be at least four characters long.");
            return false;
        }
        const uniqueChars = new Set(username);
        if (uniqueChars.size < 2) {
            displayError("Username must contain at least two unique characters.");
            return false;
        }
        if (/[^a-zA-Z0-9]/.test(username)) {
            displayError("Username cannot contain special characters or whitespace.");
            return false;
        }
        // if (userExists(username)) {
        //     displayError("That username is already taken.");
        //     return false;
        // }
        return true;
    } catch (error) {
        // Handle unexpected errors
        console.error('Validation error:', error);
        displayError('An unexpected error occurred during validation.');
        return false;
    }
}

// Email validation
function validateEmail(email) {
    try {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            displayError("Please provide a valid email address.");
            return false;
        }
        if (email.endsWith("@example.com")) {
            displayError("Email cannot be from the domain 'example.com'.");
            return false;
        }
        return true;
    } catch (error) {
        // Handle any unexpected errors
        console.error('Validation error:', error);
        displayError("An unexpected error occurred during email validation.");
        return false;
    }
}
