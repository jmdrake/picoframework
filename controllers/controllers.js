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

function deleteFan(jsondata, callback){
    $.post("./controllers/deletefan.php", jsondata, function(results){
        callback(results);
    })
}

function getProfileData(id, callback){    
    $.get("./controllers/getprofiledata.php?user=" + id, function(data){        
        callback(JSON.parse(data)[0])
    })
}

function updateProfile(jsondata, callback){    
    $.post("./controllers/updateprofile.php", jsondata, function(data){        
        callback(data)
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
    $.post("./controllers/login.php", data, function (results) {        
        callback(results);
    })
}

function logout(callback) {
    $.get("./controllers/logout.php", function (results) {
        callback(results);
    })
}

function getCurrentUser(callback){
    $.get("./controllers/getcurrentuser.php", function(data){
        callback(data);
    })
}

function getFanList(user, callback){
    $.get("./controllers/getfanlist.php?user="+user, function(data){
        callback(data);
    })
}

function getFanOfList(user, callback){
    $.get("./controllers/getfanoflist.php?user="+user, function(data){
        callback(data);
    })
}

function getUsersPosts(user, callback) {
    $.get("./controllers/getUsersPosts.php?user="+user, function(data){
        callback(data);
    })    
}

function getUsersTimeline(user, callback) {
    $.get("./controllers/getUsersTimeline.php?user="+user, function(data){
        callback(data);
    })    
}

function getLikes(post, callback) {
    $.get("./controllers/getLikes.php?post="+post, function(data){
        callback(data);
    })    
}

function putPost(data, callback){
    $.post("./controllers/putPost.php", data, function (results) {
        callback(results);
    })
}

function putPostWithImage(data, callback){
    $.post("./controllers/putPostWithImage.php", data, function (results) {
        callback(results);
    })
}

function generateFileName(prefix, callback) {
    $.get("./controllers/generateFileName.php?prefix=" + prefix, function(filename){
        callback(filename)
    })
}
