/**
* Created with fanhubphp.
* User: jmdrake
* Date: 2015-11-19
* Time: 05:44 PM
* To change this template use Tools | Templates.
*/

$(document).ready(function() {
    // executes when HTML-Document is loaded and DOM is ready
    var userpage = window.location.search.split("=")[1];
    var currentuser;
    if(userpage=="")
        window.location.replace("welcome.html");
    
    getProfileData(userpage, function(data){
        if(data==undefined)
            window.location.replace("welcome.html");
        $(".name").html(data["name"]);
    });

    getCurrentUser(function(data){
        currentuser = data;
        if((currentuser!==userpage)&&(currentuser!=""))
            $("#fantoggle").show();
        isFan(currentuser, userpage,  function(data){        
            $("#fantoggle").html(data);
        });           
    });  
    
    $("#fantoggle").click(function(){
        if($("#fantoggle").html()=="Fan")
            addFan({"fan":currentuser, "fanof":userpage}, function(data){
                console.log(data);
                $("#fantoggle").html("Unfan");
            })
        else            
            deleteFan({"fan":currentuser, "fanof":userpage}, function(data){
                console.log(data);
                $("#fantoggle").html("Fan");
            })
    })
});

