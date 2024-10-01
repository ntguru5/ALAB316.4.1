document.getElementById('registration').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission for validation
    const username = event.target.username;
    const email = event.target.email;
    const password = event.target.password;
    const passwordCheck = event.target.passwordCheck;
    const terms = event.target.terms;
    const errorDisplay = document.getElementById('errorDisplay');



});
