$("#postcomponent").load("./views/postcomponent.html");

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
        alert("Fubar");
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
