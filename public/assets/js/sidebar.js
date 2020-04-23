function setDashboard() {
    const role = localStorage.getItem("role");
    const roleFromLocal = JSON.parse(role);

    switch (roleFromLocal) {
        case 1:
            window.location.assign("dashboard-student.html");
            break;
        case 2:
            window.location.assign("dashboard-tutor.html");
            break;
        case 3:
            window.location.assign("dashboard-staff.html");
            break;
        case 4:
            window.location.assign("dashboard-admin.html");
            break;
    }
}

$(document).ready(function() {
    // var path = window.location.pathname;
    // var page = path.split("/").pop();
    // console.log(page);
    // // Get all link element
    // var container = document.getElementsByClassName("nav");
    // var lis = container[0].getElementsByTagName("li");
    
    // // Loop through the links and add the active class to the current/clicked link
    // for (var i = 0; i < lis.length; i++) {
    //     var tag = lis[i].getElementsByTagName("p");
    //     if(tag[0].innerHTML === page)
    //     {
    //         lis[i].className = 'nav-item active';
    //     }
    // }
});