//Get ID Student Staff Tutor
function getId(id) {
    user_id = id;
}
//Create User
function createUser() {
    const firstName = document.getElementById("txtFirstName").value;
    const lastName = document.getElementById("txtLastName").value;
    const dob = formatDate(document.getElementById("txtDob").value);
    const email = document.getElementById("txtEmail").value;
    const password = document.getElementById("txtPassword").value;
    const address = document.getElementById("txtAddress").value;
    var dropRole = document.getElementById("positionRole");
    const role = dropRole.options[dropRole.selectedIndex].value;
    var dropGender = document.getElementById("positionGender");
    const gender = dropGender.options[dropGender.selectedIndex].value;

    axios({
        method: "POST",
        url: host_url + "/user/",
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            firstName,
            lastName,
            dob,
            email,
            password,
            role,
            address,
            gender
        }
    })
        .then(function (res) {
            alert("Create User Successfully")
            $('#modalCreateUser').modal('hide');
        })
        .catch(function (error) {
            alert("Create User Fail")
            console.log(error);
        })
}

//Change Pass
function changePass() {
    var password = document.getElementById("txtnewpassword").value;
    const credentials = localStorage.getItem("credentials");
    var userInfo = JSON.parse(credentials);
    const admin_id = userInfo.id;

    axios({
        method: "PUT",
        url: host_url + "/user/admin/changePassword",
        headers: {
            'Content-Type': 'application/json'
        },
        params: {
            admin_id,
            user_id,
            password
        }
    })
        .then(function (res) {
            alert("Change Password Successfully")
            $('#modalChangePass').modal('hide');
        })
        .catch(function (error) {
            alert("Change Password Fail")
            console.log(error);
        })
}

//Change Role
function changeRole() {
    const credentials = localStorage.getItem("credentials");
    var userInfo = JSON.parse(credentials);
    const admin_id = userInfo.id;
    var dropId = document.getElementById("position");
    const role_id = dropId.options[dropId.selectedIndex].value;

    axios({
        method: "PUT",
        url: host_url + "/user/" + user_id + "/changeRole",
        headers: {
            'Content-Type': 'application/json'
        },
        params: {
            admin_id,
            role_id
        }
    })
        .then(function (res) {
            alert("Change Role Successfully")
            $('#changeRole').modal('hide');
            window.location.reload()
        })
        .catch(function (error) {
            alert("Change Role Fail")
            console.log(error);
        })
}

//DELETE
function deleteUser() {
    const credentials = localStorage.getItem("credentials");
    var userInfo = JSON.parse(credentials);
    const admin_id = userInfo.id;

    axios({
        method: "GET",
        url: host_url + "/user/delete",
        headers: {
            'Content-Type': 'application/json'
        },
        params: {
            user_id,
            admin_id
        }
    })
        .then(function (res) {
            alert("Delete Successfully")
            $('#modalDel').modal('hide');
            window.location.reload()
        })
        .catch(function (error) {
            alert("Change Role Fail")
            console.log(error);
        })
}

//Get List Tutor
function getAllTutor() {
    var tutorList = [];

    axios({
        method: "GET",
        url: host_url + "/user/filter",
        headers: {
            'Content-Type': 'application/json'
        },
        params: {
            roleId: 2,
            tutorFlag: false,
            start: 0,
            limit: 10
        }
    })
        .then(function (res) {
            tutorList = res.data;
            createTuTorList(tutorList);
        })
        .catch(function (error) {
            console.log(error);
        })
}

function createTuTorList(list) {
    var content = "";
    for (var i = 0; i < list.length; i++) {
        const tutor = list[i];
        content += ` 
        <tr>
            <td>${tutor.id}</td>
            <td>${tutor.firstName + " " + tutor.lastName}</td>
            <td>${formatDate(tutor.dob)}</td>
            <td>${tutor.gender}</td>
            <td>${tutor.address}</td>
            <td>${tutor.email}</td>
            <td>
                <button onclick="getId(${tutor.id})" type="button" class="btn btn-info btn-fill btn-sm" data-toggle="modal" data-target="#modalRole">Change Role</button>
            </td>
            <td>
                <button onclick="getId(${tutor.id})" type="button" class="btn btn-secondary btn-fill btn-sm" data-toggle="modal" data-target="#modalChangePass">Change Password</button>
            </td>
            <td>
                <button onclick="getId(${tutor.id})" type="button" class="btn btn-danger btn-fill btn-sm" data-toggle="modal" data-target="#modalDelUser">Delete</button>
            </td>
        </tr>           
        `;
    }
    document.getElementById("tutorListContent").innerHTML = content;
}

//Get List Student
function getAllStudent() {
    var studentList = []

    axios({
        method: "GET",
        url: host_url + "/user/getAllStudents",
        headers: {
            'Content-Type': 'application/json'
        },
        params: {
            start: 0,
            limit: 10
        }
    })
        .then(function (res) {
            studentList = res.data;
            createStudentList(studentList);
        })
        .catch(function (error) {
            console.log(error);
        })
}

function createStudentList(list) {
    var content = "";
    for (var i = 0; i < list.length; i++) {
        const student = list[i];
        content += ` 
        <tr>
        <td>${student.id}</td>
        <td>${student.firstName + " " + student.lastName}</td>
        <td>${formatDate(student.dob)}</td>
        <td>${student.gender}</td>
        <td>${student.address}</td>
        <td>${student.email}</td>
        <td>
                <button onclick="getId(${student.id})" type="button" class="btn btn-info btn-fill btn-sm" data-toggle="modal" data-target="#modalRole">Change Role</button>
        </td>
        <td>
                <button onclick="getId(${student.id})" type="button" class="btn btn-secondary btn-fill btn-sm" data-toggle="modal" data-target="#modalChangePass">Change Password</button>
        </td>
        <td>
                <button onclick="getId(${student.id})" type="button" class="btn btn-danger btn-fill btn-sm" data-toggle="modal" data-target="#modalDelUser">Delete</button>
        </td>
    </tr>           
    `;
    }
    document.getElementById("studentListContent").innerHTML = content;
}

//Get List Staff
function getAllStaff() {
    var staffList = []

    axios({
        method: "GET",
        url: host_url + "/user/filter",
        headers: {
            'Content-Type': 'application/json'
        },
        params: {
            roleId: 3,
            tutorFlag: false,
            start: 0,
            limit: 10
        }
    })
        .then(function (res) {
            staffList = res.data;
            createStaffList(staffList);
        })
        .catch(function (error) {
            console.log(error);
        })
}

function createStaffList(list) {
    var content = "";
    for (var i = 0; i < list.length; i++) {
        var staff = list[i];
        content += ` 
        <tr>
        <td>${staff.id}</td>
        <td>${staff.firstName + " " + staff.lastName}</td>
        <td>${formatDate(staff.dob)}</td>
        <td>${staff.gender}</td>
        <td>${staff.address}</td>
        <td>${staff.email}</td>
        <td>
            <button onclick="getId(${staff.id})" type="button" class="btn btn-info btn-fill btn-sm" data-toggle="modal" data-target="#modalRole">Change Role</button>
        </td>
        <td>
            <button onclick="getId(${staff.id})" type="button" class="btn btn-secondary btn-fill btn-sm" data-toggle="modal" data-target="#modalChangePass">Change Password</button>
        </td>
        <td>
            <button onclick="getId(${staff.id})" type="button" class="btn btn-danger btn-fill btn-sm" data-toggle="modal" data-target="#modalDelUser">Delete</button>
        </td>
    </tr>           
    `;
    }
    document.getElementById("staffListContent").innerHTML = content;
}


$(document).ready(function () {
    getAllStaff();
    getAllTutor();
    getAllStudent();
});
