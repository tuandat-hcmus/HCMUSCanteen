$(document).ready(function () {
    let currentPage = 1;
    let currentType = 'Tất cả';
    let totalPages = null;
    let showedPages = null;
    let firstPage = 1;
    let lastPage = null;
    loadPages(currentType);
    loadPage(currentType, 1);
    // Xử lí chọn loại
    $('input[name="categories"]').on('click', function () {
        loadPage($(this).val(), 1);
        $('#page-container').empty();
        loadPages($(this).val());
    });

    
    // reload page container
    function loadPageContainer(first, last) {
        console.log(first, last);
        for(let i = first; i <= last; i++) {
            $('#page-container').append(`<button class="page-item ${i == currentPage ? "page-active" : ""}">${i}</button>`);
        }
        $('.page-item').on('click', function () {
            if ($('.page-active').length) {
                $('.page-active').removeClass('page-active');
            }
            $(this).addClass('page-active');
            currentPage = parseInt($(this).text());
            loadPage(currentType, currentPage);
        });
    }

    // next page button click event
    $('#next-page').on('click', function() {
        if (currentPage < totalPages) {
            ++currentPage;
            loadPage(currentType, currentPage);
            if(currentPage > lastPage) {
                firstPage++;
                lastPage++;
            }
            $('#page-container').empty();
            loadPageContainer(firstPage, lastPage);
        }
    });

    // previous page button click event
    $('#previous-page').on('click', function() {
        if (currentPage > 1) {
            --currentPage;
            loadPage(currentType, currentPage);
            if(currentPage < firstPage) {
                firstPage--;
                lastPage--;
            }
            $('#page-container').empty();
            loadPageContainer(firstPage, lastPage);
        }
    })

    async function loadPages(type) {
        try {
            const res = await fetch(`/client/page?type=${type}`);
            const data = await res.json();
            totalPages = Math.ceil(data.total / data.perpage);
            showedPages = (totalPages < 3) ? totalPages : 3;
            firstPage = 1;
            lastPage = showedPages;
            loadPageContainer(firstPage, lastPage);
        }
        catch {
            (err) => console.log(err);
        }
    }

    function loadPage(type, page) {
        $.ajax({
            url: `/client/page?type=${type}&page=${page}`,
            method: 'GET',
            success: function (data) {
                currentPage = page;
                currentType = type;
                console.log(data);
                let dataHtml = ``;
                for (let i = 0; i < data.perpage && i < data.data.length; i++) {
                    dataHtml += `
                    <div class="card-item">
                        <a href="/product/${data.data[i].MaSP}" class="item-link">
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
                            <p>Số lượng còn: ${data.data[i].SoLuongTon}</p>
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
});
