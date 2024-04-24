
function handleFormSubmission(event) {
    event.preventDefault(); 

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!validateInput(username, password)) {
        return;
    }

    // Create data object
    const data = {
        username: username,
        password: password
    };

    // Make POST request
    sendSignUpRequest(data);
}

// Function to validate input fields
function validateInput(username, password) {
    if (!username || !password) {
        alert('All fields are required!');
        return false;
    }
    return true;
}

// Function to send sign-up request
function sendSignUpRequest(data) {
    fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to sign up. Please try again.');
        }
        return response.json();
    })
    .then(responseData => {
        handleSuccessfulSignUp(responseData);
    })
    .catch(error => {
        handleSignUpError(error);
    });
}

// Function to handle successful sign-up
function handleSuccessfulSignUp(responseData) {
    console.log('Sign up successful:', responseData);
    alert('Sign up successful! Please log in.');
    window.location.href = '/login.html'; // Redirect to login page
}

// Function to handle sign-up error
function handleSignUpError(error) {
    console.error('Error signing up:', error.message);
    alert(error.message);
}
