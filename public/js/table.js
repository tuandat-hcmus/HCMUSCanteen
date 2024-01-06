const rows = $("tbody tr");
rows.each(function () {
    const statusCell = $(this).find("td:nth-child(4)");
    const status = statusCell.text();
    switch (status) {
        case "Đã thanh toán":
            $(this).find("td:nth-child(4)").toggleClass("paid");
            break;
        case "Chưa thanh toán":
            $(this).find("td:nth-child(4)").toggleClass("pending");
            break;
        case "Hủy":
            $(this).find("td:nth-child(4)").toggleClass("canceled");
            break;
    }
});


