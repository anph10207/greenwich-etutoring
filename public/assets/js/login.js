function login() {
    const email = document.getElementById("txtUsername").value;
    const password = document.getElementById("txtPassword").value;
    var host_url = localStorage.getItem("host_url");
    axios({
        method: "POST",
        url: host_url +"/user/login",
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            email,
            password
        }
    })
        .then(function (res) {
            localStorage.setItem("credentials", JSON.stringify(res.data.data));
            localStorage.setItem("firstname", JSON.stringify(res.data.data.firstName));
            localStorage.setItem("role", JSON.stringify(res.data.data.role.id));
            const role = res.data.data.role.id;
            switch (role) {
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
        })
        .catch(function (error) {
            alert("Nhập Sai Email Hoặc Mật Khẩu")
            console.log(error);
        });
}

$(document).ready(function() {
    const host_url = $.getJSON( "../../config.json", function( json ) {
        localStorage.setItem("host_url", json.server_host);
    });    
    var input = document.getElementById("txtPassword");
    input.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("smit").click();
        }
    });
});
