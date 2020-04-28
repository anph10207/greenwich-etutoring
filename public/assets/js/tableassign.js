function getalltutor() {
    var tutorList = [];

    axios({
        method: "GET",
        url: "//34.87.179.204:9090/user/filter",
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
    var content = "";
    for (var i = 0; i < list.length; i++) {
        const tutor = list[i];
        content += ` 
    <option value="-1">Please Choose Tutor</option>
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
        url: "http://34.87.179.204:9090/user/getStudents",
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
        <tr>
        <td>${student.id}</td>
        <td>${student.firstName + " " + student.lastName}</td>
        <td>${student.email}</td>
        <td>
            <button class="btn btn-primary btn-fill" id="">REMOVE</button>
        </td>
        <tr>
        `
    }
    document.getElementById("studentListContent").innerHTML = content;
}

function getAllStudentNoTutor() {
    var studentListNoTutor = [];

    axios({
        method: "GET",
        url: "http://34.87.179.204:9090/user/filter",
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
        <tr>
        <td>${student.id}</td>
        <td>${student.firstName + " " + student.lastName}</td>
        <td>${student.email}</td>
        <td>
            <button class="btn btn-danger btn-fill" id="">REMOVE</button>
        </td>
        <tr>
        `
    }
    document.getElementById("studentListContentNoTutor").innerHTML = content;
}

getAllStudentNoTutor();
getalltutor();