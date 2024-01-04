let currentPage = 1;
let currentType = 'Tất cả';
loadPage('Tất cả', 1);

// Xử lí chọn loại
// $('.dropdown-item').on('click', function () {
//     $('#btn').html($(this).text());
//     let type = $(this).text();
//     type = type.replace(/(\r\n|\n|\r)/gm, "");
//     loadPage(type, 1);
// });

function loadPage(type, page) {
    $.ajax({
        url: `/client/page?type=${type}&page=${page}`,
        method: 'GET',
        success: function (data) {
            currentPage = page;
            currentType = type;
            console.log(data);

            const pages = Math.ceil(data.total / data.perpage);
            let pagination = ``;
            for (let i = 0; i < pages; i++) {
                if (i === currentPage - 1) {
                    pagination += `
                            <li class="page-item active" aria-current="page">
                            <span class="page-link">${i + 1}</span>
                            </li>
                        `
                }
                else {
                    pagination += `
                            <li class="page-item"><a class="page-link" href="#">${i + 1}</a></li>
                        `;
                }
            }
            $('#pagination').html(pagination);

            $('#pagination').off('click', '.page-item').on('click', '.page-item', function () {
                let page = parseInt($(this).children().html());
                loadPage(currentType, page);
            });

            let dataHtml = ``;
            for (let i = 0; i < data.perpage && i < data.data.length; i++) {
                dataHtml += `
                    <div class="card-item">
                        <a href="" class="item-link">
                        <div class="img-container">
                            <img src="/img/products/Fried-rice.jpg" alt="rice">
                        </div>
                        </a>

                        <div class="content">
                        <a href="" class="item-link">
                            <h3>${data.data[i].Ten}</h3>
                        </a>
                        <p>${data.data[i].DonGia}Đ</p>
                        <div class="bottom-container">

                            <div class="subcontent">
                            <p>Số lượng còn: ${data.data.SoLuongTon}</p>
                            <div class="star-rating">
                                <i class='bx bxs-star'></i>
                                <span>5.0</span>
                            </div>
                            </div>
                            <button class="add-btn">
                            <i class='bx bx-plus'></i>
                            </button>
                        </div>
                        </div>
                    </div>
                    `
            }
            $('#card-container').html(dataHtml);

        },
        error: function (err) {
            console.error('Error fetching data:', err);
        }
    });
}