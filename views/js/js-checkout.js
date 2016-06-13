/**
 * Created by Giovanni on 26/05/16.
 */


var c_firstname;
var c_lastname;
var c_address;
var c_phone;
var c_payment_type=0;
var c_c_n;
var c_exp;

var total_price;


$(document).ready(function () {
    if(isLogged) {
        document.getElementById("checkout-section-1").style.display ="none";
        fillUserInfoSection();
        document.getElementById("check-item-1").style.borderBottomColor = "transparent";
        document.getElementById("check-item-2").style.borderBottomColor = "#1e1e1e";

        document.getElementById("checkout-section-2").style.display ="inline";

        setupReviewOrder();
    }
});

$(document).ready(function () {
    $("#checkout-log-submit").click(function(){
        var userEmail = document.getElementById('checkout-log-email').value;
        var userPassw = document.getElementById('checkout-log-pass').value;

        $.post(base_url+"index.php/users/login",
            {
                email: userEmail,
                password: userPassw

            },
            function(data,status){
                var json = JSON.parse(data);
                if(json.state==false) {
                    //login failed

                }
                else {
                    // login success
                    var user = json.rows[0];
                    setUserInfo(user);
                    sessionStorage.setItem("cfUserId",user.users_id);
                    sessionStorage.setItem("cfUserGroupsId",user.users_groups_id);
                    sessionStorage.setItem("cfUserFirstname",user.firstname);
                    sessionStorage.setItem("cfUserLastname",user.lastname);

                    // if remember me
                    if(document.getElementById('login-checkbox').checked) {
                        localStorage.setItem("cfUserEmail", userEmail);
                        localStorage.setItem("cfUserPassword", userPassw);
                    }
                    else { localStorage.removeItem("cfUserEmail"); localStorage.removeItem("cfUserPassword");}

                    document.getElementById("login-error-label").style.display = "none";
                    $('#login-modal').modal('hide');
                    document.getElementById("login-nav-button").style.display = "none";
                    document.getElementById("sign-nav-button").style.display = "none";
                    document.getElementById("logged-nav-button").style.display = "inline";

                    if(user.users_groups_id == "10") {
                        document.getElementById("nav-drop-designer-studio-btn").style.display = "inline-block";
                    }

                    document.getElementById("nav-login-name").innerHTML = user.firstname;
                    document.getElementById("nav-drop-login-name").innerHTML = user.firstname + " " + user.lastname;

                    document.getElementById("checkout-section-1").style.display ="none";
                    fillUserInfoSection();
                    document.getElementById("check-item-1").style.borderBottomColor = "transparent";
                    document.getElementById("check-item-2").style.borderBottomColor = "#1e1e1e";

                    document.getElementById("checkout-section-2").style.display ="inline";

                    setupReviewOrder();
                }
            });
    });


    $("#check-2-next").click(function(){
        if(checkAddress()) {
            document.getElementById("checkout-section-2").style.display ="none";
            document.getElementById("check-item-2").style.borderBottomColor = "transparent";
            document.getElementById("check-item-3").style.borderBottomColor = "#1e1e1e";
            document.getElementById("checkout-section-3").style.display ="inline";
            c_firstname= document.getElementById("check-firstname-label").value;
            c_lastname= document.getElementById("check-lastname-label").value;
            c_address= document.getElementById("check-street-label").value + " " +
                document.getElementById("check-city-label").value + " " +
                document.getElementById("check-zip-label").value + " " +
                document.getElementById("check-country-label").value + " ";
            c_phone= document.getElementById("check-phone-label").value;
        }
    });
    $("#check-2-back").click(function(){
        window.history.back();
    });

    $("#check-3-next").click(function(){
        document.getElementById("checkout-section-3").style.display ="none";
        document.getElementById("check-item-3").style.borderBottomColor = "transparent";
        document.getElementById("check-item-4").style.borderBottomColor = "#1e1e1e";
        document.getElementById("checkout-section-4").style.display ="inline";

        document.getElementById('paypal-method-button').focus();
    });

    $("#check-3-back").click(function(){
        document.getElementById("checkout-section-3").style.display ="none";
        document.getElementById("check-item-3").style.borderBottomColor = "transparent";
        document.getElementById("check-item-2").style.borderBottomColor = "#1e1e1e";
        document.getElementById("checkout-section-2").style.display ="inline";
    });

    $("#check-4-next").click(function(){
        simulatePayment();
    });
    $("#check-4-back").click(function(){
        document.getElementById("checkout-section-4").style.display ="none";
        document.getElementById("check-item-4").style.borderBottomColor = "transparent";
        document.getElementById("check-item-3").style.borderBottomColor = "#1e1e1e";
        document.getElementById("checkout-section-3").style.display ="inline";
    });

    $("#check-5-next").click(function(){
        window.location.href = base_url+'views/home.html';
    });
    $("#check-5-back").click(function(){
        document.getElementById("checkout-section-5").style.display ="none";
        document.getElementById("check-item-5").style.borderBottomColor = "transparent";
        document.getElementById("check-item-4").style.borderBottomColor = "#1e1e1e";
        document.getElementById("checkout-section-4").style.display ="inline";
    });


    $("#paypal-method-button").click(function(){
        document.getElementById("credit-card-form").style.display ="none";
        document.getElementById("paypal-method-label").style.display ="block";
        c_payment_type=0;
    });

    $("#card-method-button").click(function(){
        document.getElementById("credit-card-form").style.display ="inline";
        document.getElementById("paypal-method-label").style.display ="none";
        c_payment_type=1;
    });

});

function checkAddress() {
    return true;
}


function setupReviewOrder() {
    var cart = getChart();

    var total_price=0;
    var subtotal_price=0;
    var shipping_price=10;

    for (var i=0; i<cart.products.length; i++) {
        var qty = cart.products[i].n;
        var price = cart.products[i].data.price;
        var title = cart.products[i].data.title;
        var project_id = cart.products[i].data.projects_id;
        var img_url = base_url+"pic/"+project_id+"_1.png";

        subtotal_price = subtotal_price + parseInt(price)*qty;


        $("#checkout3-table-body").append('<tr>' +
            '<td><img src="'+img_url+'" height="96px"></td>' +
            '<td>'+title+'</td>' +
            '<td>'+qty+'</td>' +
            '<td>'+price+'€</td>' +
            '</tr>');

    }

    total_price = subtotal_price + shipping_price;
    document.getElementById("checkout-subtotal").innerHTML = '<small>SUBTOTAL </small><span class="pull-right">'+subtotal_price+'€</span>';
    document.getElementById("checkout-shipping").innerHTML = '<small>SHIPPING </small><span class="pull-right">'+shipping_price+'€</span>';
    document.getElementById("checkout-total").innerHTML = 'TOTAL COST <span class="pull-right">'+total_price+'€</span>';

}

function fillOrderConfirmation() {

    var cart = getChart();

    for (var i=0; i<cart.products.length; i++) {
        var project_id = cart.products[i].data.projects_id;
        var img_url = base_url+"pic/"+project_id+"_1.png";


        $("#checkout5-1-table-body").append('<tr>' +
            '<td><img src="'+img_url+'" height="96px"></td>' +
            '<td>'+c_firstname + ' ' + c_lastname+'</td>' +
            '<td>'+c_address+'</td>' +
            '<td>'+c_address+'</td>' +
            '</tr>');

    }

    $("#checkout5-2-table-body").append('<tr>' +
        '<td>'+c_firstname + ' ' + c_lastname+'</td>' +
        '<td>'+c_address+'</td>' +
        '<td>'+c_phone+'</td>' +
        '</tr>');


    if(c_payment_type==0) {
        $("#checkout5-3-table-body").append('<tr>' +
            '<td><img src="http://www.guidaconsumatore.com/wp-content/uploads/2015/07/come_funziona_paypal.jpg" height="96px"></td>' +
            '<td>'+c_firstname + ' ' + c_lastname+'</td>' +
            '</tr>');
    }
    else {
        $("#checkout5-3-table-body").append('<tr>' +
            '<td><img src="http://www.businessciting.com/wp-content/uploads/2012/07/credit_cards.jpg" height="96px"></td>' +
            '<td>'+c_firstname + ' ' + c_lastname+'</td>' +
            '<td>'+c_c_n+'</td>' +
            '<td>'+c_exp+'</td>' +
            '</tr>');
    }

}


function simulatePayment() {
    if (confirm("Press OK to simulate transaction accepted, Press CANCEL to simulate transaction refused.") == true) {
        fillOrderConfirmation();
        document.getElementById("checkout-section-4").style.display ="none";
        document.getElementById("check-item-4").style.borderBottomColor = "transparent";
        document.getElementById("check-item-5").style.borderBottomColor = "#1e1e1e";
        document.getElementById("checkout-section-5").style.display ="inline";
    } else {

    }
}

function fillUserInfoSection() {
    document.getElementById("check-address-label").value = getUserInfo().address_label;
    document.getElementById("check-firstname-label").value = getUserInfo().firstname;
    document.getElementById("check-lastname-label").value = getUserInfo().lastname;
    document.getElementById("check-street-label").value = getUserInfo().street;
    document.getElementById("check-additional-label").value = getUserInfo().additional_info;
    document.getElementById("check-country-label").value = getUserInfo().country;
    document.getElementById("check-city-label").value = getUserInfo().city;
    document.getElementById("check-zip-label").value = getUserInfo().zip_code;
    document.getElementById("check-phone-label").value = getUserInfo().phone;
}