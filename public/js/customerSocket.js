$(() => {
    let name = $('#username').val();
    let ggname = null;
    if ($('#ggid').val()) {
        ggname = name;
        name = $('#ggid').val();
    }
    // console.log($('#ggid').val());
    const socket = io();
    socket.emit('identify', { role: 'khach' });

    $('#order-btn').on('click', function () {
        const payment = $("input[name ='options']:checked").val()
        sendData = JSON.stringify(orderArr);
        let formData = new FormData();
        formData.append('data', sendData);
        formData.append('payment', payment);
        formData.append('name', name);
        formData.append('sum', money());
        formData.append('ggname', ggname);
        // console.log(formData);
        $.ajax({
            url: `/client/order`,
            method: 'POST',
            data: formData,
            processData: false, // Set to false to prevent jQuery from processing data
            contentType: false, // Set to false to prevent jQuery from setting contentType
            cache: false, // Prevent caching
            success: function (data) {
                console.log('success');

                if (data) {
                    socket.emit('sendOrder', {
                        user: data.user,
                        bill: data.bill
                    });
                }
            },
            error: function (err) {
                console.error('Error fetching data:', err);
            }
        });
    });

    socket.on('orderCallback', (data) => {
        if (data === 'Success') {

        }
        else if (data === 'Failed') {

        }
        else {

        }
    });

    socket.on('orderResult', (data) => {

    });
})