$(document).ready(function() {
  const credentials = localStorage.getItem("credentials");
  const isInLoginPage = window.location.pathname.split("/").pop() === "login.html";
  const isIndexPage = window.location.pathname.split("/").pop() === "index.html";
  const isEmptyPage = window.location.pathname.split("/").pop() === "";  
  if (credentials && (isIndexPage || isInLoginPage || isEmptyPage)) {
    var role = JSON.parse(credentials).role == null? false : JSON.parse(credentials).role.id;
    switch (role) {
      case 1:
        window.location.assign("dashboard-student.html");
        checkDisplayMN(1);
        break;
      case 2:
        window.location.assign("dashboard-tutor.html");
        checkDisplayMN(2);
        break;
      case 3:
        window.location.assign("dashboard-staff.html");
        checkDisplayMN(3);
        break;
      case 4:
        window.location.assign("dashboard-admin.html");
        checkDisplayMN(4);
        break;
      default:
        localStorage.removeItem("credentials");
        window.location.assign("login.html");
        break;
    }
    return;
  }
  if(!credentials && !isInLoginPage)
  {
    window.location.assign("login.html");
  }
});

var host_url = null;
$.getJSON( "../../config.json", function( json ) {
    host_url = json.server_host;
});
