/**
 * Created by Giovanni on 20/05/2016.
 */

//var base_url = "http://www.airshowroom.com/cf/";
var base_url = "http://localhost/cf/";
var img_format = ".jpg";


//check if user is logged
function checkUserLogged() {
    if (sessionStorage.cfUserId === undefined) {return false;}
    return true;
}


function logoutUser(){
    sessionStorage.removeItem("cfUserId");
    sessionStorage.removeItem("cfUserFirstname");
    sessionStorage.removeItem("cfUserLastname");
    document.getElementById("login-nav-button").style.display = "inline";
    document.getElementById("sign-nav-button").style.display = "inline";
    document.getElementById("logged-nav-button").style.display = "none";
    isLogged=false;
    window.location.href = base_url+"views/home.html";
}


function addToWishlist(productId) {}
