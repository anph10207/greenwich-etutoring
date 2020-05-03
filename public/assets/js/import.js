document.querySelector("html").classList.add('js');

var fileInput  = document.querySelector( ".input-file" ),  
    button     = document.querySelector( ".input-file-trigger" ),
    the_return = document.querySelector(".file-return");
      
button.addEventListener( "keydown", function( event ) {  
    if ( event.keyCode == 13 || event.keyCode == 32 ) {  
        fileInput.focus();  
    }  
});
button.addEventListener( "click", function( event ) {
   fileInput.focus();
   return false;
});  
fileInput.addEventListener( "change", function( event ) {  
    the_return.innerHTML = this.value;  
}); 

function importExcel() {
    var formdata = new FormData();
    formdata.append('file', file);
    var host_url = localStorage.getItem("host_url");
    var x = document.getElementById("file");
    if ('files' in x) {
        if (x.files.length != 0) {
            var file = x.files[0];
            var formData = new FormData();
            formData.append("file", file);
            var host_url = localStorage.getItem("host_url");
            axios({
                method: "POST",
                url: host_url + "/user/import/",
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' }
            })
                .then(function (res) {
                    alert("Upload Successfully")
                })
                .catch(function (error) {
                    alert("Upload fail.")
                    console.log(error);
                });
        }
    }
}