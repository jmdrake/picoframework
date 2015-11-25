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
    currentuser = 1;
    console.log("Looking up profile for : " + userpage);
    getProfileData(userpage, function(data){
        $(".name").html(data["name"]);
    });
        
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

