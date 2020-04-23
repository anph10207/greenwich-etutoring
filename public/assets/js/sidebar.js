function setDashboard() {
    const role = localStorage.getItem("role");
    const roleFromLocal = JSON.parse(role);

    switch (roleFromLocal) {
        case 1:
            console.log(123)
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
    console.log(role == 1)
}