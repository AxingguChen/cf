/**
 * Created by Giovanni on 25/05/16.
 */

// filter consts
const F_ANY_GENDER = -1;
const F_ANY_TYPE = -1;
const F_ANY_COLOR = -1;
const F_NO_SORT = -1;
const F_FEMALE = 0;
const F_MALE = 1;
const F_SHOES = 0;
const F_PANTS = 0;
const F_TSHIRT= 0;
const F_WHITE = 0;
const F_BLACK = 1;
const F_YELLOW = 2;
const F_GREEN = 3;
const F_BLUE = 4;
const F_RED = 5;
const F_ORANGE = 6;
const F_POPULAR = 0;
const F_NEW = 1;
const F_LASTCHANCE = 2;


// init filters
var filter_gender = -1;
var filter_type = -1;
var filter_color = -1;
var filter_sort = -1;

var projects_offset=0;

// init url strings
var base_url = "http://localhost/cf/";
var urlProjects = base_url+"index.php/projects/view_projects_filter/"+ filter_type + "/"+ filter_gender + "/"+ filter_color + "/" + filter_sort + "/" + projects_offset;

$(document).ready(function(){
    getProjects();
    document.getElementById("design-control-left").disabled = true;
    setupChartBasket();
});


$(document).ready(function(){
    $("#filters-modal-close-btn").click(function(){
        $('#filters-modal').modal('hide');
    });
});



// get design data
function getProjects(){
    urlProjects = base_url+"index.php/projects/view_projects_filter/"+ filter_type + "/"+ filter_gender + "/"+ filter_color + "/" + filter_sort + "/" + projects_offset;
    var xmlhttpDesign = new XMLHttpRequest();
    xmlhttpDesign.onreadystatechange = function() {
        if (xmlhttpDesign.readyState == 4 && xmlhttpDesign.status == 200) {
            var arr = JSON.parse(xmlhttpDesign.responseText);
            updateProjects(arr.rows);
        }
    };
    xmlhttpDesign.open("GET", urlProjects, true);
    xmlhttpDesign.send();
}


function updateProjects(arr) {
    var i,j=0;
    hideAll();

    if(arr.length==0) { showNoResult(true); document.getElementById("design-control-right").disabled = true; return;}
    else {
        showNoResult(false);
        if (arr.length<8) {document.getElementById("design-control-right").disabled = true;}
        else {document.getElementById("design-control-right").disabled = false;}
    }

    for(i = 0; i < Math.min(arr.length, 8); i++) {
        if(i<4) {
            var d0 = document.getElementById("projects-container").childNodes.item(1).childNodes.item(j);
            if(!d0.hasChildNodes()) {
                j++; d0 = document.getElementById("projects-container").childNodes.item(1).childNodes.item(j);
            }
        }
        else {
            var d0 = document.getElementById("projects-container").childNodes.item(3).childNodes.item(j);
            if(!d0.hasChildNodes()) {
                j++; d0 = document.getElementById("projects-container").childNodes.item(3).childNodes.item(j);
            }
        }

        // set visible
        d0.childNodes.item(1).style.visibility = "visible";
        d0.childNodes.item(1).style.display = "inline";

        // set link
        d0.childNodes.item(1).href=base_url+"views/project.html?"+arr[i].projects_id;

        // update img	
        img_path = "http://localhost/cf/pic/"+arr[i].projects_id+"_1.png";
        d0.childNodes.item(1).childNodes.item(1).src = img_path;
        // update title
        d0.childNodes.item(1).childNodes.item(3).innerHTML = arr[i].title;
        // update price
        d0.childNodes.item(1).childNodes.item(5).childNodes.item(1).childNodes.item(1).childNodes.item(1).innerHTML = arr[i].price+"€";
        // update founded
        d0.childNodes.item(1).childNodes.item(5).childNodes.item(3).childNodes.item(1).childNodes.item(1).innerHTML = arr[i].sale_current+"/"+arr[i].sale_minimum;
        j++;
        if(i==3){j=0;}
    }
}

function showNoResult (value) {
    if(value) { document.getElementById("no-result-banner").style.display = "inline"; }
    else { document.getElementById("no-result-banner").style.display = "none"; }
}

function hideAll() {
    var divsToHide = document.getElementsByClassName("project-thumbnail"); //divsToHide is an array
    for(var i = 0; i < divsToHide.length; i++){
        divsToHide[i].style.display = "none"; // depending on what you're doing
    }
}

function designOffsetRight(){
    projects_offset++;
    getProjects();
    document.getElementById("design-control-left").disabled = false;
}

function designOffsetLeft(){
    if(projects_offset>0) {
        projects_offset--;
        getProjects();
        if(projects_offset==0) {
            document.getElementById("design-control-left").disabled = true;
        }
    }
}