/**
* Created with fanhubphp.
* User: jmdrake
* Date: 2015-11-22
* Time: 07:39 PM
* To change this template use Tools | Templates.
*/

$("#btnRegister").click(function(){     
    console.log(form2json($("#register_form")));
    addUser(form2json($("#register_form")), function(results){
        console.log(results)
    });
});

