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
        if(data==undefined)
            window.location.replace("welcome.html");
        getProfileData(user, function(profileData){
            
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
        
    });
});

