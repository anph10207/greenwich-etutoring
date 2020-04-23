function logout() {
    localStorage.clear();
    window.location.assign("login.html");
}

$(document).ready(function() {
    // var path = window.location.pathname;
    // var page = path.split("/").pop();
    // document.getElementById("txtPageName").innerHTML = page;

    var firstname = localStorage.getItem("firstname");
    firstname = JSON.parse(firstname);
    document.getElementById("txtfirstname").innerHTML = firstname;
});

