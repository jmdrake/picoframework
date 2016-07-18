/**
* Created with fanhubphp.
* User: jmdrake
* Date: 2015-11-22
* Time: 11:12 PM
* To change this template use Tools | Templates.
*/
$.ajaxSetup({ cache: false });

function addUser(data, callback){    
	 var session = localStorage.getItem("session");
	 data["session"] = session; 
    $.post("./controllers/adduser.php", data, function(results){
        callback(results);
    })
}

function addFan(data, callback){
	 var session = localStorage.getItem("session");
	 data["session"] = session;
    $.post("./controllers/addfan.php", data, function(results){
        callback(results);
    })
}

function deleteFan(jsondata, callback){
	 var session = localStorage.getItem("session");
	 data["session"] = session;
    $.post("./controllers/deletefan.php", jsondata, function(results){
        callback(results);
    })
}

function deletePost(postid, callback){
	 var session = localStorage.getItem("session");	 	
    $.post("./controllers/deletepost.php", {"postid" : postid, "session" : session}, function(results){
        callback(results);
    })
}

function getProfileData(id, callback){    
    $.get("./controllers/getProfileData.php?user=" + id, function(data){        
        callback(JSON.parse(data)[0])
    })
}

function updateProfile(jsondata, callback){    
	 var session = localStorage.getItem("session");
	 jsondata["session"] = session;
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
    	callback(results.trim());
    })
}

function logout(callback) {
	 localStorage.setItem("session", "");
	 session = "";
    $.get("./controllers/logout.php", function (results) {
        callback(results);
    })
}

function getCurrentUser(callback){
	 var session = localStorage.getItem("session");	 
    $.get("./controllers/getCurrentUser.php?session=" + session, function(data){
        callback(data.trim());
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

function getSampleVideos(callback){
    $.get("./controllers/getSampleVideos.php", function(data){
        callback(data);
    })
}

function getSampleAudio(callback){
    $.get("./controllers/getSampleAudio.php", function(data){
        callback(data);
    })
}

function getSamplePhotos(callback){
    $.get("./controllers/getSamplePhotos.php", function(data){
        callback(data);
    })
}

function getNews(tag, callback){
    $.get("./controllers/getNews.php?tag=" + encodeURIComponent(tag), function (data) {
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

function getAllPosts(pageuser, callback) {
	 var session = localStorage.getItem("session");	 	
    $.get("./controllers/getAllPosts.php?pageuser="+pageuser+"&session=" + session, function(data){
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
	 var session = localStorage.getItem("session");
	 data["session"] = session;	
    $.post("./controllers/putPost.php", data, function (results) {
        callback(JSON.parse(results)[0]);
    })
}

/*
Function : putComment
Input: data - JSON doc of form {text : "text", postid : "postid"}
Output: results - JSON doc of form {text: "text", postid: "postid", commentid: "commentid", image: "imageurl", username: "username"}
*/
function putComment(data, callback){
	 var session = localStorage.getItem("session");
	 data["session"] = session;	
    $.post("./controllers/putComment.php", data, function (results) {
        callback(JSON.parse(results)[0]);
    })
}

function putSharedPost(data, callback){
	 var session = localStorage.getItem("session");
	 data["session"] = session;	
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
	 var session = localStorage.getItem("session");	 	
    $.post("./controllers/toggleLikeRecord.php", {"userid": user, "postid": post, "session" : session }, function (likecount) {              
        callback(likecount);
    })
}

function updatePost(record, callback){
	 var session = localStorage.getItem("session");
	 record["session"] = session;
    $.post("./controllers/updatePost.php", record, function (res) {
        callback(JSON.parse(res)[0]);
    })
}

function getPost(record, callback){
    $.get("./controllers/getPost.php?postid=" + record, function (res) {
        callback(JSON.parse(res)[0]);
    })
}

function sendResetRequest(data, callback){
    console.log(data);  
    $.post("./controllers/passwordreset/sendResetRequest.php", data, function (results) {
        callback(results);
    })
}

function verifyResetToken(token, callback) {
    $.get("./controllers/passwordreset/verifyResetToken.php?token=" + token, function (data) {
        results = JSON.parse(data);
        if (results.length > 0)
            callback("Ok");
        else
            callback("Empty")        
    })
}

function resetPassword(data, callback) {
    $.post("./controllers/passwordreset/resetPassword.php", data, function(results){        
        callback(results)
    })
}

function search(searchstr, callback) {
    $.get("./controllers/search.php?searchstr=" + encodeURIComponent(searchstr), function (data) {
        results = JSON.parse(data);
        callback(results);
    })
}
