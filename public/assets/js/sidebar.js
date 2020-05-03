function setDashboard() {
    const role = localStorage.getItem("role");
    const roleFromLocal = JSON.parse(role);

    switch (roleFromLocal) {
        case 1:
            window.location.assign("dashboard-student.html?mn=dashmn");
            break;
        case 2:
            window.location.assign("dashboard-tutor.html?mn=dashmn");
            break;
        case 3:
            window.location.assign("dashboard-staff.html?mn=dashmn");
            break;
        case 4:
            window.location.assign("dashboard-admin.html?mn=dashmn");
            break;
    }
}

$(document).ready(function() {
    const role = localStorage.getItem("role");
    if (role == 1){
        document.getElementById("adminmn").remove();
        document.getElementById("staffmn").remove();
    } else if (role == 2){
        document.getElementById("adminmn").remove();
        document.getElementById("staffmn").remove();
    } else if (role == 3){
        document.getElementById("adminmn").remove();
        document.getElementById("chatmn").remove();
        document.getElementById("documentmn").remove();
        document.getElementById("blogmn").remove();
    } else if (role == 4){
        document.getElementById("staffmn").remove();
        document.getElementById("chatmn").remove();
        document.getElementById("documentmn").remove();
        document.getElementById("blogmn").remove();
    }
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const mnId = urlParams.get('mn')
    setActive(mnId);
});

function setActive(mnId) {
    if (document.getElementById("staffmn") != null && document.getElementById("staffmn") != undefined)
        document.getElementById("staffmn").className = "";
    if (document.getElementById("chatmn") != null && document.getElementById("chatmn") != undefined)
        document.getElementById("chatmn").className = "";
    if (document.getElementById("profilemn") != null && document.getElementById("profilemn") != undefined)
        document.getElementById("profilemn").className = "";
    if (document.getElementById("dashmn") != null && document.getElementById("dashmn") != undefined)
        document.getElementById("dashmn").className = "";
    if (document.getElementById("adminmn") != null && document.getElementById("adminmn") != undefined)
        document.getElementById("adminmn").className = "";
    if (document.getElementById("documentmn") != null && document.getElementById("documentmn") != undefined)
        document.getElementById("documentmn").className = "";
    if (document.getElementById("blogmn") != null && document.getElementById("blogmn") != undefined)
        document.getElementById("blogmn").className = "";

    if (document.getElementById(mnId) != null)
        document.getElementById(mnId).className = "nav-item active";
    else
        document.getElementById("dashmn").className = "nav-item active";
}