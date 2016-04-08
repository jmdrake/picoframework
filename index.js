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
    getCurrentUser(function (user) {
        currentUser = user;

        if (currentUser != "") {
            if (currentUser == pageUser) {
                $("#btnEditProfile").show();                
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

    $(".upload").change(function () {
        var previewdiv = "#preview-" + this.id;
        readURL(this, previewdiv);
        $(previewdiv).show();
    });

    $(".fileselect").click(function () {
        $(this).parent().find("input").click();
        return false;
    });

    $("#btnSubmitPost").click(function () {
        uploadAttachments($("#frmPost")).then(function (fields) {
            fields["text"] = $("#frmPost").find("#text").val();
            fields["user"] = currentUser;
            console.log(fields);
            console.log(JSON.stringify(fields));
            putPost(fields, function (newRecord) {
                var newPost = cloneDiv($("#tmplPost"), newRecord, "./uploads/");
                console.log(newPost);
                setPostControls(newPost);
                newPost.find("#share").hide();
                newPost.show();
                newPost.attr('id', "tmplPostlstAllPosts" + newRecord["valPostID"]);
                $("#lstAllPosts").prepend(newPost);
            })
        });
    });

    $("#btnSubmitComment").click(function () {
        var fields = form2json($("#mdlComment"));
        fields["user"] = currentUser;
        putComment(fields, function (newCommentData) {
            var newComment = cloneDiv($("#tmplComment"), newCommentData);
            newComment.show();
            newComment.attr("id", "#tmplPostlstAllPostsComment" + newCommentData["valCommentID"]);
            $("#tmplPostlstAllPosts" + newCommentData["valCommentPostID"]).find("#lstComments").append(newComment);
            newComment2 = newComment.clone();
            newComment.attr("id", "#tmplPostlstUserPostsComment" + newCommentData["valCommentID"]);
            $("#tmplPostlstUsersPosts" + newCommentData["valCommentPostID"]).find("#lstComments").append(newComment2);
            clearForm($("#mdlComment"));
            $("#mdlComment").hide();
            increment($("#tmplPostlstAllPosts" + newCommentData["valCommentPostID"]).find("#lblCommentCount"));
            increment($("#tmplPostlstUsersPosts" + newCommentData["valCommentPostID"]).find("#lblCommentCount"));
        })
    });

    $("#btnSubmitShare").click(function () {
        var fields = form2json($("#mdlShare"));
        var postid = fields["post_shared"];
        fields["user"] = currentUser;
        console.log(fields);
        putSharedPost(fields, function (res) {
            clearForm($("#mdlShare"));
            increment($("#post" + postid).find(".lblShareCount"));
            $("#mdlShare").hide()
        })
    });


    $(".btnDeletePost").click(function () {
        currentPost = findParent(this, "#tmplPost");
        postid = currentPost.find(".postid").val;
        deletePost(postid, function () {
            deleteDiv(currentPost)
        })
        return false;
    });

    $(".fa-camera").click(function () {
        console.log("Take a picture");
        return false;
    });

    $("#btnFanToggle").click(function () {
        if ($("#btnFanToggle").html() == "Fan")
            addFan({ "fan": currentUser, "fanof": pageUser }, function (data) {
                console.log(data);
                $("#btnFanToggle").html("Unfan");
            })
        else
            deleteFan({ "fan": currentUser, "fanof": pageUser }, function (data) {
                console.log(data);
                $("#btnFanToggle").html("Fan");
            })
    })
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

function populatePostList(list, data, currentUser){
    populateList(list, data, $("#tmplPost"), function (newPost) {
        var postid = newPost.find("#valPostID").val();
        newPost.attr("id", "tmplPost" + list.attr("id") + postid);
        if (newPost.find("#valLiked").val() == "1") {
            newPost.find(".btnLikePost").addClass("fa-heart");
            newPost.find(".btnLikePost").removeClass("fa-heart-o");
        }
        setPostControls(newPost);
    }, "./uploads/")
}

function setPostControls(newPost){
    newPost.find(".btnLikePost").click(function () {
        var post = findParent($(this), "tmplPost");
        var postid = post.find("#valPostID").val();
        toggleLikeRecord(currentUser, postid, function (likecount) {
            post.find("#lblLikeCount").html(likecount);
        });
        $(this).toggleClass("fa-heart-o");
        $(this).toggleClass("fa-heart");
        return false;
    });
    if(!(currentUser == newPost.find("#valUserID").val())){
        newPost.find(".btnSharePost").click(function () {
            var post = findParent($(this), "tmplPost");
            var postid = post.find("#valPostID").val();
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
        var postid = post.find("#valPostID").val();
        $("#valCommentPostID").val(postid);
        $("#mdlComment").show();
        return false;
    });    
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


