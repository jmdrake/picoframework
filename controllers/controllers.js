/**
* Created with fanhubphp.
* User: jmdrake
* Date: 2015-11-22
* Time: 11:12 PM
* To change this template use Tools | Templates.
*/
$.ajaxSetup({ cache: false });

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
    $.get("./controllers/getProfileData.php?user=" + id, function(data){        
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

function getFans(user, callback){
    $.get("./controllers/getFans.php?user="+user, function(data){
        callback(data);
    })
}

function getPhotos(user, callback){
    $.get("./controllers/getPhotos.php?user="+user, function(data){
        callback(data);
    })
}

function getVideos(user, callback){
    $.get("./controllers/getVideos.php?user="+user, function(data){
        callback(data);
    })
}

function getAudio(user, callback){
    $.get("./controllers/getAudio.php?user="+user, function(data){
        callback(data);
    })
}

function getFavs(user, callback){
    $.get("./controllers/getFavs.php?user="+user, function(data){
        callback(data);
    })
}

function getUsersPosts(pageuser, currentuser, callback) {
    $.get("./controllers/getUsersPosts.php?pageuser="+pageuser+"&currentuser=" + currentuser, function(data){
        callback(data);
    })    
}

function getAllPosts(pageuser, currentuser, callback) {
    $.get("./controllers/getAllPosts.php?pageuser="+pageuser+"&currentuser=" + currentuser, function(data){
        callback(data);
    })    
}

function getLikes(post, callback) {
    $.get("./controllers/getLikes.php?post="+post, function(data){
        callback(JSON.parse(data)[0]["likescount"]);
    })    
}

function getShares(post, callback) {
    $.get("./controllers/getShares.php?post="+post, function(data){
        callback(JSON.parse(data)[0]["sharecount"]);
    })    
}

function getComments(post, callback) {
    $.get("./controllers/getComments.php?post="+post, function(data){
        callback(JSON.parse(data));
    })    
}

function putPost(data, callback){
    $.post("./controllers/putPost.php", data, function (results) {
        callback(JSON.parse(results)[0]);
    })
}

function putComment(data, callback){
    $.post("./controllers/putComment.php", data, function (results) {
        callback(JSON.parse(results)[0]);
    })
}

function putSharedPost(data, callback){
    $.post("./controllers/putSharedPost.php", data, function (results) {
        callback(results);
    })
}

function generateFileName(prefix, callback) {
    $.get("./controllers/generateFileName.php?prefix=" + prefix, function(filename){
        callback(filename)
    })
}

function likesPost(user, post, callback){
    $.get("./controllers/likesPost.php?postid=" + post + "&userid=" + user, function (data) {        
        callback(JSON.parse(data)[0]["likecount"])
    })    
}

function toggleLikeRecord(user, post, callback){
    $.post("./controllers/toggleLikeRecord.php", { "userid": user, "postid": post }, function (likecount) {              
        callback(likecount);
    })
}

function updatePost(record, callback){
    $.post("./controllers/updatePost.php", record, function (res) {
        callback(res);
    })
}

