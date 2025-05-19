// Verificar si ya hay una sesión activa al cargar la página
if (localStorage.getItem('currentUser')) {
    window.location.href = '../index.html';
}

document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
    
    // Validación básica de campos
    if (!username || !password) {
        errorMessage.textContent = 'Por favor complete todos los campos';
        errorMessage.style.display = 'block';
        return;
    }

    // Obtener usuarios registrados
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Buscar usuario (comparación case-insensitive)
    const user = users.find(u => 
        u.username.toLowerCase() === username.toLowerCase() && 
        u.password === password
    );
    
    if (user) {
        // Crear objeto de sesión (sin contraseña por seguridad)
        const userSession = {
            username: user.username,
            email: user.email,
            timestamp: new Date().getTime()
        };
        
        // Guardar sesión
        localStorage.setItem('currentUser', JSON.stringify(userSession));
        
        // Ocultar mensaje de error si existe
        errorMessage.style.display = 'none';
        
        // Redirigir después de breve retraso para mejor UX
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 500);
    } else {
        errorMessage.textContent = 'Usuario o contraseña incorrectos';
        errorMessage.style.display = 'block';
        
        // Limpiar campo de contraseña
        document.getElementById('password').value = '';
    }
});