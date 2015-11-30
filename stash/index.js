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

    getFanOfList(userpage, function(fanlist){
        $(".fanofcount").html(JSON.parse(fanlist).length)
    });    
    
    getFanList(userpage, function(fanlist){
        $(".fancount").html(JSON.parse(fanlist).length)
    });
    
    getPosts(userpage, function(postQuery){
        var postlist = JSON.parse(postQuery);
        var newPost;
        for(var i = 0; i < postlist.length; i++){
            newPost = $("#post_template").clone();
            newPost.find("#text").html(results[i]["text"]);
            newPost.find("#image").attr("src", results[i]["image"]);
            $("#timeline").append(newPost);
            getLikeCount(results[i]["id"], function(likeQuery){
                var likes = JSON.parse(likeQuery)[0]["count"];
                newPost.find("#likecount").html(likes)
            });
            getCommentCount(results[i]["id"], function(commentQuery){
                var comments = JSON.parse(commentQuery)[0]["count"];
                newPost.find("#likecount").html(comments)
            });
            getShareCount(results[i]["id"], function(shareQuery){
                var shares = JSON.parse(shareQuery)[0]["shares"];
                newPost.find("#sharecount").html(shares)
            });
        }
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
    
    $("#btnPost").click(function(){
        var formdata = form2json($("#postform"));
        formdata["user"] = currentuser;
        formdata["shared"] = "";
        formdata["image"] = "";
        putPost(formdata, function(results){
            console.log(results);
        })
    })
});

