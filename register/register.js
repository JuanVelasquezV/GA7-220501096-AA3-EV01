document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
    
    // Validaciones
    if (!username || !email || !password) {
        errorMessage.textContent = 'Todos los campos son obligatorios';
        errorMessage.style.display = 'block';
        return;
    }

    if (username.length < 4) {
        errorMessage.textContent = 'El usuario debe tener al menos 4 caracteres';
        errorMessage.style.display = 'block';
        return;
    }

    if (password.length < 6) {
        errorMessage.textContent = 'La contraseña debe tener al menos 6 caracteres';
        errorMessage.style.display = 'block';
        return;
    }

    // Verificar usuario/email existente
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
        errorMessage.textContent = 'El usuario ya existe';
        errorMessage.style.display = 'block';
        return;
    }

    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        errorMessage.textContent = 'El correo ya está registrado';
        errorMessage.style.display = 'block';
        return;
    }

    // Registrar nuevo usuario
    users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    
    // Feedback y redirección
    alert('¡Registro exitoso! Serás redirigido al login');
    window.location.href = './login.html';
});