function checkOrderConditions() {
    const hasItems = $(".order-content .item").length > 0;
    const paymentOptionChosen = $(".payment-btn:checked").length > 0;
    $(".order-btn").prop("disabled", !(hasItems && paymentOptionChosen));
}
checkOrderConditions();
$(".delete-order").on("click", (event) => {
    $(event.target).closest(".item").remove();
    checkOrderConditions();
});

$(".payment-btn").on("change", () => {
    checkOrderConditions();
});

$(".arrow").on("click", (event) => {
    $(".order").toggleClass("toggle");
    $(event.target).toggleClass("reverse");
});
