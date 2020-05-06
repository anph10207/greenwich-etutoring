function updateProfile() {
    const credentials = localStorage.getItem("credentials");
    var userInfo = JSON.parse(credentials);
    const email = userInfo.email;
    const firstName = document.getElementById("txtFirstName").value;
    const lastName = document.getElementById("txtLastName").value;
    const address = document.getElementById("txtAddress").value;
    const dob = document.getElementById("txtDOB").value;
    var host_url = localStorage.getItem("host_url");
    axios({
        method: "POST",
        url: host_url + "/user/updateInfo",
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            firstName,
            lastName,
            dob,
            address,
            email
        }
    })
        .then(function (res) {
            localStorage.setItem("credentials", JSON.stringify(res.data.data));
            localStorage.setItem("firstname", JSON.stringify(res.data.data.firstName));
            $('#confirmUpdate').modal('hide');
            console.log(res.data);
        })
        .catch(function (error) {
            alert("Updating fail.")
            console.log(error);
        });
}

$(document).ready(function () {
    const credentials = localStorage.getItem("credentials");
    var userInfo = JSON.parse(credentials);
    const isInLoginPage = window.location.pathname === "login.html";

    if (credentials) {
        if (isInLoginPage) {
            window.location.assign("index.html");
        }
        document.getElementById("txtTutor").value = (userInfo.tutor) ? userInfo.tutor.firstName + " " + userInfo.tutor.lastName : "Not Set";
        document.getElementById("txtFirstName").value = userInfo.firstName;
        document.getElementById("txtLastName").value = userInfo.lastName;
        document.getElementById("txtEmail").value = userInfo.email;
        document.getElementById("txtAddress").value = userInfo.address;
        document.getElementById("txtDOB").value = formatDate(new Date(Date.parse(userInfo.dob)));
        document.getElementById("txtFName").innerHTML = userInfo.firstName + " " + userInfo.lastName;
        if (userInfo.avatarViewUrl != null) {
            document.getElementById("avatar_img").src = userInfo.avatarViewUrl;
        }
        return;
    }
});

function changeAvatar() {
    $("input[id='avatar_input']").click();
}

function uploadAvatar() {
    const credentials = localStorage.getItem("credentials");
    var userInfo = JSON.parse(credentials);
    var userId = userInfo.id;
    var x = document.getElementById("avatar_input");
    if ('files' in x) {
        if (x.files.length != 0) {
            var file = x.files[0];
            var formData = new FormData();
            formData.append("file", file);
            var host_url = localStorage.getItem("host_url");
            axios({
                method: "PUT",
                url: host_url + "/user/" + userId + "/avatar",
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' }
            })
                .then(function (res) {
                    alert("Upload Successfully")
                    localStorage.setItem("credentials", JSON.stringify(res.data));
                    document.getElementById("avatar_img").src = res.data.avatarViewUrl;
                })
                .catch(function (error) {
                    alert("Upload fail.")
                    console.log(error);
                });
        }
    }
}

function changepassword() {
    const credentials = localStorage.getItem("credentials");
    var userInfo = JSON.parse(credentials);
    const email = userInfo.email;
    const password = document.getElementById("txtoldpassword").value;
    const newPassword = document.getElementById("txtnewpassword").value;
    var host_url = localStorage.getItem("host_url");
    axios({
        method: "POST",
        url: host_url + "/user/updatePassword",
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            email,
            password,
            newPassword
        }
    })
        .then(function (res) {
            alert("Change Password Successfully")
            $('#changePassword').modal('hide');
            console.log(res.data)
        })
        .catch(function (error) {
            alert("Wrong Password")
            console.log(error);

        });
}
