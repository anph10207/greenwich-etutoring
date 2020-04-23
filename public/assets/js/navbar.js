function logout() {
    localStorage.clear();
    window.location.assign("login.html");
}

$(document).ready(function() {
    var firstname = localStorage.getItem("firstname");
    firstname = JSON.parse(firstname);
    document.getElementById("txtfirstname").innerHTML = firstname;
});

