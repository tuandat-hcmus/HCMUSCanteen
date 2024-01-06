$(document).ready(function () {
    let startDate = null;
    let endDate = null;
    let monthYear = null;
    loadReports(null, null, null);

    $('#thoigian').on('change', function () {
        if ($(this).val() == 'Ngày') {
            $('#sdateFilter').show();
            $('#edateFilter').show();
            $('#myearFilter').hide();
            monthYear = null;
        } else {
            $('#sdateFilter').hide();
            $('#edateFilter').hide();
            $('#myearFilter').show();
            startDate = null;
            endDate = null;
        }
    });

    $('#sdate').on('change', function () {
        startDate = $(this).val();
        if (startDate === '') {
            startDate = null;
        }
        loadReports(startDate, endDate, monthYear);
    })

    $('#edate').on('change', function () {
        endDate = $(this).val();
        if (endDate === '') {
            endDate = null;
        }
        loadReports(startDate, endDate, monthYear);
    })

    $('#myear').on('change', function () {
        monthYear = $(this).val();
        if (monthYear === '') {
            monthYear = null;
        }
        loadReports(startDate, endDate, monthYear);
    })

    function loadReports(from, to, monthYear) {
        $.ajax({
            url: `/client/report`,
            method: 'GET',
            success: function (data) {
                let dataHtml = ``;
                for (let i = 0; i < data.data.length; i++) {
                    if (filterDates(data.data[i].Ngay, startDate, endDate, monthYear)) {
                        const parsedDate = new Date(data.data[i].Ngay);
                        const formattedDate = parsedDate.toDateString();
                        dataHtml += `<tr>
                            <td> ${i + 1} </td>
                            <td>${data.data[i].MaDT}</td>
                            <td>${formattedDate}</td>
                            <td>${data.data[i].HoTen}</td>
                            <td><i class="bx bx-file-find btn-detail"></i></td>
                            <td><i class="bx bx-trash btn-delete-report"></i></td>
                        </tr>`
                    }
                }
                $('#reportTable').html(dataHtml);
            }
        })
    }

})

function filterDates(date, startDate, endDate, targetMonthYear) {
    const dateObj = new Date(date);
    const targetDateObj = new Date(targetMonthYear);

    return (
        (startDate === null || dateObj >= new Date(startDate)) &&
        (endDate === null || dateObj <= new Date(endDate)) &&
        (targetMonthYear === null ||
            (dateObj.getMonth() === targetDateObj.getMonth() &&
                dateObj.getFullYear() === targetDateObj.getFullYear()))
    );
}


