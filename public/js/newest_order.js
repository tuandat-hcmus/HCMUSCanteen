const rows = $(".newest-order-table tbody tr");
rows.each(function () {
    const statusCell = $(this).find("td:nth-child(4)");
    const status = statusCell.text();
    console.log(this);
    switch (status) {
        case "Đã thanh toán":
            statusCell.toggleClass("paid");
            break;
        case "Chưa thanh toán":
            $(this).toggleClass("pending");
            break;
        case "Hủy":
            $(this).toggleClass("canceled");
            break;
    }
});
