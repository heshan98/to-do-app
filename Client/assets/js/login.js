function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Validate input
    if (!username || !password) {
        alert('Username and password are required!');
        return;
    }

    // Make HTTP request to login endpoint
    fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('User not found or invalid credentials.');
        }
        return response.json();
    })
    .then(user => {
        console.log('Logged in:', user);
        window.location.href = '/todo.html';
    })
    .catch(error => {
        console.error('Error logging in:', error.message);
        alert(error.message); // Display error message to the user
    });
}

const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission
    login(); // Call the login function
});
