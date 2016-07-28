/**
 * Created by Giovanni on 20/05/2016.
 */
var isLogged = false;


// navbar login / logout
$(document).ready(function(){
    $("#header").load("templates/header.html");
    $("#footer").load("templates/footer.html");

    if(checkUserLogged()) {
        isLogged=true;
        var user_id = sessionStorage.cfUserId;
        updateNavbarUserLogged(sessionStorage.cfUserFirstname,sessionStorage.cfUserLastname, sessionStorage.cfUserGroupsId);
    }
    if(localStorage.cfUserEmail !== undefined && localStorage.cfUserPassword !== undefined ) {
        $('#login-email-field').val(localStorage.cfUserEmail);
        $('#login-password-field').val(localStorage.cfUserPassword);
        $('#login-checkbox').attr('checked','checked');
    }
    else {
        $('#login-email-field').val("").attr('placeholder','email');
        $('#login-password-field').val("");
    }

    setupChartBasket();


    $("#nav-login-submit-button").click(function(){
        var userEmail = $('#login-email-field').val();
        var userPassw = $('#login-password-field').val();

        $.post(base_url+"index.php/users/login",
            {
                email: userEmail,
                password: userPassw

            },
            function(data,status){
                var json = JSON.parse(data);
                if(json.state==false) {
                    $("#login-error-label").show();
                }
                else {
                    var user = json.rows[0];
                    setUserInfo(user);
                    sessionStorage.setItem("cfUserId",user.users_id);
                    sessionStorage.setItem("cfUserGroupsId",user.users_groups_id);
                    sessionStorage.setItem("cfUserFirstname",user.firstname);
                    sessionStorage.setItem("cfUserLastname",user.lastname);

                    // if remember me
                    if($('#login-checkbox').is(':checked')) {
                        localStorage.setItem("cfUserEmail", userEmail);
                        localStorage.setItem("cfUserPassword", userPassw);
                    }
                    else { localStorage.removeItem("cfUserEmail"); localStorage.removeItem("cfUserPassword");}

                   $("#login-error-label").hide();
                    $('#login-modal').modal('hide');
                    $("#login-nav-button").hide();
                    $("#sign-nav-button").hide();
                    $("#logged-nav-button").show();

                    if(user.users_groups_id == "10") {
                        document.getElementById("nav-drop-designer-studio-btn").style.display = "inline-block";
                    }

                    $("#nav-login-name").html(user.firstname);
                    $("#nav-drop-login-name").html(user.firstname + " " + user.lastname);


                }
            });
    });

    $("#nav-drop-logout-btn").click(function(){
        logoutUser();
    });

    $("#nav-drop-edit-profile-btn").click(function(){
        window.location.href = base_url+"views/customer-account.html";
    });

    $("#nav-drop-designer-studio-btn").click(function(){
        window.location.href = base_url+"views/designer-studio.html";
    });

    $("#cart-checkout-btn").click(function(){
        if(checkUserLogged()) {window.location.href = base_url+"views/checkout.html";}
        else {$('#login-modal').modal('show'); $('#cart-modal').modal('hide');}
    });

    $("#cart-close-btn").click(function(){
        $('#cart-modal').modal('hide');
    });

    $("#cart-w").click(function(){
        $('#cart-modal').modal('hide');
    });

    $("#fav-nav-btn").click(function() {
        if(checkUserLogged()){window.location.href = base_url+"views/customer-account.html";}
        else {$('#login-modal').modal('show'); $('#cart-modal').modal('hide'); $('#signup-modal').modal('hide');}
    });


    // login modal
    $("#login-modal").on('hidden.bs.modal', function () {
       $("#login-error-label").hide();
    });

    $("#nav-lang-submit-button").click(function(){
        $('#lang-modal').modal('hide');
        var value = $("#lang-selection").val();
        $("#nav-lang").html('<span class="glyphicon glyphicon-globe"></span>'+value);
    });

    $("#nav-currency-submit-button").click(function(){
        $('#currency-modal').modal('hide');
        var value = $("#currency-selection").val();
        var icon;
        if(value=="USD") {icon='<span class="glyphicon glyphicon-usd"></span>';}
        else if (value=="GBP") {icon='<span class="glyphicon glyphicon-gbp"></span>';}
        else if (value=="YEN") {icon='<span class="glyphicon glyphicon-yen"></span>';}
        else {icon='<span class="glyphicon glyphicon-eur"></span>';}
        $("#nav-currency").html(icon);
    });


});


function updateNavbarUserLogged(firstname, lastname, groups_id) {
    $("#login-error-label").hide();
    $('#login-modal').modal('hide');
    $("#login-nav-button").hide();
    $("#sign-nav-button").hide();
    $("#logged-nav-button").show();

    if(groups_id == "10") {
       $("#nav-drop-designer-studio-btn").show();
        //document.getElementById("nav-login-icon").href = "";

    }

    $("#nav-login-name").html(firstname);
    $("#nav-drop-login-name").html(firstname + " " + lastname);
}




// user info GET / SET
function getUserInfo() {
    var user_data = JSON.parse(sessionStorage.getItem("cfUserData"));
    return user_data;
}

function setUserInfo(user_data) {
    sessionStorage.setItem("cfUserData", JSON.stringify(user_data));
}




// chart mgmt
function getChart() {
    var cart = JSON.parse(sessionStorage.getItem("cfChartList"));
    if(cart===null) {
        cart = {
            products: []
        };
    }
    return cart;
}

function addElementToChart(data, n, size) {
    var cart = getChart();
    cart.products.push({"data": data, "n": n, "size":size});
    sessionStorage.setItem("cfChartList", JSON.stringify(cart));
    $("#success-alert").fadeIn(300);
    window.setTimeout(function () {
        $("#success-alert").fadeOut(500); }, 3000);
    setupChartBasket();
}

function removeElementToChart(id) {
    var cart = getChart();
    var new_cart = {
        products: []
    };
    for(var i=0; i<cart.products.length; i++) {
        if(cart.products[i].data.projects_id != id) {
            new_cart.products.push({"data":cart.products[i].data, "n":cart.products[i].n, "size":cart.products[i].size});}
    }
    sessionStorage.setItem("cfChartList", JSON.stringify(new_cart));
    setupChartBasket();
}

function changeCartProductQty(id, value){
    var cart = getChart();

    var data;
    var n;
    var size;

    for(var i=0; i<cart.products.length; i++) {
        if(cart.products[i].data.projects_id == id) {
            data = cart.products[i].data;
            n = parseInt(cart.products[i].n,10) + value;
            size = cart.products[i].size;
            removeElementToChart(id);
            break;
        }
    }
    addElementToChart(data,n,size);
    setupChartBasket();
}


function setupChartBasket() {

    $("#cart-items-container").empty();
    var cart = getChart();
    if(cart.products.length==0) {
        $("#nav-empty-cart-label").show();
        $("#cart-modal-info").hide();
        $("#cart-checkout-btn").hide();
        return;
    }
    $("#nav-empty-cart-label").hide();
    $("#cart-checkout-btn").show();
    $("#cart-modal-info").show();
    
    var total_price=0;
    var subtotal_price=0;
    var shipping_price=10;
    var plus = 1;
    var minus = -1;

    for (var i=0; i<cart.products.length; i++) {
        const qty = cart.products[i].n;
        const size = cart.products[i].size;
        var price = cart.products[i].data.price;
        var left = cart.products[i].data.left;
        var title = cart.products[i].data.title;
        var project_id = cart.products[i].data.projects_id;
        var img_url = base_url+"pic/"+project_id+"_1"+img_format;
        
        subtotal_price = subtotal_price + parseInt(price)*qty;


        $("#cart-items-container").append('<div class="row" id="cart-item">'+
            '<div class="col-sm-2">'+
            '<img src="'+img_url+'" width="100%"></div>'+
            '<div class="col-sm-3"><p><small>DESCRIPTION</small></p><p>'+title+'</p></div>'+
            '<div class="col-sm-3"><p><small>QUANTITY</small></p>'+
            '<button class="btn-plus-minus" onclick="changeCartProductQty('+project_id+','+minus+')">-</button><span id="cart-qty-label">'+qty+'</span>'+
            '<button class="btn-plus-minus" onclick="changeCartProductQty('+project_id+','+plus+')">+</button></div>'+
            '<div class="col-sm-2">'+ '<p><small>SIZE</small></p><p>'+size+'</p></div>'+
            '<div class="col-sm-2"><p><small>PRICE</small></p><p>'+price+'€</p></div>'+
            '</div>'+
            '<button class="btn-default cart-item-button" onclick="addElementToWishlist('+project_id+')"> ADD TO WISHLIST </button>'+
            '<button class="btn-default cart-item-button" onclick="removeElementToChart('+project_id+')"> REMOVE </button>');

    }
    
    total_price = subtotal_price + shipping_price;
    $("#cart-subtotal-price").html('<small>ITEM TOTAL: </small>'+subtotal_price+'€');
    $("#cart-shipping-price").html('<small>SHIPPING: </small>'+shipping_price+'€');
    $("#cart-total-price").html('TOTAL PRICE: '+total_price+'€');

    
}

function addElementToWishlist(id) {
    if(checkUserLogged()) {addToWishlist(id);}
    else {$('#login-modal').modal('show'); $('#cart-modal').modal('hide');}
}

    
function nav_search(){
    
}
    
function nav_favourite(){
    
}
    