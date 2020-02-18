
$(document).ready(function(){

$(".addProductToCartButton").on("click", function() {

    var product_id = $(this).data("product_id");
    var product_name = $(this).data("product_name");
    var image_url = $(this).data("image_url");
    var unit_price = $(this).data("unit_price");
    var category = $(this).data("category");
    var discount = $(this).data("discount");
    var quantity = $(this).data("quantity");
    var unit = $(this).data("unit");
    var post_path = $(this).data("cart");

    $(this).LoadingOverlay("show");

    $.post(post_path,
        {
            product_id: product_id,
            quantity: quantity,
            product_name: product_name,
            image_url: image_url,
            unit_price: unit_price,
            category: category,
            discount: discount,
            unit: unit

        }, function(result){

        if(result['status'] === 'success'){

            iziToast.success({
                title: 'OK',
                message: result['message'],
            });
        }else{
            iziToast.error({
                title: 'Error',
                message: result['message'],
            });

        }
        $('.addProductToCartButton').LoadingOverlay("hide");

    });


});





$(".addSingleProductToCartButton").on("click", function() {

    var product_id = $(this).data("product_id");
    var product_name = $(this).data("product_name");
    var image_url = $(this).data("image_url");
    var unit_price = $(this).data("unit_price");
    var category = $(this).data("category");
    var discount = $(this).data("discount");
    var quantity = $('#product_quantity_input').val();
    var unit = $(this).data("unit");
    var post_path = $(this).data("cart");
    $(this).LoadingOverlay("show");

    $.post(post_path,
        {
            product_id: product_id,
            quantity: quantity,
            product_name: product_name,
            image_url: image_url,
            unit_price: unit_price,
            category: category,
            discount: discount,
            unit: unit

        }, function(result){

            if(result['status'] === 'success'){

                iziToast.success({
                    title: 'OK',
                    message: result['message'],
                });
            }else{
                iziToast.error({
                    title: 'Error',
                    message: result['message'],
                });

            }
            $('.addSingleProductToCartButton').LoadingOverlay("hide");

        });


});


$(".RemoveProductButton").on("click", function() {

    var product_id = $(this).data("product_id");
    var post_path = $('#RemoveProductFromCartUrl').val();

    $('.product_row_' + product_id).LoadingOverlay("show", {
        background  : "rgba(139, 30, 25, 0.3)"
    });

    $.post(post_path,
        {
            product_id: product_id,

        }, function(result){

            if(result['status'] === 'success'){
                $('.product_row_' + product_id).hide(5000);

                iziToast.success({
                    title: 'OK',
                    message: result['message'],
                });
            }else{

                iziToast.error({
                    title: 'Error',
                    message: result['message'],
                });

                $('.RemoveProductButton').LoadingOverlay("hide");
                 location.reload();

            }

        });


});


$(".ProceedToCheckoutButton").on("click", function() {

    var post_path = $('#ProceedToCheckoutForm').attr('action');

    $('#ProceedToCheckoutButton').LoadingOverlay("show");

    $.post(post_path,  $("#ProceedToCheckoutForm").serialize(), function(result){

            if(result['status'] === 'success'){

                iziToast.success({
                    title: 'OK',
                    message: result['message'],
                });
                // redirect to checkout page....

                window.location.href = $('#path_to_checkout').val();

            }else{

                iziToast.error({
                    title: 'Error',
                    message: result['message'],
                });
                $('#ProceedToCheckoutButton').LoadingOverlay("show");


            }

        });


});




$(".CheckoutForm").on("submit", function(e) {
     e.preventDefault();
    var post_path = $('#CheckoutForm').attr('action');

    $('#CheckoutButton').LoadingOverlay("show");

    $.post(post_path,  $("#CheckoutForm").serialize(), function(result){

        if(result['status'] === 'success'){

            iziToast.success({
                title: 'OK',
                message: result['message'],
            });
            // redirect to invoice page....
            console.log(result);
            window.location.href = $('#path_to_invoice').val() + '/' +result['data']['_id'];

        }else{
            iziToast.error({
                title: 'Error',
                message: result['message'],
            });
            $('#CheckoutButton').LoadingOverlay("hide");


        }

    });


});




    $(".PayWithXendButton").on("click", function() {

        var invoice_id = $(this).data("invoice_id");
        var order_amount = $(this).data("order_amount");
        var post_path = $(this).data("generate_xend_invoice_path");

        $(this).LoadingOverlay("show");

        $.post(post_path,
            {
                invoice_id: invoice_id,
                order_amount: order_amount
            }, function(result){

                if(result['status'] === 'success'){

                    $('#invoiceNumInput').val(result['data']['InvoiceNumber']);// put the invoice number from invoice service to an input
                    openXendSdk();
                    iziToast.success({
                        title: 'OK',
                        message: result['message'],
                    });
                    $('.PayWithXendButton').LoadingOverlay("hide");

                }else{
                    iziToast.error({
                        title: 'Error',
                        message: result['message'],
                    });

                    iziToast.error({
                        title: 'Error',
                        message: "Invoice Service is throwing 400",
                    });



                    $('.PayWithXendButton').LoadingOverlay("hide");

                }

            });


    });






});