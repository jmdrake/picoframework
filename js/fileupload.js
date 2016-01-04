function readURL(input, previewimg) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $(previewimg).attr('src', e.target.result);
            console.log(e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function uploadFile(input, filename, callback) {
    var file_data = $(input).prop('files')[0];
    var form_data = new FormData();                  
    form_data.append('file', file_data);
    form_data.append('name', filename);
    $.ajax({
        url: './php/upload.php', // point to server-side PHP script 
        dataType: 'text',  // what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,                         
        type: 'post',
        success: function(php_script_response){
            callback(php_script_response); // display response from the PHP script, if any
        }
     });    
}

function uploadImageFile(input, filename, callback){
    if (input.prop('files').length > 0) { 
        var fileext = input.prop('files')[0]["type"].split("/")[1];
        if("PNGJPGJPEGGIF".indexOf(fileext.toUpperCase()) >= 0) {
            uploadFile(input, filename + "." + fileext, function (res) {
                if (res.startsWith("Successful:")) {
                    callback(filename + "." + fileext)
                } else {
                    callback(res);
                }
            })
        } else {
            callback("Error: Only png, jpg, jpeg and gif files allowed.")
        }
    } else {
        callback("Error: No file selected");
    }
}