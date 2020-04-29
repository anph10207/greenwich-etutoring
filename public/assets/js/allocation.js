function getalltutor() {
    var tutorList = [];
    axios({
        method: "GET",
        url: host_url + "/user/filter",
        headers: {
            'Content-Type': 'application/json'
        },
        params: {
            roleId: 2,
            tutorFlag: false
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
    var content = '<option value="-1">Please Choose Tutor</option>';
    for (var i = 0; i < list.length; i++) {
        const tutor = list[i];
        content += `     
      <option value="${tutor.id}">${tutor.firstName + " " + tutor.lastName}</option>`;
    }
    document.getElementById("tutorListContent").innerHTML = content;
}

function getstudentoftutor() {
    var droptutor = document.getElementById("tutorListContent");
    var tutorId = droptutor.options[droptutor.selectedIndex].value
    var studentList = [];

    axios({
        method: "GET",
        url: host_url + "/user/getStudents",
        headers: {
            'Content-Type': 'application/json'
        },
        params: {
            tutorId,
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
        <tr id="student${student.id}">
        <td>${student.id}</td>
        <td>${student.firstName + " " + student.lastName}</td>
        <td>${student.email}</td>
        <td>
            <button onclick="switchStudent(this, ${student.id})" class="btn btn-danger btn-fill btn-sm" id="${student.id}">Remove</button>
        </td>
        </tr>
        `
    }
    document.getElementById("studentListContent").innerHTML = content;
}

function getAllStudentNoTutor() {
    var studentListNoTutor = [];

    axios({
        method: "GET",
        url: host_url + "/user/filter",
        headers: {
            'Content-Type': 'application/json'
        },
        params: {
            roleId: 1,
            tutorFlag: false
        }
    })
        .then(function (res) {
            studentListNoTutor = res.data;
            createStudentListNoTutor(studentListNoTutor);
        })
        .catch(function (error) {
            console.log(error)
        })
}

function createStudentListNoTutor(list) {
    var content = "";
    for (var i = 0; i < list.length; i++) {
        const student = list[i];
        content += `
        <tr id="student${student.id}">
        <td>${student.id}</td>
        <td>${student.firstName + " " + student.lastName}</td>
        <td>${student.email}</td>
        <td>
            <button onclick="switchStudent(this, ${student.id})" class="btn btn-warning btn-fill btn-sm" id="${student.id}">Assign</button>
        </td>
        </tr>
        `
    }
    document.getElementById("studentListContentNoTutor").innerHTML = content;
}

function switchStudent(obj, id) {
    var record = document.getElementById("student" + id);
    var tbl = document.getElementById("student" + id).parentElement;
    if (tbl.id == 'studentListContentNoTutor')
    {
        document.getElementById('studentListContent').appendChild(record);
        obj.textContent = 'Remove';
        obj.className = "btn btn-danger btn-fill btn-sm";
    }
    if (tbl.id == 'studentListContent')
    {
        document.getElementById('studentListContentNoTutor').appendChild(record);
        obj.textContent = 'Assign';
        obj.className = "btn btn-warning btn-fill btn-sm";
    }
}

function update() {
    var lst = "";
    var ck = 0;
    var rows = document.getElementById("studentListContent").getElementsByTagName("tr");
    for(var i = 0; i < rows.length; i++) {
        lst += rows[i].cells[0].innerHTML + ",";
        ck = 1;
    }
    if (ck == 1){
        lst = lst.substring(0, lst.length - 1);
    }
    var droptutor = document.getElementById("tutorListContent");
    var tutorId = droptutor.options[droptutor.selectedIndex].value
    var studentIds = lst.split(',');
    axios({
        method: "PUT",
        url: host_url + "/user/assignStudents",
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            studentIds,
            tutorId
        }
    })
        .then(function (res) {
            console.log(res.data);
            lst = "";
        var rows2 = document.getElementById("studentListContentNoTutor").getElementsByTagName("tr");
        for(var i = 0; i < rows2.length; i++) {
            lst += rows2[i].cells[0].innerHTML + ",";
            ck = 1;
        }
        if (ck == 1){
            lst = lst.substring(0, lst.length - 1);
        }
        studentIds = lst.split(',');
        tutorId = -1;
        axios({
            method: "PUT",
            url: host_url + "/user/assignStudents",
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                studentIds,
                tutorId
            }
        })
            .then(function (res) {
                console.log(res.data);
                window.location.reload(true);
            })
            .catch(function (error) {
                console.log(error);
            })
        })
        .catch(function (error) {
            console.log(error);
        })
        
}

$(document).ready(function() {
    getAllStudentNoTutor();
    getalltutor();
});