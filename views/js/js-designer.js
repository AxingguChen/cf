/**
 * Created by giovanni on 17/07/16.
 */
var url_designer = base_url+"index.php/users/view_designer/"+"2";

var designer_id;
var designer_data;

function getDesigner(){

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json_array = JSON.parse(xmlhttp.responseText);
            designer_data = json_array.rows[0];
            updateDesignerInfo(designer_data);
            getRelatedProducts(designer_data);
        }
    };
    xmlhttp.open("GET", url_designer, true);
    xmlhttp.send();
}

function updateDesignerInfo(data) {
    document.getElementById("highlight-img").src = base_url+"avatar/"+data.users_id+img_format;
    document.getElementById("designer-name").innerHTML = data.firstname + " " + data.lastname;
    document.getElementById("designer-place").innerHTML = data.city + ", " + data.country;
    var link = "http://" + data.website;
    document.getElementById("designer-website").innerHTML = "<a target='_blank' href="+link+">" +data.website+"</a>";
    document.getElementById("designer-description").innerHTML = data.about;


    document.getElementById("dir-designer-name").innerHTML = data.firstname + " " + data.lastname;



    var name = self.location.search;

}

function getRelatedProducts(data) {
    var url_related = base_url+"index.php/projects/view_projects_by_user/"+data.users_id;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json_array = JSON.parse(xmlhttp.responseText);
            var related_data = json_array.rows;

            if(related_data.length==0) {
                document.getElementById("no-related-proj").style.display = "inline";
                return;
            }

            document.getElementById("no-related-proj").style.display = "none";
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

$('.row .btn').on('click', function(e) {
    e.preventDefault();
    var $this = $(this);
    var $collapse = $this.closest('.collapse-group').find('.collapse');
    $collapse.collapse('toggle');
});

var str = self.location.search;
var id = str.replace("?", "");
url_designer = base_url+"index.php/users/view_designer/"+id;

getDesigner();


