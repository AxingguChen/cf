/**
 * Created by Giovanni on 20/05/2016.
 */

var base_url = "http://www.airshowroom.com/cf/";
//var base_url = "http://localhost/cf/";
var img_format = ".jpg";


//check if user is logged
function checkUserLogged() {
    if (sessionStorage.cfUserId === undefined) {return false;}
    return true;
}


function addToWishlist(productId) {}
