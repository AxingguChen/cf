/**
 * Created by Giovanni on 25/05/16.
 */
/**
 * Created by giovanni on 22/05/16.
 */

var payment_methods = {
    'mastercard': '1',
    'visa': '2',
    'paypal': '3',
    'alipay': '4'
};


var userId=sessionStorage.getItem("cfUserId");
getUser(userId);
getOrdersByUser(userId);
getAddresses(userId);
getUserPaymentMethods(userId);
getWishlistByUser(userId);



function getUser(id){
    //var url_user = base_url+"index.php/users/view_user/"+id;
    var url_user = base_url+"index.php/users/view_user/"+"6";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json_array = JSON.parse(xmlhttp.responseText);
            var data = json_array.rows[0];
            updateUserData(data);
        }
    };
    xmlhttp.open("GET", url_user, true);
    xmlhttp.send();
}

function updateUserData(data) {
    document.getElementById("customer-hi-label").innerHTML = data.firstname;
    document.getElementById("customer-firstname-label").innerHTML = "<small>FIRST NAME</small> " + data.firstname;
    document.getElementById("customer-lastname-label").innerHTML = "<small>LAST NAME</small> " + data.lastname;
    document.getElementById("customer-email-label").innerHTML = "<small>EMAIL</small> " + data.email;
    document.getElementById("customer-phone-label").innerHTML = "<small>PHONE</small> " + data.phone;

    document.getElementById("info-firstname-field").value = data.firstname;
    document.getElementById("info-lastname-field").value = data.lastname;
    document.getElementById("info-email-field").value = data.email;
    document.getElementById("info-phone-field").value = data.phone;
}

function getAddresses(id){
    var url_address = base_url+"index.php/users/view_address_by_user_id/"+"1";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json_array = JSON.parse(xmlhttp.responseText);
            var data = json_array.rows;
            updateAddressData(data);
        }
    };
    xmlhttp.open("GET", url_address, true);
    xmlhttp.send();
}

function updateAddressData(data) {
    for(var i=0; i<data.length; i++) {
        var name=data[i].firstname + " " + data[i].lastname;
        var address=data[i].street + ", " + data[i].zip_code + ", " + data[i].city + ", " + data[i].country;
        var phone = data[i].phone;
        var isShipping = data[i].shipping_address_id;
        var isBilling = data[i].billing_address_id;
        $("#address-table-body").append("<tr><td>"+name+"</td>" +
            "<td>"+address+"</td>" + "<td>"+ phone +"</td></tr>");

    }
}

function getUserPaymentMethods(id){
    var url_p_methods = base_url+"index.php/users/view_payment_method_by_user_id/"+"1";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json_array = JSON.parse(xmlhttp.responseText);
            var data = json_array.rows;
            updateUserPaymentMethods(data);
        }
    };
    xmlhttp.open("GET", url_p_methods, true);
    xmlhttp.send();
}

function updateUserPaymentMethods(data) {
    for(var i=0; i<data.length; i++) {
        var name=data[i].cardholder;
        var type=data[i].payment_type_id;
        if(type==payment_methods.mastercard){type="mastercard";}
        else if(type==payment_methods.visa){type="visa";}
        else if(type==payment_methods.paypal){type="paypal";}
        else if(type==payment_methods.alipay){type="alipay";}
        var account = data[i].account;
        var isDefault = data[i].default;
        var month = data[i].month;
        var year = data[i].year;
        if(isDefault==1){isDefault="checked";}
        else{isDefault="";}

        $("#payment-table-body").append("<tr><td>"+type+"</td><td>"+name+"</td><td>"+account+"</td><td>"+month+"/"+year+
            "</td><td><div class='checkbox'><label><input type='checkbox' value=''"+isDefault+">Payment method</label></div></td></tr>");

    }
}

function getOrdersByUser(id){
    var url_orders = base_url+"index.php/orders/view_by_users_id/"+"1";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json_array = JSON.parse(xmlhttp.responseText);
            var data = json_array.rows;
            updateUserOrders(data);
        }
    };
    xmlhttp.open("GET", url_orders, true);
    xmlhttp.send();
}

function updateUserOrders(data) {
    for(var i=0; i<data.length; i++) {
        var url_product = base_url+"index.php/projects/view_project/"+data[i].orders_projects_id;
        var xmlhttp = new XMLHttpRequest();
        var order = data[i];
        var order_id = order.orders_id;
        var qty = order.quantity;
        var date = order.date_create;
        var state = order.orders_order_state_id;
        //var img_url = base_url+"pic/"+order.orders_projects_id+"_1.png";
        var img_url = base_url+"pic/7_1.png";

        xmlhttp.onreadystatechange = function(order) {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var json_array = JSON.parse(xmlhttp.responseText);
                var p_data = json_array.rows[0];

                var title = p_data.title;
                var price = p_data.price;

                $("#order_container").append("<div class='order-item'><div class='row'>"+
                    "<div class='col-sm-6 order-item-icon'><img src='"+img_url+"' height='180px'>"+
                    "</div><div class='col-sm-6 order-item-container'><p style='font-weight: bold;'>"+title+"</p><p><small>ORDER NUMBER</small> "+order_id+" </p>"+
                    "<p><small>PRICE </small>"+price*qty+"€</p><p><small>DATE</small> "+date+" </p><p><small>STATUS</small> "+state+" </p>"+
                    "<p><small>MANAGE ORDER</small> ***** </p></div></div></div>");
            }
        };
        xmlhttp.open("GET", url_product, true);
        xmlhttp.send();

    }
}

function getWishlistByUser(id){
    var url_wishlist = base_url+"index.php/users/view_wishlist_by_user_id/"+id;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json_array = JSON.parse(xmlhttp.responseText);
            var data = json_array.rows;
            updateWishlist(data);
        }
    };
    xmlhttp.open("GET", url_wishlist, true);
    xmlhttp.send();
}

function updateWishlist(data) {
    for(var i=0; i<data.length; i++) {
        var title=data[i].title;
        var price=data[i].price;
        var img_url = base_url+"pic/"+data[i].projects_id+"_1.png";

        $("#wishlist_container").append("<div class='order-item'><div class='row'>"+
            "<div class='col-sm-6 order-item-icon'><img src='"+img_url+"' height='180px'>"+
            "</div><div class='col-sm-6 order-item-container'><p style='font-weight: bold'>"+title+"</p>"+
            "<p><small>PRICE </small>"+price+"<div><button class='btn-default' style='margin-top: 8px; margin-bottom: 8px;'>ADD TO CART</button></div></div></div></div>");
    }
}

