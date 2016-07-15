var currentUser=0;
var pageUser;
var test;

if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(searchString, position) {
    position = position || 0;
    return this.indexOf(searchString, position) === position;
  };
}

$(document).ready(function () {
    var pageUser = window.location.search.split("=")[1];
    if (pageUser == "" || pageUser == undefined)
        window.location.replace("welcome.html");
    pageUser = pageUser.trim();
    getCurrentUser(function (currentUser) {
        currentUser = currentUser.trim();

        if (currentUser != "") {
            if (currentUser == pageUser) {
                $("#btnEditProfile").show();
                $("#btnFanToggle").hide();
                $("#frmPost").show();
            }
            else {
                $("#btnFanToggle").show();
                isFan(currentUser, pageUser, function (fanstatus) {
                    $("#btnFanToggle").html(fanstatus)
                })
            }
        } else {
            $("#btnLoginLogout").html("Log In");
        }

        getUsersPosts(pageUser, currentUser, function (postData) {
            var postList = JSON.parse(postData);
            $("#postcount").html(postList.length)
            populatePostList($("#lstBlogs"), postList, currentUser, "./uploads/");
        });
    });

    getProfileData(pageUser, function (profileData) {
        if (profileData == undefined) {
            window.location.replace("welcome.html")
        }
        // populateDiv($("#divProfile"), profileData);
        json2form($("#divProfile"), profileData, "./uploads/");
        var imgsrc = $("#divProfile").find("img").attr("src") + "?timestamp=" + profileData["timestamp"];
        $("#divProfile").find("img").attr("src", imgsrc);
        $("#divProfile").attr("style", "background-image: url('./uploads/" + profileData["bannerimage"] +
        "?timestamp=" + profileData["timestamp"] + "'); background-repeat: no-repeat");
        var tags = (profileData["genres"] + " " + profileData["interests"]).split(" ")
        for (i = 0; i < tags.length; i++) {
            var newDiv = $("#tmplTag").clone();
            newDiv.find("input").val(tags[i]);
            newDiv.find("label").html(tags[i]);
            $("#lstTags").append(newDiv);
            newDiv.show();
        }
        console.log(profileData);
    });

    getFans(pageUser, function (fanData) {
        var fanList = JSON.parse(fanData);
        $("#fancount").html(fanList.length);
        populateList($("#lstFans"), fanList, $("#tmplFan"), function (div, record) {
            div.find("a").attr("href", "?user=" + record["userid"]);
        }, "./uploads/");
    });

    getFavs(pageUser, function (fanData) {
        var favList = JSON.parse(fanData);
        $("#favcount").html(favList.length);
        populateList($("#lstFavs"), favList, $("#tmplFan"), function (div, record) {
            div.find("a").attr("href", "?user=" + record["userid"]);
        }, "./uploads/");
    });

    getPhotos(pageUser, function (photos) {
        var photoList = JSON.parse(photos);
        populateList($("#lstPhotos"), photoList, $("#tmplPhoto"), undefined, "./uploads/");
    });

    getVideos(pageUser, function (videos) {
        var videoList = JSON.parse(videos);
        populateList($("#lstVideos"), videoList, $("#tmplVideo"), undefined, "./uploads/");
    });

    getAudio(pageUser, function (tracks) {
        var audioList = JSON.parse(tracks);
        populateList($("#lstSongs"), audioList, $("#tmplAudio"), undefined, "./uploads/");
    });

    $(".fa-camera").click(function () {
        console.log("Take a picture");
        return false;
    });

});

function getSource(input) {
    var defaultimg = "./images/100x100.jpg";
    var src;
    switch(input.id) {
        case "image" :
            src = $("#preview-image").attr("src");
            if(src == defaultimg) src = "";
            break;
        case "video":
            src = $("#preview-video").find("source").attr("src");
            break;
        case "audio":
            src = $("#preview-audio").find("source").attr("src");
            break;
        default:
            src = "";
    }       
}

function uploadAttachments(form){
    return new Promise(function (resolve, reject) {
        attachments = form.find(".upload");
        var fields = {};
        var filecount = attachments.length;
        var semaphore = filecount;
        $("progress").attr("max", semaphore);
        for (i = 0; i < filecount; i++) {
            var input = attachments[i];
            fields[input.id] = getSource(input);
            uploadAttachment(input, function (res) {
                if (res.indexOf("Error:") != 0)
                    fields[res.split(":")[0]] = res.split(":")[1];                    
                semaphore--;
                $("progress").attr("value", filecount - semaphore);
                if (semaphore == 0)
                    resolve(fields);
            })
        }
    })
}

function updateCommentList(prefix, postid, newComment) {
    var post = $(prefix + postid);
    post.find("#lstComments").prepend(newComment);
    increment(post.find("#lblCommentCount"));
}

function setPostControls(newPost){
    newPost.find(".btnLikePost").click(function () {
        var post = findParent($(this), "tmplPost");
        var postid = post.find("#postid").val();
        toggleLikeRecord(currentUser, postid, function (likecount) {
            post.find("#likecount").html(likecount);
        });
        $(this).toggleClass("fa-heart-o");
        $(this).toggleClass("fa-heart");
        return false;
    });
    if(!(currentUser == newPost.find("#valUserID").val())){
        newPost.find(".btnSharePost").click(function () {
            var post = findParent($(this), "tmplPost");
            var postid = post.find("#postid").val();
            $("#valSharePostID").val(postid);
            $("#lblShareText").html(post.find("#lblText").html());
            $("#imgShareImage").attr("src", post.find("#imgPostImage").attr("src"));           
            if (!($("#imgShareImage").attr("src") == "./images/100x100.jpg"))
                $("#imgShareImage").show();
            $("#mdlShare").show();
            return false;
        });
    } else {
        var btnShare = newPost.find(".btnSharePost");
        btnShare.parent().attr("href", "");
        btnShare.click(function(){return false});        
    }
    newPost.find(".btnCommentPost").click(function () {
        var post = findParent($(this), "tmplPost");
        var postid = post.find("#postid").val();
        $("#valCommentPostID").val(postid);
        $("#mdlComment").show();
        return false;
    });    
    newPost.find(".btnDeletePost").click(function () {
        currentPost = findParent($(this), "#tmplPost");
        postid = currentPost.find(".postid").val;
        deletePost(postid, function () {
            deleteDiv(currentPost)
        })
        return false;
    })
}

function setLike(post){
    var likeIcon = post.find(".btnLike");
    likeIcon.removeClass("fa-heart-o");
    likeIcon.addClass("fa-heart");
}

function findParent(node, id){
    var parentFound = false;    
    while(node != null && ! parentFound) {
        if (node.attr("id") != undefined)
            parentFound = node.attr("id").startsWith(id);
        if(! parentFound)
            node = node.parent();
    }        
    return node
}

function likepost(){
    alert("Like this post");
    console.log($(this));
}

function sharepost(){
    alert("Share this post");
}

function replypost(){
    alert("Reply to this post");
}

function deletepost(){
    alert("Delete this post");
}


