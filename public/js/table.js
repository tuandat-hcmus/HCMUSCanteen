
const rows = $("tbody tr");
rows.each(function () {
    const statusCell = $(this).find("td:nth-child(4)");
    const status = statusCell.text().trim();
    console.log(this);
    
    switch (status) {
        case "Đã thanh toán":
            statusCell.toggleClass("paid");
            break;
        case "Chưa thanh toán":
		statusCell.toggleClass("pending");
        statusCell.append('<button >Xác nhận</button>');
        case "Hủy":
		statusCell.toggleClass("canceled");
            break;
    }
})