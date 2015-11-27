/**
* Created with fanhubphp.
* User: jmdrake
* Date: 2015-11-22
* Time: 07:39 PM
* To change this template use Tools | Templates.
*/

$("#btnLogin").click(function(){         
    login(form2json($("#login_form")), function(userid){        
        clearForm($("#login_form"));
        if(results!="") {            
            window.location.replace("index.html?user=" + userid);            
        } else {
            alert("Invalid Username or Password");
        }
    });
});

