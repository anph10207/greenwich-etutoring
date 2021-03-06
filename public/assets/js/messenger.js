$(document).ready(function () {
    const credentials = localStorage.getItem("credentials");
    var userInfo = JSON.parse(credentials);
    var stuId = null;
    var tutId = null;
    if (userInfo.avatarViewUrl != null) {
        document.getElementById("user_img").src = userInfo.avatarViewUrl;
    }
    document.getElementById("user_name").innerHTML = userInfo.firstName + " " + userInfo.lastName;  
    if (userInfo.role.id == 1) {
        if (userInfo.tutor == null) {
            var content = `<li> <a class="flip"> You have no tutor</a> </li>`;
            document.getElementById("chat_lst").innerHTML = content;
            return;
        }
        var content = `<li> <a href="#" class="flip"> <img src="${userInfo.tutor.avatarViewUrl}" alt=""> <span> ${userInfo.tutor.firstName}`
            + ` ${userInfo.tutor.lastName}</span></a> </li>`;
        document.getElementById("chat_lst").innerHTML = content;
        stuId = userInfo.id;
        tutId = userInfo.tutor.id;
        getMessage(tutId, stuId, 0, 100);
    } else {
        tutId = userInfo.id;
        getstudentoftutor(tutId);
    }
});

function getMessage(tutorId, studentId, start, limit) {
    var host_url = localStorage.getItem("host_url");
    setActiveChat("student" + studentId);
    axios({
        method: "GET",
        url: host_url + "/chat/filter",
        params: {
            studentId,
            tutorId,
            start,
            limit
        }
    })
        .then(function (res) {
            console.log(res.data);
            var getChatLst = res.data;
            var content = "";
            for (var i = 0; i < getChatLst.length; i++) {
                const mess = getChatLst[i];
                if (mess.sender.id == studentId) {
                    content +=  `<div class="container">
                                <img src="${mess.student.avatarViewUrl == null ? "../assets/img/faces/default-1.jpg" : mess.student.avatarViewUrl}" alt="Avatar">
                                <p>${mess.text}</p>
                                <span class="time-right">${formatDateNTime(mess.chatDate)}</span>
                                </div>`
                } else {
                    content += `<div class="container">
                                <img src="${mess.tutor.avatarViewUrl == null ? "../assets/img/faces/default-1.jpg" : mess.tutor.avatarViewUrl}" alt="Avatar" class="right">
                                <p>${mess.text}</p>
                                <span class="time-left">${formatDateNTime(mess.chatDate)}</span>
                                </div>`
                }
            }
            var btn_send = document.getElementById("btn_sendMess");
            btn_send_clone = btn_send.cloneNode(true);
            btn_send.parentNode.replaceChild(btn_send_clone, btn_send);
            document.getElementById("btn_sendMess").addEventListener('click', function() {
                sendMessage(tutorId, studentId);
            }, false);
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
            for (var i = 0; i < studentList.length; i++) {
                const student = studentList[i];
                var img = student.avatarViewUrl == null ? "../assets/img/faces/default-1.jpg" : student.avatarViewUrl;
                content += `<li id="student${student.id}"> <a href="#" class="flip" onclick="getMessage(${tutorId}, ${student.id}, 0, 100)"> 
                        <img src="${img}" alt=""> <span> ${student.firstName}`
                    + ` ${student.lastName}</span></a> </li>`;
            }
            document.getElementById("chat_lst").innerHTML = content;
        })
        .catch(function (error) {
            console.log(error);
        })
}

function sendMessage(tutorId, studentId) {
    const credentials = localStorage.getItem("credentials");
    var userInfo = JSON.parse(credentials);
    const senderId = userInfo.id;
    var host_url = localStorage.getItem("host_url");
    const text = document.getElementById("txtMess").value.trim();
    if (text == null || text == "") {
        alert("Please input message.");
        return;
    }
    axios({
        method: "POST",
        url: host_url + "/chat/",
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            studentId,
            tutorId,
            text,
            senderId
        }
    })
        .then(function (res) {
            console.log(res.data)
            document.getElementById("txtMess").value = "";
            getMessage(tutorId, studentId, 0, 100);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function setActiveChat(id) {
    var lis = document.getElementById("chat_lst").getElementsByTagName("li");
    for(var i = 0; i < lis.length; i++) {
        lis[i].className = "nav-item";
        if (lis[i].id == id){
            lis[i].className = "nav-item active";
        }
    }
}