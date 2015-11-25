/**
* Created with fanhubphp.
* User: jmdrake
* Date: 2015-11-22
* Time: 11:12 PM
* To change this template use Tools | Templates.
*/

function addUser(data, callback){    
    $.post("./controllers/adduser.php", data, function(results){
        callback(results);
    })
}

function addFan(jsondata, callback){
    $.post("./controllers/addfan.php", jsondata, function(results){
        callback(results);
    })
}


function getProfileData(id, callback){    
    $.get("./controllers/getprofiledata.php?user=" + id, function(data){        
        callback(JSON.parse(data)[0])
    })
}

function isFan(fan, fanof, callback){    
    $.get("./controllers/isfan.php?fan=" + fan + "&fanof=" + fanof, function(data){                      
        if(JSON.parse(data).length==0) {
            callback("Fan");            
        } else {            
            callback("Unfan");   
        } 
        console.log(data);
    });
}

function login(data, callback){    
    $.post("./controllers/login.php", data, function(results){
        callback(results);
    })
}

function getCurrentUser(callback){
    $.get("./controllers/getcurrentuser.php", function(data){
        callback(data);
    })
}