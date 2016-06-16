/**
 * Created by Giovanni on 25/05/16.
 */

// init key-value maps
var color_strings = {
    '-1': 'Any color',
    '1': 'White',
    '2': 'Black',
    '3': 'Yellow',
    '4': 'Green',
    '5': 'Blue',
    '6': 'Red',
    '7': 'Orange'
};

var gender_strings = {
    '-1': 'Shop All',
    '0': 'Womenswear',
    '1': 'Menswear'
};

var sort_strings = {
    '-1': 'New Arrival',
    '1': 'Last Chance',
    '3': 'Popularity'
};

var type_strings = {
    '-1': 'Any type',
    '1': 'Jackets and Coats',
    '2': 'Blouses',
    '3': 'Cropped',
    '4': 'Knitwear',
    '5': 'Shirts',
    '6': 'T-Shirts',
    '7': 'Tunics',
    '8': 'Tanks',
    '9': 'Evening',
    '10': 'Casual',
    '11': 'Midi',
    '12': 'Maxi',
    '13': 'Mini',
    '14': 'Gown',
    '15': 'Sump Suit',
    '16': 'Bridal',
    '17': 'Skirts',
    '18': 'Trousers',
    '19': 'Shorts',
    '20': 'Leggins',
    '21': 'Jeans'
};



// init filters
var filter_gender = -1;
var filter_type = -1;
var filter_color = -1;
var filter_sort = -1;

var gender_temp = -1;
var type_temp = -1;
var color_temp = -1;
var sort_temp = -1;

var projects_offset=0;

// init url strings
var base_url = "http://www.airshowroom.com/cf/";
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

    $("#filters-modal-set-btn").click(function(){

        filter_gender = gender_temp;
        filter_color = color_temp;
        filter_sort = sort_temp;
        filter_type = type_temp;
        updateFilterTab();
        $('#filters-modal').modal('hide');
        getProjects();
    });


    $(".filter-item").click(function(e){
        if($(e.target).data("type")=="color"){setColorFilter(e);}
        else if($(e.target).data("type")=="type"){setTypeFilter(e);}
        else if($(e.target).data("type")=="gender"){setGenderFilter(e);}
        else if($(e.target).data("type")=="sort"){setSortFilter(e);}
    });

    $("#filters-clear-btn").click(function(e){
        filter_gender = -1;
        filter_color = -1;
        filter_sort = -1;
        filter_type = -1;
        updateFilterTab();
        getProjects();
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
        img_path = "http://localhost/cf/pic/"+arr[i].projects_id+"_1.jpeg";
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

function showFilterModal() {
    $('#filters-modal').modal('show');
}


function updateFilterTab(){
    var x = document.getElementById("filters-tab").getElementsByClassName("dropbtn");
    var i;
    for (i = 0; i < x.length; i++) {
        if(x[i].getAttribute("data-label")=="color") {
            x[i].innerHTML = color_strings[filter_color];
        }
        else if(x[i].getAttribute("data-label")=="type") {
            x[i].innerHTML = type_strings[filter_type];
        }
        else if(x[i].getAttribute("data-label")=="sort") {
            x[i].innerHTML = sort_strings[filter_sort];
        }
        else if(x[i].getAttribute("data-label")=="gender") {
            x[i].innerHTML = gender_strings[filter_gender];
        }
    }
}



function setColorFilter(e) {
    var x = document.getElementById("filters-color-list").getElementsByClassName("filter-item");
    var i;
    for (i = 0; i < x.length; i++) {
        x[i].style.borderColor= "transparent";
    }
    $(e.target).css("border-color","#f1f1f1");
    color_temp = $(e.target).data("value");
}

function setGenderFilter(e) {
    var x = document.getElementById("filters-gender-list").getElementsByClassName("filter-item");
    var i;
    for (i = 0; i < x.length; i++) {
        x[i].style.borderColor= "transparent";
    }
    $(e.target).css("border-color","#f1f1f1");
    gender_temp = $(e.target).data("value");
}

function setSortFilter(e) {
    var x = document.getElementById("filters-sort-list").getElementsByClassName("filter-item");
    var i;
    for (i = 0; i < x.length; i++) {
        x[i].style.borderColor= "transparent";
    }
    $(e.target).css("border-color","#f1f1f1");
    sort_temp = $(e.target).data("value");
}

function setTypeFilter(e) {
    var x = document.getElementById("filters-type-list1").getElementsByClassName("filter-item");
    var i;
    for (i = 0; i < x.length; i++) {
        x[i].style.borderColor= "transparent";
    }
    x = document.getElementById("filters-type-list2").getElementsByClassName("filter-item");
    for (i = 0; i < x.length; i++) {
        x[i].style.borderColor= "transparent";
    }
    $(e.target).css("border-color","#f1f1f1");
    type_temp = $(e.target).data("value");
}