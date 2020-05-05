function getalltutor() {
    var tutorList = [];
    var host_url = localStorage.getItem("host_url");
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
    var content = '<option value="-1">Please Choose Tutor</option>';
    for (var i = 0; i < list.length; i++) {
        const tutor = list[i];
        content += `     
      <option value="${tutor.id}">${tutor.firstName + " " + tutor.lastName}</option>`;
    }
    document.getElementById("tutorListContent").innerHTML = content;
}

function getstudentoftutor(start = 0, limit = 100) {
    var droptutor = document.getElementById("tutorListContent");
    var tutorId = droptutor.options[droptutor.selectedIndex].value
    var studentList = [];
    var host_url = localStorage.getItem("host_url");
    axios({
        method: "GET",
        url: host_url + "/user/getStudents",
        headers: {
            'Content-Type': 'application/json'
        },
        params: {
            tutorId,
            start,
            limit
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
            <td id="studentId${student.id}"></td>
        </tr>
        `
    }
    document.getElementById("studentListContent").innerHTML = content;
}

function countAll() {
    const tutor_id = document.getElementById("tutorListContent").value;
    const no_day = document.getElementById("getDays").value;
    var body = document.getElementById("studentListContent");
    var lst = body.getElementsByTagName("tr");
    for(var i = 0; i < lst.length; i++){
        countElement(lst[i].cells[0].innerHTML,tutor_id,no_day, "studentId" + lst[i].cells[0].innerHTML);
    }
    
}

function countForStudent() {
    const credentials = localStorage.getItem("credentials");
    var userInfo = JSON.parse(credentials);
    const tutor_id = userInfo.tutor.id;    
    const no_day = document.getElementById("getDays").value;
    var body = document.getElementById("messageNo");
    countElement(userInfo.id,tutor_id,no_day, "messageNo");    
}

function countForTutor() {
    const credentials = localStorage.getItem("credentials");
    var userInfo = JSON.parse(credentials);
    const tutor_id = userInfo.id;    
    const no_day = document.getElementById("getDays").value;
    var body = document.getElementById("studentListContent");
    var lst = body.getElementsByTagName("tr");
    for(var i = 0; i < lst.length; i++){
        countElement(lst[i].cells[0].innerHTML,tutor_id,no_day, "studentId" + lst[i].cells[0].innerHTML);
    }
    
}

async function countElement(user_id,tutor_id, no_day,element_id){
    var host_url = localStorage.getItem("host_url");
    let data = axios({
        method: "GET",
        url: host_url + "/chat/number",
        headers: {
            'Content-Type': 'application/json'
        },
        params: {
            user_id,
            tutor_id,
            no_day
        }
    })
        .then(function (res) {
            document.getElementById(element_id).innerHTML = res.data;
            console.log(res.data)
        })
        .catch(function (error) {
            console.log(error);
        })
    return data;
}

$(document).ready(function() {
    const credentials = localStorage.getItem("credentials");
    var userInfo = JSON.parse(credentials);
    var tutorId = userInfo.id;
    if (userInfo.role.id == 3){
        getalltutor();
    } else if (userInfo.role.id == 2){
        var host_url = localStorage.getItem("host_url");
        var tutorId = userInfo.id;
        var start = 0;
        var limit = 20;
        axios({
            method: "GET",
            url: host_url + "/user/getStudents",
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                tutorId,
                start,
                limit
            }
        })
            .then(function (res) {
                studentList = res.data;
                console.log(studentList)
                createStudentList(studentList);
            })
            .catch(function (error) {
                console.log(error);
            })
    }    
});