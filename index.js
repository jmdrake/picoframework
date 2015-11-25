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
        if(data==undefined)
            window.location.replace("welcome.html");
        $(".name").html(data["name"]);
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

