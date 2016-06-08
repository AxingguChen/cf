/**
 * Created by giovanni on 08/06/16.
 */


// init key-value maps
var category_strings = {
    '-1': 'All categories',
    '0': 'Womenswear',
    '1': 'Menswear',
    '2': 'Other'
};

var country_strings = {
    '-1': 'All countries'
};

var sort_strings = {
    '-1': 'Sales',
    '1': 'Popularity'
};

var school_strings = {
    '-1': 'All schools',
    '1': '',
    '2': '',
    '3': '',
    '4': '',
    '5': '',
    '6': '',
    '7': '',
    '8': '',
    '9': '',
    '10': '',
    '11': '',
    '12': '',
    '13': '',
    '14': '',
    '15': '',
    '16': '',
    '17': '',
    '18': '',
    '19': '',
    '20': '',
    '21': ''
};



// init filters
var filter_category = -1;
var filter_country = -1;
var filter_school = -1;
var filter_sort = -1;

var category_temp = -1;
var country_temp = -1;
var school_temp = -1;
var sort_temp = -1;


// init url strings
var base_url = "http://localhost/cf/";
var urlDesigners = base_url+"index.php/users/view_designers";
var designers_offset=0;



$(document).ready(function(){
    getDesigners();
    document.getElementById("design-control-left").disabled = true;
    setupChartBasket();
});


$(document).ready(function(){
    $("#filters-modal-close-btn").click(function(){
        $('#filters-modal').modal('hide');
    });

    $("#filters-modal-set-btn").click(function(){

        filter_category = category_temp;
        filter_country = country_temp;
        filter_school = school_temp;
        filter_sort = sort_temp;
        updateFilterTab();
        $('#filters-modal').modal('hide');
        //need to set filters into URL
        getDesigners();
    });


    $(".filter-item").click(function(e){
        if($(e.target).data("type")=="cat"){setCategoryFilter(e);}
        else if($(e.target).data("type")=="school"){setSchoolFilter(e);}
        else if($(e.target).data("type")=="country"){setCountryFilter(e);}
        else if($(e.target).data("type")=="sort"){setSortFilter(e);}
    });

    $("#filters-clear-btn").click(function(e){
        filter_category = -1;
        filter_country = -1;
        filter_sort = -1;
        filter_school = -1;
        updateFilterTab();
        getDesigners();
    });

});



// get design data
function getDesigners(){
    var xmlhttpDesign = new XMLHttpRequest();
    xmlhttpDesign.onreadystatechange = function() {
        if (xmlhttpDesign.readyState == 4 && xmlhttpDesign.status == 200) {
            var arr = JSON.parse(xmlhttpDesign.responseText);
            updateDesigners(arr.rows);
        }
    };
    xmlhttpDesign.open("GET", urlDesigners+"/"+designers_offset, true);
    xmlhttpDesign.send();
}




function updateDesigners(arr) {
    var i,j=0;
    for(i = 0; i < arr.length; i++) {
        if(i<4) {
            var d0 = document.getElementById("designers-container").childNodes.item(1).childNodes.item(j);
            if(!d0.hasChildNodes()) {
                j++; d0 = document.getElementById("designers-container").childNodes.item(1).childNodes.item(j);
            }
        }
        else {
            var d0 = document.getElementById("designers-container").childNodes.item(3).childNodes.item(j);
            if(!d0.hasChildNodes()) {
                j++; d0 = document.getElementById("designers-container").childNodes.item(3).childNodes.item(j);
            }
        }

        // set visible
        d0.childNodes.item(1).style.visibility = "visible";

        // set link
        d0.childNodes.item(1).href=base_url+"views/designer.html?"+arr[i].users_id;

        // update img	
        img_path = base_url+"avatar/"+arr[i].users_id+".png";
        d0.childNodes.item(1).childNodes.item(1).src = img_path;
        // update name
        d0.childNodes.item(1).childNodes.item(3).innerHTML = arr[i].firstname + " " + arr[i].lastname;
        // update city
        d0.childNodes.item(1).childNodes.item(5).innerHTML = "<small>"+arr[i].city+"</small>";
        // update projects
        //d0.childNodes.item(1).childNodes.item(7).childNodes.item(1).childNodes.item(1).childNodes.item(1).innerHTML = arr[i].price+"€";
        // update realized
        //d0.childNodes.item(1).childNodes.item(7).childNodes.item(3).childNodes.item(1).childNodes.item(1).innerHTML = arr[i].sale_current+"/"+arr[i].sale_minimum;
        j++;
        if(i==3){j=0;}
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
        if(x[i].getAttribute("data-label")=="cat") {
            x[i].innerHTML = category_strings[filter_category];
        }
        else if(x[i].getAttribute("data-label")=="country") {
            x[i].innerHTML = country_strings[filter_country];
        }
        else if(x[i].getAttribute("data-label")=="sort") {
            x[i].innerHTML = sort_strings[filter_sort];
        }
        else if(x[i].getAttribute("data-label")=="school") {
            x[i].innerHTML = school_strings[filter_school];
        }
    }
}



function setCategoryFilter(e) {
    var x = document.getElementById("filters-category-list").getElementsByClassName("filter-item");
    var i;
    for (i = 0; i < x.length; i++) {
        x[i].style.borderColor= "transparent";
    }
    $(e.target).css("border-color","#f1f1f1");
    category_temp = $(e.target).data("value");
}

function setCountryFilter(e) {
    var x = document.getElementById("filters-country-list").getElementsByClassName("filter-item");
    var i;
    for (i = 0; i < x.length; i++) {
        x[i].style.borderColor= "transparent";
    }
    $(e.target).css("border-color","#f1f1f1");
    country_temp = $(e.target).data("value");
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

function setSchoolFilter(e) {
    var x = document.getElementById("filters-school-list1").getElementsByClassName("filter-item");
    var i;
    for (i = 0; i < x.length; i++) {
        x[i].style.borderColor= "transparent";
    }
    $(e.target).css("border-color","#f1f1f1");
    school_temp = $(e.target).data("value");
}