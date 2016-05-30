/**
 * Created by Giovanni on 20/05/2016.
 */
var isLogged = false;

setupChartBasket();


// check user logged
$(document).ready(function () {
    if(checkUserLogged()) {
        isLogged=true;
        var user_id = sessionStorage.cfUserId;
        updateNavbarUserLogged(sessionStorage.cfUserFirstname,sessionStorage.cfUserLastname, sessionStorage.cfUserGroupsId);
    }
    if(localStorage.cfUserEmail !== undefined && localStorage.cfUserPassword !== undefined ) {
        document.getElementById('login-email-field').value = localStorage.cfUserEmail;
        document.getElementById('login-password-field').value = localStorage.cfUserPassword;
        document.getElementById('login-checkbox').checked = "checked";
    }
    else {
        document.getElementById('login-email-field').value = "";
        document.getElementById('login-email-field').placeholder = "email";
        document.getElementById('login-password-field').value = " ";
    }
});

// navbar login / logout
$(document).ready(function(){
    $("#nav-login-submit-button").click(function(){
        var userEmail = document.getElementById('login-email-field').value;
        var userPassw = document.getElementById('login-password-field').value;

        $.post(base_url+"index.php/users/login",
            {
                email: userEmail,
                password: userPassw

            },
            function(data,status){
                var json = JSON.parse(data);
                if(json.state==false) {
                    document.getElementById("login-error-label").style.display = "block";
                }
                else {
                    var user = json.rows[0];
                    sessionStorage.setItem("cfUserId",user.users_id);
                    sessionStorage.setItem("cfUserGroupsId",user.users_groups_id);
                    sessionStorage.setItem("cfUserFirstname",user.firstname);
                    sessionStorage.setItem("cfUserLastname",user.lastname);

                    if(document.getElementById('login-checkbox').checked) {
                        localStorage.setItem("cfUserEmail", userEmail);
                        localStorage.setItem("cfUserPassword", userPassw);
                    }
                    else { localStorage.removeItem("cfUserEmail"); localStorage.removeItem("cfUserPassword");}

                    document.getElementById("login-error-label").style.display = "none";
                    $('#login-modal').modal('hide');
                    document.getElementById("login-nav-button").style.display = "none";
                    document.getElementById("logged-nav-button").style.display = "inline";

                    if(user.users_groups_id == "10") {
                        document.getElementById("nav-drop-designer-studio-btn").style.display = "inline-block";
                    }

                    document.getElementById("nav-login-name").innerHTML = user.firstname;
                    document.getElementById("nav-drop-login-name").innerHTML = user.firstname + " " + user.lastname;


                }
            });
    });

    $("#nav-drop-logout-btn").click(function(){
        sessionStorage.removeItem("cfUserId");
        sessionStorage.removeItem("cfUserFirstname");
        sessionStorage.removeItem("cfUserLastname");
        document.getElementById("login-nav-button").style.display = "inline";
        document.getElementById("logged-nav-button").style.display = "none";
        isLogged=false;
    });

    $("#nav-drop-edit-profile-btn").click(function(){
        window.location.href = base_url+"views/customer-account.html";
    });

    $("#nav-drop-designer-studio-btn").click(function(){
        window.location.href = base_url+"views/designer-studio.html";
    });

    $("#cart-checkout-btn").click(function(){
        window.location.href = base_url+"views/checkout.html";
    });

    // login modal
    $("#login-modal").on('hidden.bs.modal', function () {
        document.getElementById("login-error-label").style.display = "none";
    });
});


function updateNavbarUserLogged(firstname, lastname, groups_id) {
    document.getElementById("login-error-label").style.display = "none";
    $('#login-modal').modal('hide');
    document.getElementById("login-nav-button").style.display = "none";
    document.getElementById("sign-nav-button").style.display = "none";
    document.getElementById("logged-nav-button").style.display = "inline";

    if(groups_id == "10") {
        document.getElementById("nav-drop-designer-studio-btn").style.display = "inline-block";
        //document.getElementById("nav-login-icon").href = "";

    }

    document.getElementById("nav-login-name").innerHTML = firstname;
    document.getElementById("nav-drop-login-name").innerHTML = firstname + " " + lastname;
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

function addElementToChart(data, n) {
    var cart = getChart();
    cart.products.push({"data": data, "n": n});
    sessionStorage.setItem("cfChartList", JSON.stringify(cart));
    alert(cart);
}

function removeElementToChart(id) {
    var cart = getChart();
    var new_cart = {
        products: []
    };
    for(var i=0; i<cart.products.length; i++) {
        if(cart.products[i].data.projects_id !== id) {
            new_cart.products.push({"data":cart.products[i].data, "n":cart.products[i].n});}
    }
    sessionStorage.setItem("cfChartList", JSON.stringify(new_cart));
    alert(new_cart)
}

function setupChartBasket() {
    var cart = getChart();
    //if(chart.length>0) {document.getElementById("nav-empty-cart-label").style.display ="none";}
    for (var i=0; i<cart.products.length; i++) {
        const qty = cart.products[i].n;
        var price = cart.products[i].data.price;
        var left = cart.products[i].data.left;
        var title = cart.products[i].data.title;
        var project_id = cart.products[i].data.projects_id;
        var img_url = base_url+"pic/"+project_id+"_1.png";


        $("#cart-items-container").append('<div class="row">'+
            '<div class="col-sm-2">'+
            '<img src="'+img_url+'" width="100%"></div>'+
            '<div class="col-sm-4"><p><small>DESCRIPTION</small></p><p>'+title+'</p></div>'+
            '<div class="col-sm-2"><p><small>QUANTITY</small></p><p>'+qty+'</p></div>'+
            '<div class="col-sm-2">'+ '<p><small>AVAILABILITY</small></p><p>left</p></div>'+
            '<div class="col-sm-2"><p><small>PRICE</small></p><p>'+price+'</p></div>'+
            '</div>'+
            '<button class="btn-default" onclick="addElementToWishlist('+project_id+')"> ADD TO WISHLIST </button>'+
            '<button class="btn-default" onclick="removeElementToChart('+project_id+')"> REMOVE </button>'+
            '<div class="divider"</div>');

    }
    
}

function addElementToWishlist(id) {
    
}

function nav_signup(){

}
    
function nav_search(){
    
}
    
function nav_favourite(){
    
}
    