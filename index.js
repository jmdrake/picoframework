/**
* Created with fanhubphp.
* User: jmdrake
* Date: 2015-11-19
* Time: 05:44 PM
* To change this template use Tools | Templates.
*/

$(document).ready(function() {
    // executes when HTML-Document is loaded and DOM is ready
    userpage = window.location.search.split("=")[1];
    if(userpage=="")
        window.location.replace("welcome.html");
    
    getProfileData(userpage, function(data){
        $(".name").html(data["name"]);
        if(data=[])
            window.location.replace("welcome.html");
        console.log("User data : " + data + "|");
    });

    getCurrentUser(function(currentuser){
        if(currentuser==userpage)
            $("#fantoggle").hide();
        isFan(userpage, currentuser, function(data){        
            if(data.indexOf("true") >= 0) {            
                console.log("UnFan");
                $("#fantoggle").html("Unfan");            
            } else {
                console.log("Fan");
                $("#fantoggle").html("Fan");            
            }
        });           
    });        
});

