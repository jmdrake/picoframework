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
    pageUser = window.location.search.split("=")[1];
    if (pageUser == "")
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
        getAllPosts(pageUser, currentUser, function (postData) {
            populatePostList($("#lstAllPosts"), JSON.parse(postData), currentUser);
        });

        getUsersPosts(pageUser, currentUser, function (postData) {
            var postList = JSON.parse(postData);
            $("#lblPostCount").html(postList.length)
            populatePostList($("#lstUsersPosts"), postList, currentUser);
        });
    });

    getProfileData(pageUser, function (profileData) {
        if (profileData == undefined) {
            window.location.replace("welcome.html")
        }
        // populateDiv($("#divProfile"), profileData);
        json2form($("#divProfile"), profileData, "./uploads/");
        $("#divProfile").attr("style", "background-image: url('./uploads/" + profileData["bannerimage"] + "'); background-repeat: no-repeat");
        console.log(profileData);
    });

    getFanList(pageUser, function (fanData) {
        var fanList = JSON.parse(fanData);
        $("#lblFanCount").html(fanList.length);
        populateList($("#lstFans"), fanList, $("#tmplFan"), undefined, "?user=");
    });

    getFanOfList(pageUser, function (fanData) {
        var fanOfList = JSON.parse(fanData);
        $("#lblFanOfCount").html(fanOfList.length);
        populateList($("#lstFanOf"), fanOfList, $("#tmplFanOf"), undefined, "?user=");
    });

    $("#btnSubmitPost").click(function () {
        fields = form2json($("#frmPost"));
        fields["user"] = currentUser;
        console.log(fields);
        putPost(fields, function (newRecord) {
            console.log("New record : " + JSON.stringify(newRecord));
            uploadImageFile($("#imgUpload"), "posts" + newRecord["valPostID"], function (filename) {
                if (!filename.startsWith("Error:")) {
                    newRecord["imgPostImage"] = filename;
                    updatePost(newRecord, function (res) { console.log(res) });
                }
                var newPost = cloneDiv($("#tmplPost"), newRecord);
                console.log(newPost);
                setPostControls(newPost);
                newPost.find("#share").hide();
                newPost.show();
                newPost.attr('id', "tmplPostlstAllPosts" + newRecord["valPostID"]);
                $("#lstAllPosts").prepend(newPost);
                console.log(newPost.find("#lblText").html());
                newPost2 = newPost.clone();
                newPost2.attr('id', "tmplPostlstUsersPosts" + newRecord["valPostID"]);
                $("#lstUsersPosts").prepend(newPost2);
            })
            clearForm($("#frmPost"))
        })
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

    $("#btnShowAllPosts").click(function () {
        $("#lstAllPosts").show();
        $("#lstUsersPosts").hide()
    });

    $("#btnShowUsersPosts").click(function () {
        $("#lstAllPosts").hide();
        $("#lstUsersPosts").show();
        return false;
    });

    $(".btnDeletePost").click(function () {
        currentPost = findParent(this, "#tmplPost");
        postid = currentPost.find(".postid").val;
        deletePost(postid, function () {
            deleteDiv(currentPost)
        })
        return false;
    });

    $(".upload").change(function () {
        readURL(this, "#preview-img");
        $("#preview-img").show();
    });

    $(".fa-image").click(function () {
        $('#imgUpload').click();
        return false;
    });

    $(".fa-camera").click(function () {
        console.log("Take a picture");
        return false;
    });

    $("#btnLoginLogout").click(function () {
        console.log($("#btnLoginLogout").html());
        if ($("#btnLoginLogout").html() == "Logout") {
            logout(function (res) {
                window.location.replace("./welcome.html");
            })
        } else {
            window.location.replace("./login.html");
        }
    });
});

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
        if (parseInt(newPost.find("#lblCommentCount").html()) > 0) {
            getComments(postid, function (comments) {
                populateList(newPost.find("#lstComments"), comments, $("#tmplComment"), function (newComment) { })
            })
        }
        if (newPost.find("#valPostShared").val() != "")
            newPost.find("#divShare").show();
    })
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


