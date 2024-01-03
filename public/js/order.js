function checkOrderConditions() {
    const hasItems = $(".order-content .item").length > 0;
    const paymentOptionChosen = $(".btn-check:checked").length > 0;
    $(".order-btn").prop("disabled", !(hasItems && paymentOptionChosen));
}
checkOrderConditions();
$(".bx-trash").on("click", (event) => {
    $(event.target).closest(".item").remove();
    checkOrderConditions();
});

$(".bt-cnheck").on("change", () => {
    checkOrderConditions();
});

$(".arrow").on("click", (event) => {
    $(".order").toggleClass("toggle");
    $(event.target).toggleClass("reverse");
});
