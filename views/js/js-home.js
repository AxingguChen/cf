/**
 * Created by Giovanni on 20/05/2016.
 */

// init url strings
var urlLastChance = base_url+"index.php/projects/view_projects_lastchance";
var urlDesign = base_url+"index.php/projects/view_projects_homepage";
var design_offset=0;

// get last chance data
function getLastChance(){
    var xmlhttpLast = new XMLHttpRequest();
    xmlhttpLast.onreadystatechange = function() {
        if (xmlhttpLast.readyState == 4 && xmlhttpLast.status == 200) {
            var arr = JSON.parse(xmlhttpLast.responseText);
            updateLastChance(arr.rows);
        }
    };
    xmlhttpLast.open("GET", urlLastChance, true);
    xmlhttpLast.send();
}

// get design data
function getHomeDesigns(){
    var xmlhttpDesign = new XMLHttpRequest();
    xmlhttpDesign.onreadystatechange = function() {
        if (xmlhttpDesign.readyState == 4 && xmlhttpDesign.status == 200) {
            var arr = JSON.parse(xmlhttpDesign.responseText);
            updateDesign(arr.rows);
        }
    };
    xmlhttpDesign.open("GET", urlDesign+"/"+design_offset, true);
    xmlhttpDesign.send();
}

function updateLastChance(arr) {
    var i,j=0;
    for(i = 0; i < arr.length; i++) {
        var el0 = document.getElementById("carusel").childNodes.item(j);
        if(!el0.hasChildNodes()) {
            j++; el0 = document.getElementById("carusel").childNodes.item(j);
        }

        // update link
        el0.href = base_url+"views/project.html?"+arr[i].projects_id;

        //update title
        el0.childNodes.item(1).childNodes.item(1).childNodes.item(5).childNodes.item(1).innerHTML = arr[i].title;
        //update owner and description
        el0.childNodes.item(1).childNodes.item(1).childNodes.item(5).childNodes.item(3).innerHTML = "<h4><small>By <strong>"+ arr[i].firstname + arr[i].lastname +"</strong></br></br>" + arr[i].description + "</small></h4>" ;
        // update image
        img_path = base_url+"pic/"+arr[i].projects_id+"_1"+img_format;
        el0.childNodes.item(1).childNodes.item(1).childNodes.item(3).childNodes.item(1).src = img_path;

        j++;
    }
}

function updateDesign(arr) {
    var i,j=0;
    for(i = 0; i < arr.length; i++) {
        if(i<3) {
            var d0 = document.getElementById("design-container").childNodes.item(1).childNodes.item(j);
            if(!d0.hasChildNodes()) {
                j++; d0 = document.getElementById("design-container").childNodes.item(1).childNodes.item(j);
            }
        }
        else {
            var d0 = document.getElementById("design-container").childNodes.item(3).childNodes.item(j);
            if(!d0.hasChildNodes()) {
                j++; d0 = document.getElementById("design-container").childNodes.item(3).childNodes.item(j);
            }
        }

        // update link
        d0.href = base_url+"views/project.html?"+arr[i].projects_id;

        // update img	
        img_path = base_url+"pic/"+arr[i].projects_id+"_1"+img_format;
        d0.childNodes.item(1).childNodes.item(1).src = img_path;
        // update title
        d0.childNodes.item(1).childNodes.item(3).innerHTML = arr[i].title;
        // update price
        d0.childNodes.item(1).childNodes.item(5).childNodes.item(1).childNodes.item(1).childNodes.item(1).innerHTML = arr[i].price+"€";
        // update founded
        d0.childNodes.item(1).childNodes.item(5).childNodes.item(3).childNodes.item(1).childNodes.item(1).innerHTML = arr[i].sale_current+"/"+arr[i].sale_minimum;
        j++;
        if(i==2){j=0;}
    }
}

function designOffsetRight(){
    design_offset++;
    getHomeDesigns();
    document.getElementById("design-control-left").disabled = false;
}

function designOffsetLeft(){
    if(design_offset>0) {
        design_offset--;
        getHomeDesigns();
        if(design_offset==0) {
            document.getElementById("design-control-left").disabled = true;
        }
    }
}



getLastChance();
getHomeDesigns();

document.getElementById("design-control-left").disabled = true; 
