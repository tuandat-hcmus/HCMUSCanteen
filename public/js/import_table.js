$(document).ready(function () {
    let startDate = null;
    let endDate = null;
    let monthYear = null;
    loadImports(null, null, null);

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
        loadImports(startDate, endDate, monthYear);
    })

    $('#edate').on('change', function () {
        endDate = $(this).val();
        if (endDate === '') {
            endDate = null;
        }
        loadImports(startDate, endDate, monthYear);
    })

    $('#myear').on('change', function () {
        monthYear = $(this).val();
        if (monthYear === '') {
            monthYear = null;
        }
        loadImports(startDate, endDate, monthYear);
    })

    function loadImports(from, to, monthYear) {
        $.ajax({
            url: `/client/import`,
            method: 'GET',
            success: function (data) {
                let dataHtml = ``;
                for (let i = 0; i < data.data.length; i++) {
                    console.log(data);
                    if (filterDates(data.data[i].NgayLap, startDate, endDate, monthYear)) {
                        const parsedDate = new Date(data.data[i].NgayLap);
                        const formattedDate = parsedDate.toDateString();
                        dataHtml += `<tr>
                        <td>${i + 1}</td>
                        <td>${data.data[i].MaNH}</td>
                        <td>${formattedDate}</td>
                        <td>${data.data[i].HoTen}</td>
                        <td><i class="bx bx-file-find btn-detail"></i></td>
                        <td><i class='bx bxs-edit-alt btn-edit'></i></td>
                        <td><i class="bx bx-trash btn-delete-report"></i></td>
                        </tr>`
                    }
                }
                $('#importTable').html(dataHtml);
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


