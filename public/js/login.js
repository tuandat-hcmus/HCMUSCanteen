function togglePasswordVisibility(inputId) {
    const passwordInput = document.getElementById(inputId);
    const showIcon = document.querySelector('.show');
    const hideIcon = document.querySelector('.hide');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        showIcon.style.display = 'none';
        hideIcon.style.display = 'inline';
    } else {
        passwordInput.type = 'password';
        showIcon.style.display = 'inline';
        hideIcon.style.display = 'none';
    }
}