function readURL(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $(input).next('img').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

function uploadFile(input) {
    var file_data = $(input).prop('files')[0];
    var form_data = new FormData();                  
    form_data.append('file', file_data);
    form_data.append('name', "images-" + newdoc["_id"]);    
    $.ajax({
        url: './php/upload.php', // point to server-side PHP script 
        dataType: 'text',  // what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,                         
        type: 'post',
        success: function(php_script_response){
            console.log(php_script_response); // display response from the PHP script, if any
        }
     });    
}

$(document).ready(function(){
    console.log("Ready");    
})
$(".upload").change(function(){
    readURL(this);
});

$("#preview-img").onclick = function () {
    console.log("Preview Image");
    $('#imageupload').click()
};

