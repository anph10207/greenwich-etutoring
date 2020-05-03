function createBlog() {
    const credentials = localStorage.getItem("credentials");
    var userInfo = JSON.parse(credentials);
    const userId = userInfo.id;
    const name = document.getElementById("txtTitleName").value;
    const body = document.getElementById("txtBody").value;
    var host_url = localStorage.getItem("host_url");
  
    axios({
        method: "POST",
        url: host_url + "/blog/",
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
           userId,
           name,
           body
        }
    })
        .then(function (res) {
            alert("Create Blog Successfully")
            $('#modalCreateBlog').modal('hide');
            window.location.reload()
        })
        .catch(function (error) {
            alert("Create Blog Fail")
            console.log(error);
        });
}

function getBlog() {
    const credentials = localStorage.getItem("credentials");
    var userInfo = JSON.parse(credentials);
    const userId = userInfo.id;
    var blogList = [];
    var host_url = localStorage.getItem("host_url");
  
    axios({
        method: "GET",
        url: host_url + "/blog/filter",
        headers: {
            'Content-Type': 'application/json'
        },
        params: {
           userId
        }
    })
        .then(function (res) {
            blogList = res.data;
            createBlogList(blogList);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function createBlogList(list) {
    var content = "";
    for (var i = 0; i < list.length; i++) {
        const blog = list[i];
        content += `
        <div class="w3-col l12">
            <div class="w3-card-4 w3-margin w3-white">
            <img src="./assets/img/woods.jpg" alt="Nature" style="width:100%">
                <div class="w3-container">
                    <h3><b>${blog.name}</b></h3>
                    <h5>${blog.name}, <span class="w3-opacity">April 7, 2014</span></h5>
                </div>
                <div class="w3-container">
                    <p>${blog.body}</p>
                    <button onclick="getIdBlog(${blog.id})" type="button" class="btn btn-info btn-fill pull-right" data-toggle="modal" data-target="#modalUpdateBlog" >Update Post</button>
                </div>
            </div>
            <hr>
        </div>
        `;
    }
    document.getElementById("getDataBlog").innerHTML = content;
}

function getIdBlog(id) {
    blogId = id;
    console.log(blogId)
}

function updateBlog() {
    const credentials = localStorage.getItem("credentials");
    var userInfo = JSON.parse(credentials);
    const userId = userInfo.id;
    const body = document.getElementById("txtFixBody").value;
    var host_url = localStorage.getItem("host_url");
  
    axios({
        method: "PUT",
        url: host_url + "/blog/" + blogId + "/update",
        headers: {
            'Content-Type': 'application/json'
        },
        params: {
           userId,
           body
        }
    })
        .then(function (res) {
            alert("Update Blog Successfully")
            $('#modalCreateBlog').modal('hide');
            window.location.reload()
        })
        .catch(function (error) {
            alert("Update Blog Fail")
            console.log(error);
        });
}

$(document).ready(function() {
    var firstname = localStorage.getItem("firstname");
    firstname = JSON.parse(firstname);
    document.getElementById("txtFullName").innerHTML = firstname;
    getBlog();
});

