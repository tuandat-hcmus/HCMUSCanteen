const rows = $("tbody tr");
rows.each(function () {
    const statusCell = $(this).find("td:nth-child(4)");
    const status = statusCell.text();
    console.log(this);
    
    switch (status) {
        case "Đã thanh toán":
            statusCell.append('<button >Xác nhận</button>');
            statusCell.toggleClass("paid");
            break;
        case "Chưa thanh toán":
		statusCell.toggleClass("pending");
        case "Hủy":
		statusCell.toggleClass("canceled");
            
            break;
    }
})