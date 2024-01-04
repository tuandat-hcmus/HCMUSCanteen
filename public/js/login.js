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

function toggleConfirmPasswordVisibility(inputId) {
    const passwordInput = document.getElementById(inputId);
    const showIcon1 = document.querySelector('.show1');
    const hideIcon1 = document.querySelector('.hide1');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        showIcon1.style.display = 'none';
        hideIcon1.style.display = 'inline';
    } else {
        passwordInput.type = 'password';
        showIcon1.style.display = 'inline';
        hideIcon1.style.display = 'none';
    }
}