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

function getProfileData(id, callback){    
    $.get("./controllers/getprofiledata.php?user=" + id, function(data){
        console.log(data);
        callback(JSON.parse(data)[0])
    })
}

function isFan(user1, user2, callback){    
    $.get("./controllers/isfan.php?user1=" + user1 + "&user2=" + user2, function(data){
        callback(data);
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