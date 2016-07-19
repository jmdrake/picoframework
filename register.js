/**
* Created with fanhubphp.
* User: jmdrake
* Date: 2015-11-22
* Time: 07:39 PM
* To change this template use Tools | Templates.
*/

$("#btnRegister").click(function(){         
    addUser(form2json($("#register_form")), function(results){
        console.log(results);
        if(results.indexOf("Duplicate")>=0) {
            alert("User record for " + $("#email").val() + " already exists");
        } else {
            login(form2json($("#register_form")), function(userid){
                window.location.replace("index.html?user=" + userid);
            })
        }        
    });
});

