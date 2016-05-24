/**
 * Created by Giovanni on 20/05/2016.
 */

// check user logged

$(document).ready(function () {
    if(checkUserLogged()) {
        var user_id = sessionStorage.cfUserId;
        updateNavbarUserLogged(sessionStorage.cfUserFirstname,sessionStorage.cfUserLastname);
    }
    if(localStorage.cfUserEmail !== undefined && localStorage.cfUserPassword !== undefined ) {
        document.getElementById('login-email-field').value = localStorage.cfUserEmail;
        document.getElementById('login-password-field').value = localStorage.cfUserPassword;
        document.getElementById('login-checkbox').checked = "checked";
    }
    else {
        document.getElementById('login-email-field').value = "";
        document.getElementById('login-email-field').placeholder = "email";
        document.getElementById('login-password-field').value = " ";
    }
});

// navbar login / logout
$(document).ready(function(){
    $("#nav-login-submit-button").click(function(){
        var userEmail = document.getElementById('login-email-field').value;
        var userPassw = document.getElementById('login-password-field').value;

        $.post(base_url+"index.php/users/login",
            {
                email: userEmail,
                password: userPassw

            },
            function(data,status){
                var json = JSON.parse(data);
                if(json.state==false) {
                    document.getElementById("login-error-label").style.display = "block";
                }
                else {
                    var user = json.rows[0];
                    sessionStorage.setItem("cfUserId",user.users_id);
                    sessionStorage.setItem("cfUserFirstname",user.firstname);
                    sessionStorage.setItem("cfUserLastname",user.lastname);

                    if(document.getElementById('login-checkbox').checked) {
                        localStorage.setItem("cfUserEmail", userEmail);
                        localStorage.setItem("cfUserPassword", userPassw);
                    }
                    else { localStorage.removeItem("cfUserEmail"); localStorage.removeItem("cfUserPassword");}

                    document.getElementById("login-error-label").style.display = "none";
                    $('#login-modal').modal('hide');
                    document.getElementById("login-nav-button").style.display = "none";
                    document.getElementById("logged-nav-button").style.display = "inline";

                    document.getElementById("nav-login-name").innerHTML = user.firstname;
                    document.getElementById("nav-drop-login-name").innerHTML = user.firstname + " " + user.lastname;


                }
            });
    });

    $("#nav-drop-logout-btn").click(function(){
        sessionStorage.removeItem("cfUserId");
        sessionStorage.removeItem("cfUserFirstname");
        sessionStorage.removeItem("cfUserLastname");
        document.getElementById("login-nav-button").style.display = "inline";
        document.getElementById("logged-nav-button").style.display = "none";
    });

    $("#nav-drop-edit-profile-btn").click(function(){
        window.location.href = base_url+"views/customer-account.html";
    });

    // login modal
    $("#login-modal").on('hidden.bs.modal', function () {
        document.getElementById("login-error-label").style.display = "none";
    });
});


function updateNavbarUserLogged(firstname, lastname) {
    document.getElementById("login-error-label").style.display = "none";
    $('#login-modal').modal('hide');
    document.getElementById("login-nav-button").style.display = "none";
    document.getElementById("sign-nav-button").style.display = "none";
    document.getElementById("logged-nav-button").style.display = "inline";

    document.getElementById("nav-login-name").innerHTML = firstname;
    document.getElementById("nav-drop-login-name").innerHTML = firstname + " " + lastname;
}


function nav_signup(){

}
    
function nav_search(){
    
}
    
function nav_favourite(){
    
}
    
function nav_basket(){
    
}