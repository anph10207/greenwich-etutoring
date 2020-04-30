function getAllTutor() {
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
        <tr>
            <td>${tutor.id}</td>
            <td>${tutor.firstName}</td>
            <td>${tutor.lastName}</td>
            <td>${tutor.gender}</td>
            <td>` + formatDate(tutor.dob) + `</td>
            <td>${tutor.email}</td>
            <td>${tutor.address}</td>
        </tr>           
        `;
    }
    document.getElementById("tutorListContent").innerHTML = content;
}
getAllTutor();