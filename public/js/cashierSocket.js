$(() => {
    loadData();
    const socket = io();
    socket.emit('identify', { role: 'nv' });

    socket.on('customerOrder', (data) => {
        if (data) {
            loadData();
        }
    });
});

function loadData() {
    $.ajax({
        url: `/cashier/loaddata`,
        method: 'POST',
        processData: false, // Set to false to prevent jQuery from processing data
        contentType: false, // Set to false to prevent jQuery from setting contentType
        cache: false, // Prevent caching
        success: function (data) {
            console.log(data);
            $('#billtbody').empty();
            for (let i = 0; i < data.bill.length; i++) {
                $('#billtbody').append($(`
                    <tr id="${data.bill[i].MaHD}">
                        <td>${i + 1}</td>
                        <td>${data.bill[i].MaHD}</td>
                        <td>${data.bill[i].PhuongThucTT}</td>
                        <td>${data.bill[i].TinhTrang}</td>
                        <td><i class="bx bx-file-find btn-detail"></i></td>
                    </tr>
                    `));
            }
            $('#customerinfo').empty();
            for (let i = 0; i < data.customer.length; i++) {
                $('#customerinfo').append($(`
                    <div class="client">
                        <div class="no">${i + 1}</div>
                        <div> <img src="" alt="" class="img-client" /></div>
                        <div class="name-time">
                            <div class="_name">
                                ${data.customer[i].user.UserName}
                            </div>
                            <div class="_time">
                                ${data.customer[i].time} phút trước
                            </div>
    
                        </div>
                    </div>
                    `));
            }
            const rows = $("tbody tr");
            rows.each(function () {
                const statusCell = $(this).find("td:nth-child(4)");
                const status = statusCell.text();

                switch (status) {
                    case "Đã thanh toán":
                        statusCell.toggleClass("paid");
                        break;
                    case "Chưa thanh toán":
                        statusCell.toggleClass("pending");
                        statusCell.append(`<button id="${this.id}btn" onclick="handleClick(${this.id})">Xác nhận</button>`);
                        break;
                    case "Hủy":
                        statusCell.toggleClass("canceled");
                        break;
                }
            })
        },
        error: function (err) {
            console.error('Error fetching data:', err);
        }
    });
}

function handleClick(id) {
    $.ajax({
        url: `/cashier/updatedata?id=${id}`,
        method: 'GEt',
        success: function (data) {
            loadData();
        },
        error: function (err) {
            console.error('Error fetching data:', err);
        }
    });
}