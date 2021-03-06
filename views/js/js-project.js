/**
 * Created by Giovanni on 20/05/2016.
 */

var url_project = base_url+"index.php/projects/view_project/"+"3";

var project_id;
var project_data;
var qty=1;
var size;


$(document).ready(function(){

    var str = self.location.search;
    var id = str.replace("?", "");
    url_project = base_url+"index.php/projects/view_project/"+id;

    setupChartBasket();

    $("#cart-button").click(function(){
        var n = $("#project-qty-field").val();
        var size = $("#size-select").val();
        addElementToChart(project_data, n, size);
        document.getElementById("cart-button").style.display="none";
        document.getElementById("cart-remove-button").style.display="inline";
    });

    $("#cart-remove-button").click(function(){
        removeElementToChart(project_id);
        document.getElementById("cart-button").style.display="inline";
        document.getElementById("cart-remove-button").style.display="none";
    });

    $(".secondary-img").click(function(){
        var src = this.src;
        $("#highlight-img").attr("src",src);
    }).load(function() {
        $(this).show();
    });

    $("#wishlist-button").click(function(){
        if(checkUserLogged()) {
            addElementToWishlist(project_id);
            $("#wishlist-button").hide();
            $("#wishlist-remove-button").show();
        }
        else {$('#login-modal').modal('show');}
    });

    $("#wishlist-remove-button").click(function () {
        $("#wishlist-remove-button").hide();
        $("#wishlist-button").show();
        removeElementFromWishlist(project_id);
    });
    
    getProject();

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
};




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
    document.getElementById("price-label").innerHTML = data.price+"€";
    document.getElementById("founded-label").innerHTML = data.sale_current + "/" + data.sale_minimum;
    document.getElementById("days-to-go-label").innerHTML = data.round;
    document.getElementById("project-batch-label").innerHTML = data.batch;
    document.getElementById("product-info").firstElementChild.innerHTML = data.description;
    document.getElementById("designer-avatar").src = base_url+"avatar/"+data.users_id + img_format;
    document.getElementById("designer-link").href = base_url+"views/designer.html?"+data.users_id;
    document.getElementById("designer-full-info-link").href = base_url+"views/designer.html?"+data.users_id;
    document.getElementById("designer-contact-link").href = base_url+"views/designer.html?"+data.users_id;
    document.getElementById("designer-info-name").innerHTML = data.firstname + " " + data.lastname;
    var link = "http://" + data.website;
    document.getElementById("designer-info-website").innerHTML = "<a target='_blank' href="+link+">" +data.website+"</a>";
    document.getElementById("materials-field").innerHTML = data.materials;
    document.getElementById("wash-dry-field").innerHTML = data.wash_dry;
    document.getElementById("other-info-field").innerHTML = data.other;
    document.getElementById("highlight-img").src = base_url+"pic/"+data.projects_id+"_1"+img_format;
    document.getElementById("secondary-img-1").src = base_url+"pic/"+data.projects_id+"_1"+img_format;
    document.getElementById("secondary-img-2").src = base_url+"pic/"+data.projects_id+"_2"+img_format;
    document.getElementById("secondary-img-3").src = base_url+"pic/"+data.projects_id+"_3"+img_format;
    document.getElementById("secondary-img-4").src = base_url+"pic/"+data.projects_id+"_4"+img_format;
    
    
    getRelatedProducts(data);
    getComments(data);
}

function updateComments(comments_data) {
    if(comments_data.length==0) { document.getElementById("no-comments-label").style.display = "inline"; return;}
    for(i=0; i<comments_data.length && i<4; i++) {
        getUser(comments_data[i], i);
    }
}

function addQty() {
    qty++;
    $("#project-qty-field").val(qty);
}
function removeQty() {
    if(qty>1) {
       qty--; 
    }
    else {qty=1;}
    $("#project-qty-field").val(qty);
}



