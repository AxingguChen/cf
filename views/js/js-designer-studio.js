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

$(document).ready(function () {
    var userId = sessionStorage.getItem("cfUserId");
    setPersonalData();
    getProductsStatus(userId);
    getAddresses(userId);
    getUserPaymentMethods(userId);
    getFeedbacks(userId);
});


function setPersonalData() {
    document.getElementById("designer-hi-label").innerHTML = getUserInfo().firstname;
    document.getElementById("designer-studio-icon").src = base_url+"avatar/"+getUserInfo().users_id+img_format;
    document.getElementById("designer-firstname-label").innerHTML = "<small>FIRST NAME</small> " + getUserInfo().firstname;
    document.getElementById("designer-lastname-label").innerHTML = "<small>LAST NAME</small> " + getUserInfo().lastname;
    document.getElementById("designer-email-label").innerHTML = "<small>EMAIL</small> " + getUserInfo().email;
    document.getElementById("designer-phone-label").innerHTML = "<small>PHONE</small> " + getUserInfo().phone;
    document.getElementById("designer-city-label").innerHTML = "<small>CITY</small> " + getUserInfo().city;
    document.getElementById("designer-school-label").innerHTML = "<small>SCHOOL</small> " + getUserInfo().schools_id;
    document.getElementById("designer-website-label").innerHTML = "<small>WEBSITE</small><a  target=_blank href='" + getUserInfo().website + "'> "+getUserInfo().website+"<a/>";

    document.getElementById("info-firstname-field").value = getUserInfo().firstname;
    document.getElementById("info-lastname-field").value = getUserInfo().lastname;
    document.getElementById("info-email-field").value = getUserInfo().email;
    document.getElementById("info-phone-field").value = getUserInfo().phone;
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

function getProductsStatus(id){
    var url_orders = base_url+"index.php/projects/view_projects_by_user/"+id;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json_array = JSON.parse(xmlhttp.responseText);
            var data = json_array.rows;
            updateProductsStatus(data);
        }
    };
    xmlhttp.open("GET", url_orders, true);
    xmlhttp.send();
}

function updateProductsStatus(data) {
    for(var i=0; i<data.length; i++) {
        var img_url = base_url+"pic/"+data[i].projects_id+"_1"+img_format;
        var cost = data[i].cost + " €";
        var price = data[i].price + " €";
        var status = data[i].projects_project_state_id;
        var days_left = data[i].round;
        var income = "x.xxx €";

        $("#product-status-table-body").append('<tr>' +
            '<td><img src="'+img_url+'" height="96px"></td>' +
            '<td>'+cost+'</td>' +
            '<td>'+price+'</td>' +
            '<td>'+status+'</td>' +
            '<td>'+days_left+'</td>' +
            '<td>'+income+'</td>' +
            '<td><button class="btn-default">EDIT</button>' +
            '<button class="btn-default">DELETE</button></td>' +
            '</tr>');
    }
    $("#product-status-table-body").append('<tr id="designer-product-status-final-row">' +
        '<td></td>' +
        '<td></td>' +
        '<td></td>' +
        '<td></td>' +
        '<td>TOTAL INCOME</td>' +
        '<td>x.xxx €</td>' +
        '<td></td>' +
        '</tr>');
}

function getFeedbacks(id){
    var url_feed = base_url+"index.php/projects/view_projects_by_user/"+id;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json_array = JSON.parse(xmlhttp.responseText);
            var data = json_array.rows;
            updateFeedbacks(data);
        }
    };
    xmlhttp.open("GET", url_feed, true);
    xmlhttp.send();
}

function updateFeedbacks(data) {
    for(var i=0; i<data.length; i++) {
        var title=data[i].title;
        var img_url = base_url+"pic/"+data[i].projects_id+"_1"+img_format;
        var pic_id = "feedback-item-back-"+data[i].projects_id;

        $("#designer-feedback-container").append("<div class='feedback-item'>" +
            "<h5>"+title+"</h5>" +
            "<img class='feedback-item-img' src='"+img_url+"'>" +
            "<button class='btn-default'>VIEW FEEDBACK</button>" +
            "</div>");
    }
}

