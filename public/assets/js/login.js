function login() {
    const email = document.getElementById("txtUsername").value;
    const password = document.getElementById("txtPassword").value;


    axios({
        method: "POST",
        url: "http://34.87.179.204:9090/user/login",
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
