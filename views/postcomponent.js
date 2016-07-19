$("#postcomponent").load("./views/postcomponent.html", function(){
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
            inputs = inputs2json($("#frmPost"));
            fields["text"] = encodeURIComponent(inputs["text"]);
            fields["user"] = currentUser;
            fields["tags"] = inputs["tags"].join(" ");
            console.log(fields);
            console.log(JSON.stringify(fields));
            putPost(fields, function (newRecord) {
                var newPost = cloneDiv($("#tmplPost"), newRecord, "./uploads/");
                console.log(newPost);
                newPost.find("#share").hide();
                newPost.show();
                newPost.attr('id', "tmplPost" + newRecord["postid"]);
                $("#lstBlogs").prepend(newPost);
                clearForm($("#frmPost"));
            })
        });
    });

    $("#btnSubmitComment").click(function () {
        var fields = form2json($("#mdlComment"));
        fields["user"] = currentUser;
        putComment(fields, function (newCommentData) {
            var newComment = cloneDiv($("#tmplComment"), newCommentData);
            newComment.show();
            newComment.attr("id", "#tmplComment" + newCommentData["valCommentID"]);
            $("#tmplPost" + newCommentData["valCommentPostID"]).find("#lstComments").append(newComment);
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
});

var rxurl = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:\/~\+#]*[\w\-\@?^=%&amp;\/~\+#])?/g;

function populatePostList(list, data, currentUser){
    populateList(list, data, $("#tmplPost"), function (newPost, record) {
        var postid = record["postid"];
        newPost.attr("id", "tmplPost" + postid);
        var blogtext = decodeURIComponent(record["text"]);
        newPost.find("#text").html(blogtext.replace(rxurl, function foo(x) { return '<a href="' + x + '">Link</a>' }));
        if (record["liked"] == "1") {
            newPost.find(".btnLikePost").addClass("fa-heart");
            newPost.find(".btnLikePost").removeClass("fa-heart-o");
        }
        
        getComments(postid, function (comments) {
            populateList(newPost.find("#comments"), comments, $("#tmplComment"));
            console.log(comments);
        });
    }, "./uploads/")
}

if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(searchString, position) {
    position = position || 0;
    return this.indexOf(searchString, position) === position;
  };
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

function btnSharePost() {
    console.log("post shared");
}

function btnDeletePost(element) {
    console.log("post deleted");
    var currentPost = findParent($(element), "tmplPost");
    var postid = currentPost.find("#postid").val();
    deletePost(postid, function (res) {
        console.log(res);
        currentPost.hide();
    })
    return false;
}

function btnEditPost(element) {
    var currentPost = findParent($(element), "tmplPost");
    var postid = currentPost.find("#postid").val();
    getPost(postid, function (editRecord) {
        console.log(JSON.stringify(editRecord));
        json2form($("#mdlEditBox"), editRecord, "./uploads/");

        $("#mdlEditBox").show();
    })
}

function btnLikePost() {
    console.log("post liked");
}

function btnCommentPost(element) {
    console.log("post commented");
    var currentPost = findParent($(element), "tmplPost");
    $("#mdlComment").find("#postid").val(currentPost.find("#postid").val());    
    $("#mdlComment").show();
    return false;
}

function btnSubmitComment() {
    $("#mdlComment").hide();
    putComment(inputs2json($("#mdlComment")), function (newCommentRecord) {
        var newCommentDiv = cloneDiv($("#tmplComment"), newCommentRecord, "./uploads/");
        console.log(newCommentDiv);
        newCommentDiv.show();
        newCommentDiv.attr("id", "tmplComment" + newCommentRecord["commentid"]);
        $("#tmplPost" + newCommentRecord["postid"]).find("#comments").append(newCommentDiv);
    })
}
