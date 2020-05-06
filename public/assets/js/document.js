$(document).ready(function () {
    const credentials = localStorage.getItem("credentials");
    var userInfo = JSON.parse(credentials);
    var stuId = null;
    var tutId = null;
    if (userInfo.role.id == 1) {
        if (userInfo.tutor == null) {
            var content = `<ul class="list-inline"><li> <a class="flip"> You have no tutor</a> </li></ul>`;
            document.getElementById("doc-lst").innerHTML = content;
            return;
        }        
        document.getElementById("student_lst").display = "none";
        stuId = userInfo.id;
        tutId = userInfo.tutor.id;
        getDocument(stuId, tutId, 0, 20);
    } else {
        tutId = userInfo.id;
        getstudentoftutor(tutId);
    }
});

function uploadFile() {
    const credentials = localStorage.getItem("credentials");
    var userInfo = JSON.parse(credentials);
    var studentId = null;
    var tutorId = null;
    var senderId = null;
    if (userInfo.role.id == 1){
        studentId = userInfo.id;
        tutorId = userInfo.tutor.id;
        senderId = userInfo.id;
    } else if (userInfo.role.id == 2){
        studentId = document.getElementById("student-btn").value;
        tutorId = userInfo.id;
        senderId = userInfo.id;
    }
    var x = document.getElementById("uploadedFile");
    if ('files' in x) {
        if (x.files.length != 0) {
            var file = x.files[0];
            var formData = new FormData();
            formData.append("file", file);
            formData.append("tutorId", tutorId);
            formData.append("studentId", studentId);
            formData.append("senderId", senderId);
            var host_url = localStorage.getItem("host_url");
            axios({
                method: "POST",
                url: host_url + "/document/upload",
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' }
            })
                .then(function (res) {
                    alert("Upload Successfully");
                    getDocument(studentId, tutorId, 0, 20);
                })
                .catch(function (error) {
                    alert("Upload fail.")
                    console.log(error);
                });
        }
    }
}

function getDocument(studentId, tutorId, start, limit) {
    var host_url = localStorage.getItem("host_url");
    console.log(tutorId + " " + studentId + " " + start + " " + limit);
    axios({
        method: "GET",
        url: host_url + "/document/filter",
        params: {
            studentId,
            tutorId,
            start,
            limit
        }
    })
        .then(function (res) {
            console.log(res.data);
            var getDocLst = res.data;
            var content = "";
            var chk = 0;
            for (var i = 0; i < getDocLst.length; i++) {
                const doc = getDocLst[i];
                content += `<li id="doc${doc.id}"><strong>${doc.sender.firstName}</strong> <a href="${doc.fileDownloadUri}" class="flip"> 
                        <span> ${doc.name}</span></a> <br><button class="btn btn-warning btn-fill" onclick="getComment(${doc.id}, 0, 20)">Comment</button> </li>`;
                chk = 1
            }
            if (chk == 1){
                content = `<div class="doc-list" id="doc-section"><ul class="list-inline" id="doc_lst">` + content + `</ul> </div>`;
                document.getElementById("doc-lst").innerHTML = content;
            }            
        })
        .catch(function (error) {
            console.log(error);
        })
}

function getComment(documentId, start, limit) {
    document.getElementById("comment-section").style.display = "";
    document.getElementById("btn-sendMess").value = documentId;
    var host_url = localStorage.getItem("host_url");
    axios({
        method: "GET",
        url: host_url + "/document/comment/filter",
        params: {
            documentId,
            start,
            limit
        }
    })
        .then(function (res) {
            console.log(res.data);
            var getDocLst = res.data;
            var content = "";
            var chk = 0;
            for (var i = 0; i < getDocLst.length; i++) {
                const doc = getDocLst[i];
                if (doc.user.role.id == 1) {
                    content +=  `<div class="container">
                                <img src="${doc.user.avatarViewUrl == null ? "../assets/img/faces/default-1.jpg" : doc.user.avatarViewUrl}" alt="Avatar">
                                <p>${doc.text}</p>
                                <span class="time-right">${formatDateNTime(doc.dateComment)}</span>
                                </div>`
                } else if (doc.user.role.id == 2){
                    content += `<div class="container">
                                <img src="${doc.user.avatarViewUrl == null ? "../assets/img/faces/default-1.jpg" : doc.user.avatarViewUrl}" alt="Avatar" class="right">
                                <p>${doc.text}</p>
                                <span class="time-left">${formatDateNTime(doc.dateComment)}</span>
                                </div>`
                }
            }
            content = `<div class="doc-list"><ul class="list-inline" id="doc_lst">` + content + `</ul> </div>`;
            document.getElementById("mess_section").innerHTML = content;
        })
        .catch(function (error) {
            console.log(error);
        })
}

function getstudentoftutor(tutorId, start = 0, limit = 20) {
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
            var content = "";
            var chk = 0;
            for (var i = 0; i < studentList.length; i++) {
                const student = studentList[i];
                content += `<a class="noselect" onclick="getDocumentByStudent('${student.id}', '${student.firstName} ${student.lastName}')" href="#">${student.id} - ${student.firstName} ${student.lastName}</a>`
                chk = 1;
            }
            if (chk == 1){
                content = `<div class="dropdown">
                            <button class="btn btn-default dropbtn" type="button" id="student-btn">Please choose student</button>
                            <div class="dropdown-content">`
                        +  content + `</div></div>`;
                document.getElementById("student_lst").innerHTML = content;
            }            
        })
        .catch(function (error) {
            console.log(error);
        })
}

function getDocumentByStudent(studentId, text) {
    document.getElementById("student-btn").innerHTML = text;
    document.getElementById("student-btn").value = studentId;
    const credentials = localStorage.getItem("credentials");
    var userInfo = JSON.parse(credentials);
    var tutorId = userInfo.id;
    getDocument(studentId, tutorId, 0, 20);    
}

function sendComment() {
    const credentials = localStorage.getItem("credentials");
    var userInfo = JSON.parse(credentials);
    const userId = userInfo.id;
    const documentId = document.getElementById("btn-sendMess").value;
    var host_url = localStorage.getItem("host_url");
    const text = document.getElementById("txtMess").value;
    if (text == null || text == "") {
        alert("Please input message.");
        return;
    }
    axios({
        method: "POST",
        url: host_url + "/document/comment/",
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            userId,
            documentId,
            text
        }
    })
        .then(function (res) {
            console.log(res.data);
            getComment(documentId, 0, 20);
            document.getElementById("txtMess").value = "";
        })
        .catch(function (error) {
            console.log(error);
        });
}