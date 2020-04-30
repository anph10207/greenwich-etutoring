$(document).ready(function () {
    const credentials = localStorage.getItem("credentials");
    var userInfo = JSON.parse(credentials);
    var stuId = null;
    var tutId = null;
    if (userInfo.role.id == 1) {
        stuId = userInfo.id;
        tutId = userInfo.tutorId;

        axios({
            method: "GET",
            url: "http://34.87.179.204:9090/chat/filter",
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                studentId,
                tutorId,
                start = 0,
                limit = 10
            }
            })
            .then(function (res){
                console.log(res.data);
                var getChat = [];   
                getChat = res.data;
                createChat(getChat);
            })
            .catch(function (error){
            console.log(error);
            })
    }


}
    //const isInLoginPage = window.location.pathname === "login.html";
    // if (credentials) {
    //     if (isInLoginPage) {
    //         window.location.assign("index.html");
    //     }
    //     document.getElementById("txtTutor").innerHTML = (userInfo.tutor) ? userInfo.tutor.firstName + " " + userInfo.tutor.lastName : "Not Set";
    //     document.getElementById("txtEmailTutor").innerHTML = userInfo.tutor.email;
    //     document.getElementById("txtTutorId").innerHTML = userInfo.tutor.id;
    // }    
});

// function sendMessToTutor() {
//     const credentials = localStorage.getItem("credentials");
//     var userInfo = JSON.parse(credentials);
//     const tutorId = userInfo.tutor.tutorId;

//     const text = document.getElementById("txtText").value;

//     axios({
//         method: "POST",
//         url: "http://34.87.179.204:9090/chat",
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         data: {
//             studentId,
//             tutorId,
//             text,
//             senderId
//         }
//     })
//         .then(function (res) {
//             console.log(res.data)
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// }

