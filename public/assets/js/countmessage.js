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

// function getId() {
//     var user_id = document.getElementById("student").value;
//     console.log(user_id)
// }


function countAll() {
    const tutor_id = document.getElementById("tutorListContent").value;
    console.log(tutor_id)
    const no_day = document.getElementById("getDays").value;
    console.log(no_day)
    var body = document.getElementById("studentListContent");
    var lst = body.getElementsByTagName("tr");
    for(var i = 0; i < lst.length; i++){
        console.log(lst[i].cells[0].innerHTML);
        countElement(lst[i].cells[0].innerHTML,tutor_id,no_day)
    }
    
}

function countElement(user_id,tutor_id, no_day){
    var host_url = localStorage.getItem("host_url");
    axios({
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
            document.getElementById("studentId" + user_id).innerHTML = res.data;
            console.log(res.data)
        })
        .catch(function (error) {
            console.log(error);
        })
}

$(document).ready(function() {
    getalltutor();
});