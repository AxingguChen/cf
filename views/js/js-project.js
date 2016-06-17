/**
 * Created by Giovanni on 20/05/2016.
 */

var url_project = base_url+"index.php/projects/view_project/"+"3";

var project_id;
var project_data;


$(document).ready(function(){

    setupChartBasket();

    $("#add-cart-confirm").click(function(){
        var n = document.getElementById("cart-modal-pieces-label").value;
        addElementToChart(project_data, n);
        document.getElementById("cart-button").style.display="none";
        document.getElementById("cart-remove-button").style.display="inline";
        $(function () {
            $('#cart-add-modal').modal('toggle');
        });
    });
    $("#add-cart-cancel").click(function(){
        $(function () {
            $('#cart-add-modal').modal('toggle');
        });
    });
    $("#cart-remove-button").click(function(){
        removeElementToChart(project_id);
        document.getElementById("cart-button").style.display="inline";
        document.getElementById("cart-remove-button").style.display="none";
    });
});

function dropdownFilter1() {
    document.getElementById("dropdown1").classList.toggle("show");
}
function dropdownFilter2() {
    document.getElementById("dropdown2").classList.toggle("show");
}
function dropdownFilter3() {
    document.getElementById("dropdown3").classList.toggle("show");
}
function dropdownFilter4() {
    document.getElementById("dropdown4").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {

        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}




function getProject(){

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json_array = JSON.parse(xmlhttp.responseText);
            project_data = json_array.rows[0];
            project_id = project_data.projects_id;
            updateProjectInfo(project_data);
        }
    };
    xmlhttp.open("GET", url_project, true);
    xmlhttp.send();
}

function getComments(data){
    var url_comments = base_url+"index.php/comment/view_comments/"+data.users_id;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json_array = JSON.parse(xmlhttp.responseText);
            var comments_data = json_array.rows;
            updateComments(comments_data);
        }
    };
    xmlhttp.open("GET", url_comments, true);
    xmlhttp.send();
}

function getUser(comment_data, index){
    var url_user = base_url+"index.php/users/view_user/"+comment_data.comments_users_id;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json_array = JSON.parse(xmlhttp.responseText);
            var user_data = json_array.rows;


            //document.getElementById("c"+index+"-user-icon").src = ..... ;
            document.getElementById("c"+index+"-user-name").innerHTML = user_data.firstname + " " + user_data.lastname;
            document.getElementById("c"+index+"-user-text").innerHTML = comment_data.comment;
            document.getElementById("c-r-"+index).style.display = "inline";
        }
    };
    xmlhttp.open("GET", url_user, true);
    xmlhttp.send();
}


function getRelatedProducts(data) {
    var url_related = base_url+"index.php/projects/view_project_related/"+data.projects_id;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json_array = JSON.parse(xmlhttp.responseText);
            var related_data = json_array.rows;

            for(i=0; i<related_data.length && i<4; i++) {
                document.getElementById("related-"+i+"-img").src = base_url+"pic/"+related_data[i].projects_id+"_1"+img_format;
                document.getElementById("related-"+i+"-title").innerHTML = related_data[i].title;
                document.getElementById("related-"+i).style.display = "inline";
                document.getElementById("related-"+i).childNodes[1].href = base_url+"views/project.html?"+related_data[i].projects_id;
            }

        }
    };
    xmlhttp.open("GET", url_related, true);
    xmlhttp.send();
}



function updateProjectInfo(data) {
    document.getElementById("project-title").innerHTML = data.title;
    document.getElementById("dir-product-name").innerHTML = data.title;
    document.getElementById("project-designer").innerHTML = "by " + data.firstname + " " + data.lastname;
    document.getElementById("highlight-img").src = "http://localhost/cf/pic/"+data.projects_id+"_1"+img_format;
    document.getElementById("secondary-img-1").src = "http://localhost/cf/pic/"+data.projects_id+"_2"+img_format;
    document.getElementById("secondary-img-2").src = "http://localhost/cf/pic/"+data.projects_id+"_3"+img_format;
    document.getElementById("secondary-img-3").src = "http://localhost/cf/pic/"+data.projects_id+"_4"+img_format;
    document.getElementById("price-label").innerHTML = data.price+"€";
    document.getElementById("founded-label").innerHTML = data.sale_current + " / " + data.sale_minimum;
    document.getElementById("days-to-go-label").innerHTML = data.round + " days";
    document.getElementById("product-info").firstElementChild.innerHTML = data.description;
    document.getElementById("designer-avatar").src = base_url+"avatar/"+data.users_id + img_format;
    document.getElementById("designer-info-name").innerHTML = data.firstname + " " + data.lastname;
    var link = "http://" + data.website;
    document.getElementById("designer-info-website").innerHTML = "<a target='_blank' href="+link+">" +data.website+"</a>";
    document.getElementById("materials-field").innerHTML = data.materials;
    document.getElementById("wash-dry-field").innerHTML = data.wash_dry;
    document.getElementById("other-info-field").innerHTML = data.other;

    getRelatedProducts(data);
    getComments(data);
}

function updateComments(comments_data) {
    if(comments_data.length==0) { document.getElementById("no-comments-label").style.display = "inline"; return;}
    for(i=0; i<comments_data.length && i<4; i++) {
        getUser(comments_data[i], i);
    }
}

var str = self.location.search;
var id = str.replace("?", "");
url_project = base_url+"index.php/projects/view_project/"+id;

getProject();



