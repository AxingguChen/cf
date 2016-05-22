/**
 * Created by giovanni on 22/05/16.
 */


getUser(sessionStorage.getItem("cfUserId"));



function getUser(id){
    var url_user = base_url+"index.php/users/view_user/"+id;
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
    document.getElementById("customer-firstname-label").innerHTML = data.firstname;
    document.getElementById("customer-lastname-label").innerHTML = data.lastname;
    document.getElementById("customer-email-label").innerHTML = data.email;
}