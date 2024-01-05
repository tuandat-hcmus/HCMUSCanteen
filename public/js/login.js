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

function errorValid(inputID) {
    if (!inputID) {

        errorValid('user');
        errorValid('password');

        console.log(errorValid('user'));
        console.log(errorValid('password'));

        if (errorValid('user') &&errorValid('password')) {
            document.getElementById("đăng nhập").disabled = 0;
            return true;
        }
        document.getElementById("đăng nhập").disabled = true;
        return 0;





    }
    else {
        const input = document.getElementById(inputID);
        const errorElement = document.getElementById(`error_${inputID}`);


        if (!input.value) {
            errorElement.style.visibility = 'visible';
            document.getElementById("đăng nhập").disabled = true;

            return 0;

        }       
        else {
            errorElement.style.visibility = 'hidden';
            document.getElementById("đăng nhập").disabled = 0;

            return true;
        }
    }


}


