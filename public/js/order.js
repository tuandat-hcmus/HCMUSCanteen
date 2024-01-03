function checkOrderConditions() {
    const hasItems = $(".order-content .item").length > 0;
    const paymentOptionChosen = $(".btn-check:checked").length > 0;
    $(".order-btn").prop("disabled", !(hasItems && paymentOptionChosen));
}
checkOrderConditions();
$(".bx-trash").on("click", function () {
    $(this).closest(".item").remove();
    checkOrderConditions();
});

$(".btn-check").on("change", function () {
    checkOrderConditions();
});

$(".arrow").on("click", function () {
    $(".order").toggleClass("toggle");
    $(this).toggleClass("reverse");
});
