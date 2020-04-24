function updateProfile() {
    const credentials = localStorage.getItem("credentials");
    var userInfo = JSON.parse(credentials);
    const email = userInfo.email;
    const firstName = document.getElementById("txtFirstName").value;
    const lastName = document.getElementById("txtLastName").value;
    const address = document.getElementById("txtAddress").value;
    const dob = document.getElementById("txtDOB").value;
    

    axios({
        method: "POST",
        url: "http://34.87.179.204:9090/user/updateInfo",
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

$(document).ready(function() {
    const credentials = localStorage.getItem("credentials");
    var userInfo = JSON.parse(credentials);
    const isInLoginPage = window.location.pathname === "login.html";
  
    if (credentials) {
        if (isInLoginPage) {
            window.location.assign("index.html");
        }
        document.getElementById("txtTutor").value = (userInfo.tutor) ? userInfo.tutor.firstName + " " + userInfo.tutor.lastName : "Not Set" ;
        document.getElementById("txtFirstName").value = userInfo.firstName;
        document.getElementById("txtLastName").value = userInfo.lastName;
        document.getElementById("txtEmail").value = userInfo.email;
        document.getElementById("txtAddress").value = userInfo.address;
        document.getElementById("txtDOB").value = formatDate(new Date(Date.parse(userInfo.dob)));
        document.getElementById("txtFName").innerHTML = userInfo.firstName + " " + userInfo.lastName;
        return;
    }    
});

function changepassword() {
    const credentials = localStorage.getItem("credentials");
    var userInfo = JSON.parse(credentials);
    const email = userInfo.email;
    const password = document.getElementById("txtoldpassword").value;
    const newPassword = document.getElementById("txtnewpassword").value;

    axios({
        method: "POST",
        url: "http://34.87.179.204:9090/user/updatePassword",
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
