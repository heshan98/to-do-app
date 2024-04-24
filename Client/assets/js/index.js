
function handleFormSubmission(event) {
    event.preventDefault(); 

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!validateInput(username, password)) {
        return;
    }


    const data = {
        username: username,
        password: password
    };

   
    sendSignUpRequest(data);
}


function validateInput(username, password) {
    if (!username || !password) {
        alert('All fields are required!');
        return false;
    }
    return true;
}


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


function handleSuccessfulSignUp(responseData) {
    console.log('Sign up successful:', responseData);
    alert('Sign up successful! Please log in.');
    window.location.href = '/login.html'; // Redirect to login page
}


function handleSignUpError(error) {
    console.error('Error signing up:', error.message);
    alert(error.message);
}

document.getElementById('registerForm').addEventListener('submit', handleFormSubmission);
