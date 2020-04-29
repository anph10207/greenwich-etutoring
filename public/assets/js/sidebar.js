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
    const role = localStorage.getItem("role");
    console.log(document.getElementById("adminmn").style);
    console.log(document.getElementById("adminmn").style.display);
    if (role == 1){
        document.getElementById("adminmn").remove();
        document.getElementById("staffmn").remove();
    } else if (role == 2){
        document.getElementById("adminmn").remove();
        document.getElementById("staffmn").remove();
    } else if (role == 3){
        document.getElementById("adminmn").remove();
        document.getElementById("chatmn").remove();
    } else if (role == 4){
        document.getElementById("staffmn").remove();
        document.getElementById("chatmn").remove();
    }
});