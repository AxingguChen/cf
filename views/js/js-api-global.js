/**
 * Created by Giovanni on 20/05/2016.
 */

var base_url = "http://localhost/cf/";


function login(updateFunction){
    var url_login = base_url+"index.php/users/login";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json_array = JSON.parse(xmlhttp.responseText);
            var data = json_array.rows[0];
            updateFunction(data);
        }
    };
    xmlhttp.open("GET", url_login, true);
    xmlhttp.send();
}

//check if user is logged
function checkUserLogged() {
    if (sessionStorage.cf-login) {return true;} 
    return false;
}


function getDesigner(id, updateFunction){
    var url_designer = base_url+"index.php/users/view_designer/"+id;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json_array = JSON.parse(xmlhttp.responseText);
            var data = json_array.rows[0];
            updateFunction(data);
        }
    };
    xmlhttp.open("GET", url_designer, true);
    xmlhttp.send();
}

function getProject(id, updateFunction){
    var url_project = base_url+"index.php/projects/view_project/"+id;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json_array = JSON.parse(xmlhttp.responseText);
            var data = json_array.rows[0];
            updateFunction(data);
        }
    };
    xmlhttp.open("GET", url_project, true);
    xmlhttp.send();
}

function getComments(id, updateFunction){
    var url_comments = base_url+"index.php/comment/view_comments/"+id;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json_array = JSON.parse(xmlhttp.responseText);
            var data = json_array.rows[0];
            updateFunction(data);
        }
    };
    xmlhttp.open("GET", url_comments, true);
    xmlhttp.send();
}

function getUser(id, updateFunction){
    var url_user = base_url+"index.php/projects/view_user/"+id;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json_array = JSON.parse(xmlhttp.responseText);
            var data = json_array.rows[0];
            updateFunction(data);
        }
    };
    xmlhttp.open("GET", url_user, true);
    xmlhttp.send();
}