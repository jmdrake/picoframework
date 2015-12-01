// JavaScript File

/**
* Created with fanhubphp.
* User: jmdrake
* Date: 2015-11-19
* Time: 05:44 PM
* To change this template use Tools | Templates.
*/

$(document).ready(function() {
// executes when HTML-Document is loaded and DOM is ready
    getCurrentUser(function(user){
        if(user==undefined)
            window.location.replace("welcome.html");
        getProfileData(user, function(profileData){
            console.log(profileData);
            $("#name").val(profileData['name']);
            $("#dob").val(profileData['dob']);
            $("#userid").val(user);
        })
    })
    
    $(".upload").change(function(){
        readURL(this, "#preview-img");
    });
    
    $("#preview-img").click(function () {
        console.log("Preview Image");
        $('#imageupload').click()
    });
    
    $("#btnSubmit").click(function() {
        var fields = form2json($("#profile_form"));
        var fileext = $("#imageupload").prop('files')[0]["type"].split("/")[1];
        var filename = "user" + fields["userid"] + "pic." + fileext;
        fields["image"] = filename;
        updateProfile(fields, function(result){
            console.log(result);
        });
        uploadFile($("#imageupload"), filename);
    });
});

