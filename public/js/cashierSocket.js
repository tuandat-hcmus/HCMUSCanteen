
$(() => {
    const socket = io();
    socket.emit('identify', { role: 'nv' });

    socket.on('customerOrder', (data) => {
        if (data) {
            console.log(data.bill);
            $('#billtbody').prepend($(`
            <tr id='${data.bill.MaHD}'>
                <td>1</td>
                <td>${data.bill.MaHD}</td>
                <td>${data.bill.PhuongThucTT}</td>
                <td>${data.bill.TinhTrang}</td>
                <td><i class="bx bx-file-find btn-detail"></i></td>
            </tr>
            `));
            const status = $('#' + data.bill.MaHD).find("td:nth-child(4)").text();
            console.log(status);
            switch (status) {
                case "Đã thanh toán":
                    $('#' + data.bill.MaHD).find("td:nth-child(4)").toggleClass("paid");
                    break;
                case "Chưa thanh toán":
                    $('#' + data.bill.MaHD).find("td:nth-child(4)").toggleClass("pending");
                    break;
                case "Hủy":
                    $('#' + data.bill.MaHD).find("td:nth-child(4)").toggleClass("canceled");
                    break;
            }

            $('#customerinfo').prepend($(`
            <div class="client">
                <div class="no">1</div>
                <div> <img src="" alt="" class="img-client" /></div>
                <div class="name-time">
                    <div class="_name">
                        ${data.user.UserName}
                    </div>
                    <div class="_time">
                        0 phút trước
                    </div>
                </div>
            </div>
            `));
        }
    });
})