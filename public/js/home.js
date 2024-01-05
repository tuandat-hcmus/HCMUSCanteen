//const { search } = require("../../src/routes/acc.r");

$(document).ready(function () {
    let currentPage = 1;
    let currentType = 'Tất cả';
    let searchInput = '';
    const orderArr = [];
    let sum = 0;
    $('#tong-value').text(sum / 1000 + ".000Đ");
    loadPage(currentType, 1, 1);
    // Xử lí chọn loại
    $('input[name="categories"]').on('click', function () {
        loadPage($(this).val(), 1, 1);
    });
    // $('.dropdown-item').on('click', function () {
    //     $('#btn').html($(this).text());
    //     let type = $(this).text();
    //     type = type.replace(/(\r\n|\n|\r)/gm, "");
    //     loadPage(type, 1);
    // });
    $('#searchInput').on('keypress', function (event) {
        if (event.which === 13) {
            event.preventDefault();

            const searchTerm = $(this).val();

            loadPage(searchTerm, 1, 2);
        }
    });

    function loadPage(type, page, flag) {
        let url;
        if (flag === 1) {
            if (searchInput != '') {
                url = `/client/page?type=${type}&page=${page}&search=${searchInput}`;
            } else {
                url = `/client/page?type=${type}&page=${page}`;
            }
        } else {
            url = `/client/search?input=${type}&page=${page}`;
        }
        $.ajax({
            url: url,
            method: 'GET',
            success: function (data) {
                currentPage = page;
                if (flag === 1) {
                    currentType = type;
                } else {
                    currentType = 'Tất cả';
                    searchInput = type;
                }
                const pages = Math.ceil(data.total / data.perpage);
                // --------------
                $('#pagination').empty();
                const pageContainer = $('#pagination');
                for (let i = 1; i <= pages; i++) {
                    pageContainer.append($(`<li><button class="page-click">${i}</button></li>`));
                }
                $('.page-click').on('click', function () {
                    if(flag === 1) {
                        loadPage(currentType, parseInt($(this).text()), 1);
                    } else {
                        loadPage(searchInput, parseInt($(this).text()), 2);
                    }
                })
                // ---------------
                let dataHtml = ``;
                for (let i = 0; i < data.perpage && i < data.data.length; i++) {
                    dataHtml += `
                    <div class="card-item">
                        <input type="hidden" value="${data.data[i].MaSP}" id="pId">
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
                            <p>Số lượng còn: ${data.data[i].SoLuongTon}</p>
                            <div class="star-rating">
                                <i class='bx bxs-star'></i>
                                <span>5.0</span>
                            </div>
                            </div>
                            <button class="add-btn" id='${data.data[i].MaSP}' name="addbtn">
                            <i class='bx bx-plus'></i>
                            </button>
                        </div>
                        </div>
                    </div>
                    `
                }
                $('#card-container').html(dataHtml);
                // sự kiện click add-btn

                for (let i = 0; i < data.perpage && i < data.data.length; i++) {
                    $('#' + data.data[i].MaSP + '.add-btn').on('click', function () {
                        if (!orderArr.some(order => order.MaSP === data.data[i].MaSP)) {
                            orderArr.push({
                                MaSP: data.data[i].MaSP,
                                DonGia: data.data[i].DonGia,
                                SoLuong: 1
                            });
                            $('#tong-value').text(money() / 1000 + ".000Đ");
                            $('#order-content').append($(`
                            <div class="item">
                                <div class="row-1">
                                    <img
                                        src="/img/logo_hcmus.png"
                                        class="img-fluid rounded-top"
                                        alt=""
                                    />
            
                                    <div class="name-price">
                                        <div class="name">
                                            ${data.data[i].Ten}
                                        </div>
            
                                        <div class="price">
                                            ${data.data[i].DonGia}
                                        </div>
                                    </div>
            
                                    <div class="qty">
                                        <input id='${data.data[i].MaSP}' class='sl'
                                            type="number"
                                            min="1"
                                            value="1"
                                            onkeyup="if(value<0) value=0;"
                                        />
            
                                    </div>
                                </div>
            
                                <div class="row-2">
            
                                    <div class="input-text">
                                        <input type="text" name="note" />
                                    </div>
                                    <div class="trash">
                                        <i class="bx bx-trash delete-order" id='${data.data[i].MaSP}'></i>
                                    </div>
            
                                </div>
            
                            </div>
                            `));
                            $('#' + data.data[i].MaSP + ".delete-order").on("click", (event) => {
                                $(event.target).closest(".item").remove();
                                let index = orderArr.findIndex(item => item.MaSP === data.data[i].MaSP);
                                if (index !== -1) orderArr.splice(index, 1);
                                $('#tong-value').text(money() / 1000 + ".000Đ");
                                checkOrderConditions();
                            });
                            $('#' + data.data[i].MaSP + ".sl").on('input', function () {
                                let index = orderArr.findIndex(item => item.MaSP === data.data[i].MaSP);
                                orderArr[index].SoLuong = parseInt($(this).val());
                                $('#tong-value').text(money() / 1000 + ".000Đ");
                            })
                        }
                    });
                }
            },
            error: function (err) {
                console.error('Error fetching data:', err);
            }
        });

    }

    function money() {
        let sum = 0;
        orderArr.forEach(element => {
            sum += element.DonGia * element.SoLuong;
        });
        return sum;
    }

})