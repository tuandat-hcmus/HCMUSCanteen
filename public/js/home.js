$(document).ready(function () {
    let currentPage = 1;
    let currentType = 'Tất cả';
    loadPages(currentType);
    loadPage(currentType, 1);
    // Xử lí chọn loại
    // $('.dropdown-item').on('click', function () {
    //     $('#btn').html($(this).text());
    //     let type = $(this).text();
    //     type = type.replace(/(\r\n|\n|\r)/gm, "");
    //     loadPage(type, 1);
    // });
    async function loadPages(type) {
        const res = await fetch(`/client/page?type=${type}`);
        const data = await res.json();
        const pages = Math.ceil(data.total / data.perpage);
        const pageContainer = $('#pagination');
        for (let i = 1; i <= pages; i++) {
            pageContainer.append($(`<li><button class="page-click">${i}</button></li>`));
        }
        $('.page-click').on('click', function () {
            loadPage(currentType, parseInt($(this).text()));
        })
    }



    function loadPage(type, page) {
        $.ajax({
            url: `/client/page?type=${type}&page=${page}`,
            method: 'GET',
            success: function (data) {
                currentPage = page;
                currentType = type;
                console.log(data);
                const pages = Math.ceil(data.total / data.perpage);
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
})
