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


getProjects();
document.getElementById("design-control-left").disabled = true;



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






jQuery("#action-all-gender").click(function(e){
    document.getElementById("filter-gender").childNodes.item(1).innerHTML = "Any gender";
    filter_gender = F_ANY_GENDER; e.preventDefault(); getProjects();
});
jQuery("#action-woman").click(function(e){document.getElementById("filter-gender").childNodes.item(1).innerHTML = "Woman"; filter_gender = F_FEMALE; getProjects(); e.preventDefault();});
jQuery("#action-man").click(function(e){document.getElementById("filter-gender").childNodes.item(1).innerHTML = "Man"; filter_gender = F_MALE; getProjects(); e.preventDefault();});
jQuery("#action-all-type").click(function(e){document.getElementById("filter-type").childNodes.item(1).innerHTML = "Any type"; filter_type = F_ANY_TYPE; getProjects();  e.preventDefault();});
jQuery("#action-shoes").click(function(e){document.getElementById("filter-type").childNodes.item(1).innerHTML = "Shoes"; filter_type = F_SHOES; getProjects(); e.preventDefault();});
jQuery("#action-pants").click(function(e){document.getElementById("filter-type").childNodes.item(1).innerHTML = "Pants"; filter_type = F_PANTS; getProjects(); e.preventDefault();});
jQuery("#action-tshirt").click(function(e){document.getElementById("filter-type").childNodes.item(1).innerHTML = "T-Shirts"; filter_type = F_TSHIRT; getProjects(); e.preventDefault();});
jQuery("#action-all-color").click(function(e){document.getElementById("filter-color").childNodes.item(1).innerHTML = "Any color"; filter_color = F_ANY_COLOR; getProjects(); e.preventDefault();});
jQuery("#action-white").click(function(e){document.getElementById("filter-color").childNodes.item(1).innerHTML = '<span class="glyphicon glyphicon-tint" style="color:white;"></span>White'; filter_color = F_WHITE; getProjects();  e.preventDefault();});
jQuery("#action-black").click(function(e){document.getElementById("filter-color").childNodes.item(1).innerHTML = '<span class="glyphicon glyphicon-tint" style="color:black;"></span>Black'; filter_color = F_BLACK; getProjects(); e.preventDefault();});
jQuery("#action-yellow").click(function(e){document.getElementById("filter-color").childNodes.item(1).innerHTML = '<span class="glyphicon glyphicon-tint" style="color:yellow;"></span>Yellow'; filter_color = F_YELLOW; getProjects(); e.preventDefault();});
jQuery("#action-green").click(function(e){document.getElementById("filter-color").childNodes.item(1).innerHTML = '<span class="glyphicon glyphicon-tint" style="color:green;"></span>Green'; filter_color = F_GREEN; getProjects(); e.preventDefault();});
jQuery("#action-blue").click(function(e){document.getElementById("filter-color").childNodes.item(1).innerHTML = '<span class="glyphicon glyphicon-tint" style="color:blue;"></span>Blue'; filter_color = F_BLUE; getProjects(); e.preventDefault();});
jQuery("#action-red").click(function(e){document.getElementById("filter-color").childNodes.item(1).innerHTML = '<span class="glyphicon glyphicon-tint" style="color:red;"></span>Red'; filter_color = F_RED; getProjects(); e.preventDefault();});
jQuery("#action-orange").click(function(e){document.getElementById("filter-color").childNodes.item(1).innerHTML = '<span class="glyphicon glyphicon-tint" style="color:orange;"></span>Orange'; filter_color = F_ORANGE; getProjects(); e.preventDefault();});
jQuery("#action-no-sort").click(function(e){document.getElementById("filter-sort").childNodes.item(1).innerHTML = "Sort by"; filter_sort = F_NO_SORT; getProjects(); e.preventDefault();});
jQuery("#action-name").click(function(e){document.getElementById("filter-sort").childNodes.item(1).innerHTML = "Sort by: Popular"; filter_sort = F_POPULAR; getProjects(); e.preventDefault();});
jQuery("#action-last").click(function(e){document.getElementById("filter-sort").childNodes.item(1).innerHTML = "Sort by: Last Chance"; filter_sort = F_LASTCHANCE; getProjects();e.preventDefault();});
jQuery("#action-new").click(function(e){document.getElementById("filter-sort").childNodes.item(1).innerHTML = "Sort by: New"; filter_sort = F_NEW; getProjects();e.preventDefault();});

jQuery("#action-clear-all").click(function(e){
    document.getElementById("filter-sort").childNodes.item(1).innerHTML = "Sort by"; e.preventDefault();
    document.getElementById("filter-gender").childNodes.item(1).innerHTML = "Any gender";
    document.getElementById("filter-type").childNodes.item(1).innerHTML = "Any type";
    document.getElementById("filter-color").childNodes.item(1).innerHTML = "Any color";
    filter_color = -1;
    filter_gender = -1;
    filter_type = -1;
    filter_sort = -1;
    getProjects();
    e.preventDefault();
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