////////////////////////////////////////////////////
// Registration form validation
////////////////////////////////////////////////////
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

    // Password validation
    const passwordVal = password.value;
    console.log(`password: ${passwordVal}`);
    if (!validatePassword(passwordVal, usernameVal)) {
        password.focus();
        return;
    }

    // Terms validation
    if (!terms.checked) {
        displayError('You must agree to the Terms of Use.');
        return;
    }

    // If all validations pass, store user data in localStorage
    storeUser(usernameVal, emailVal, passwordVal);

    // Clear the form and display successful registration message
    event.target.reset();
    displaySuccess('Registration successful!');
});


console.log(document.getElementById('registration'))

function displayError(message) {
    console.log('Error display:', message);
    const errorDisplay = document.getElementById('errorDisplay');
    errorDisplay.textContent = message;
    errorDisplay.style.display = 'block';
}

function displaySuccess(message) {
    const errorDisplay = document.getElementById('errorDisplay');
    errorDisplay.innerHTML = message;
    errorDisplay.style.display = 'block';
    errorDisplay.style.color = 'green';
    errorDisplay.style.fontWeight = 'bold';
}

// Example: clearing the error display after successful submission
// function clearErrorDisplay() {
//     const errorDisplay = document.getElementById("errorDisplay");
//     errorDisplay.innerHTML = ""; // Clear any messages
//     errorDisplay.style.display = "none"; // Hide the display
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
        // check if Username already exists
        const users = JSON.parse(localStorage.getItem('users')) || {};
        if (users[username.toLowerCase()]) {
            displayError("That username is already taken.");
            return false;
        }
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

// Password validation
function validatePassword(password, username) {
    try {
        if (password.length < 12) {
            displayError("Passwords must be at least 12 characters long.");
            return false;
        }
        if (!/[A-Z]/.test(password)) {
            displayError("Passwords must contain at least one uppercase letter.");
            return false;
        }
        if (!/[a-z]/.test(password)) {
            displayError("Passwords must contain at least one lowercase letter.");
            return false;
        }
        if (!/[0-9]/.test(password)) {
            displayError("Passwords must contain at least one number.");
            return false;
        }
        if (!/[!@#$%^&*]/.test(password)) {
            displayError("Passwords must contain at least one special character.");
            return false;
        }
        if (password.toLowerCase().includes("password")) {
            displayError("Passwords cannot contain the word 'password'.");
            return false;
        }
        if (password.toLowerCase().includes(username.toLowerCase())) {
            displayError("Passwords cannot contain the username.");
            return false;
        }
        return true;
    } catch (error) {
        console.error('Password validation error:', error);
        displayError("An unexpected error occurred during password validation.");
        return false;
    }
}

// Store user data in localStorage
function storeUser(username, email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    users[username.toLowerCase()] = { email: email.toLowerCase(), password: password };
    localStorage.setItem('users', JSON.stringify(users));
    console.log(users);
}

////////////////////////////////////////////////////
// Login form validation
////////////////////////////////////////////////////
const loginForm = document.getElementById('login');

// Get the username and password fields
const loginUsername = loginForm.querySelector('input[name="username"]');
const loginPassword = loginForm.querySelector('input[name="password"]');
const keepLoggedIn = loginForm.querySelector('input[name="persist"]');

loginForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission for validation
    console.log('Username:', loginUsername.value);
    console.log('Password:', loginPassword.value);

    // Clear previous errors
    errorDisplay.style.display = 'none';
    errorDisplay.innerHTML = '';

    // Username validation
    if (!validateLoginUsername(loginUsername.value)) {
        loginUsername.focus();
        return;
    }
    // Password validation
    if (!validateLoginPassword(loginUsername.value, loginPassword.value)) {
        loginPassword.focus();
        return;
    }

    // If all validations pass, clear the form fields
    loginUsername.value = '';
    loginPassword.value = '';

    // Handle successful login
    if (keepLoggedIn.checked) {
        displaySuccess("Login successful! (Keep me logged in selected)");
    } else {
        displaySuccess("Login successful! (Keep me logged in NOT selected)");
    }
});

// Validate login username
function validateLoginUsername(username) {
    if (username === "") {
        displayError("Username cannot be blank.");
        return false;
    }
    // Check if user already exists in localStorage
    const users = JSON.parse(localStorage.getItem('users')) || {};
    if (!users[username.toLowerCase()]) {
        displayError("Username does not exist.");
        return false;
    }
    return true;
}

// Validate login password
function validateLoginPassword(username, password) {
    if (password === "") {
        displayError("Password cannot be blank.");
        return false;
    }
    // Check if user password is correct in localStorage
    const users = JSON.parse(localStorage.getItem('users')) || {};
    const storedUser = users[username.toLowerCase()];
    if (!storedUser || storedUser.password !== password) {
        displayError("Incorrect password.");
        return false;
    }
    return true;
}
