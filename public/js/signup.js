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


$("#signup-form").validate({
    rules: {
        fullname: {
            required: true,
            pattern: /^(?:[A-ZÀ-Ỹ][a-zà-ỹ]*)+(?:\s+(?:[A-ZÀ-Ỹ][a-zà-ỹ]*)+)*$/,
        },
        username: {
            required: true,
            pattern: /^[a-zA-Z_][a-zA-Z0-9_]*$/,
        },
        email: {
            required: true,
            pattern: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
        },
        phone: {
            required: true,
            pattern: /^0\d{9}$/,
        },
        birth: {
            required: true,
        },
        password: {
            required: true,
        },
        re_password: { 
            required: true,
            equalTo: "#password",
        },
        gender:{
            required:true,
        },
    },
    messages: {
        fullname: {
            required:"Chưa nhập trường này",
            pattern: "Họ tên không hợp lệ.",
        },
        username: {
            required:"Chưa nhập trường này",
            pattern: "Tên tài khoản không được chứa kí tự đặc biệt",
        },
        email: {
            required:"Chưa nhập trường này",
            pattern: "Email không hợp lệ",
        },
        phone: {
            required:"Chưa nhập trường này",
            pattern: "Số điện thoại không hợp lệ",
        },
        birth: {
            required:"Chưa nhập trường này",  
        },
        password: {
            required:"Chưa nhập trường này",
            
        },
        re_password: {
            required:"Chưa nhập trường này",
            equalTo: "Mật khẩu không khớp",
        },
        gender:{
            required:"Chưa nhập trường này",
        },
    },
    submitHandler: function (form) {
        
    },
});






