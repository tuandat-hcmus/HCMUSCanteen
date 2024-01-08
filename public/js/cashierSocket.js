$(() => {
    loadData();
    const socket = io();
    socket.emit('identify', { role: $('#role').val() });

    socket.on('customerOrder', (data) => {
        if (data) {
            console.log(data);
            //loadData();
            $('#billtbody').prepend($(`
                    <tr id="${data.bill.MaHD}">
                        <td></td>
                        <td>${data.bill.MaHD}</td>
                        <td>${data.bill.PhuongThucTT}</td>
                        <td class="pending">
                            ${data.bill.TinhTrang}
                            <button id="${data.bill.MaHD}btn" onclick="handleClick(${data.bill.MaHD})">Xác nhận</button>
                        </td>
                        <td>
                            <form action="/cashier/getbilldetail" method="get">
                            <input type="hidden" value="${data.bill.MaHD}" name="billid">
                            <button class="bx bx-file-find btn-detail"></button>
                            </form>
                        </td>
                    </tr>
                    `));
            $('#customerinfo').prepend($(`
                    <div class="client">
                        <div class="no"></div>
                        <div> <img src="" alt="" class="img-client" /></div>
                        <div class="name-time">
                            <div class="_name">
                                ${data.user.HoTen}
                            </div>
                            <div class="_time">
                                0 phút trước
                            </div>
    
                        </div>
                    </div>
                    `));
            // Cập nhật stt
            
            let i = 1;
            $("#billtbody tr").each(function () {
                let firstChild = $(this).find("td:eq(0)");
                firstChild.text(i)
                i++;
            });
            let j = 1;
            $("#customerinfo").find("div.client").each(function () {
                let firstChild = $(this).find("div:eq(0)");
                firstChild.text(j)
                j++;
            });
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
            // console.log(data);
            $('#billtbody').empty();
            for (let i = 0; i < data.bill.length; i++) {
                $('#billtbody').append($(`
                    <tr id="${data.bill[i].MaHD}">
                        <td>${i + 1}</td>
                        <td>${data.bill[i].MaHD}</td>
                        <td>${data.bill[i].PhuongThucTT}</td>
                        <td>${data.bill[i].TinhTrang}</td>
                        <td>
                            <form action="/cashier/getbilldetail" method="get">
                            <input type="hidden" value="${data.bill[i].MaHD}" name="billid">
                            <button class="bx bx-file-find btn-detail"></button>
                            </form>
                        </td>
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
                                ${data.customer[i].user.HoTen}
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
                const status = statusCell.text().trim();

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
            let i =  $('#' + id + 'btn').parent();
            i.toggleClass("pending").toggleClass("paid");
            i.text("Đã thanh toán");
        },
        error: function (err) {
            console.error('Error fetching data:', err);
        }
    });
}