$("#postcomponent").load("./views/postcomponent.html", function(){
    $(".upload").change(function () {
        var previewdiv = "#preview_" + this.id;
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
            fields["text"] = inputs["text"];            
            fields["tags"] = inputs["tags"].join(" ");
            console.log(fields);
            console.log(JSON.stringify(fields));
            putPost(fields, function (newRecord) {
            	newRecord["text"] = newRecord["text"].replace(/<script>/, "&lt;script>").replace(/<\/script>/, "&lt;/script>")
					newRecord["text"] = newRecord["text"].replace(rxurl, function foo(x) { return '<a href="' + x + '">Link</a>' });      
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
            newCommentData["text"] = newCommentData["text"].replace(/<script>/, "&lt;script>").replace(/<\/script>/, "&lt;/script>")
				newCommentData["text"] = newCommentData["text"].replace(rxurl, function foo(x) { return '<a href="' + x + '">Link</a>' });      
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
        var postid = fields["postid"];        
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


var rxurl = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:\/~\+#]*[\w\-\@?^=%&amp;\/~\+#])?/g;

function populatePostList(list, data, currentUser){
    populateList(list, data, $("#tmplPost"), function (newPost, record) {
        var postid = record["postid"];
        newPost.attr("id", "tmplPost" + postid);
        var blogtext = unescape(record["text"]);
        blogtext = blogtext.replace(/<script>/, "&lt;script>").replace(/<\/script>/, "&lt;/script>");
        newPost.find("#text").html(blogtext.replace(rxurl, function foo(x) { return '<a href="' + x + '">Link</a>' }));
        if (record["liked"] == "1") {
            newPost.find("#btnLikePost").find("i").addClass("fa-heart");
            newPost.find("#btnLikePost").find("i").removeClass("fa-heart-o");
        }
        if(record["shared_text"] != "") {
				var sharedtext = unescape(record["shared_text"]).replace(/<script>/, "&lt;script>").replace(/<\/script>/, "&lt;/script>");	        		
        		newPost.find("#shared_text").html(sharedtext.replace(rxurl, function foo(x) { return '<a href="' + x + '">Link</a>' }));
        }
        if(record["shared_image"]!="") newPost.find("#shared_image").show();
        if(record["shared_audio"]!="") newPost.find("#shared_audio").show();
        if(record["shared_video"]!="") newPost.find("#shared_video").show();
        if(record["userid"] == currentUser) {
        		newPost.find("#btnSharePost").hide();
        } else {
				newPost.find("#btnEditPost").hide();
				newPost.find("#btnDeletePost").hide();        
        }
        newPost.show();
        list.append(newPost);
        getComments(postid, function (comments) {
            populateList(newPost.find("#comments"), comments, $("#tmplComment"), function(commentDiv, commentRecord){
            	commentRecord["text"] = unescape(commentRecord["text"]);
        			commentRecord["text"] = commentRecord["text"].replace(/<script>/, "&lt;script>").replace(/<\/script>/, "&lt;/script>");
        			commentRecord["text"] = commentRecord["text"].replace(rxurl, function foo(x) { return '<a href="' + x + '">Link</a>' });
       			commentDiv.find("#text").html(commentRecord["text"]);
       			commentDiv.show();
       			newPost.find("#comments").append(commentDiv);										            	
            }, "./uploads/");            
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

function btnSharePost(element) {
	var post = findParent($(element), "tmplPost");
   var postid = post.find("#postid").val();
   $("#post_shared").val(postid);
   $("#posttext").html(post.find("#text").html());
   $("#postimage").attr("src", post.find("#image").attr("src"));           
   if (!($("#postimage").attr("src") == "./images/100x100.jpg"))
       $("#postimage").show();
   $("#mdlShare").show();
   return false;
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
		categories = editRecord["tags"].split(" ");
		checkboxes = $("#mdlEditBox").find("input");
		for(i=0; i < checkboxes.length; i++) {
			if(categories.find(function(x){return "tag_" + x == checkboxes[i].id}))
				checkboxes[i].checked = true;
		}
		json2form($("#mdlEditBox"), editRecord, "./uploads/");
	
		$("#mdlEditBox").show();
	})
}

function btnLikePost(element) {	
	var currentPost = findParent($(element), "tmplPost");
	var postid = currentPost.find("#postid").val();        
	toggleLikeRecord(postid, function(likecount){
		currentPost.find("#likecount").html(likecount);
		if(currentPost.find(".fa-heart-o"))
			currentPost.find(".fa-heart-o").attr("class", "fa fa-heart");
		else
			currentPost.find(".fa-heart").attr("class", "fa fa-heart-o");
	})
}

function btnCommentPost(element) {
    console.log("post commented");
    var currentPost = findParent($(element), "tmplPost");
    $("#mdlComment").find("#postid").val(currentPost.find("#postid").val());    
    $("#mdlComment").show();
    return false;
}

function btnSubmitComment() {	
	putComment(inputs2json($("#mdlComment")), function (newCommentRecord) {
		newCommentRecord["text"] = unescape(newCommentRecord["text"]);
		newCommentRecord["text"] = newCommentRecord["text"].replace(/<script>/, "&lt;script>").replace(/<\/script>/, "&lt;/script>");
		newCommentRecord["text"] = newCommentRecord["text"].replace(rxurl, function foo(x) { return '<a href="' + x + '">Link</a>' });            	

		var newCommentDiv = cloneDiv($("#tmplComment"), newCommentRecord, "./uploads/");
		console.log(newCommentDiv);
		newCommentDiv.show();
		newCommentDiv.attr("id", "tmplComment" + newCommentRecord["commentid"]);
		$("#tmplPost" + newCommentRecord["postid"]).find("#comments").append(newCommentDiv);
		$("#mdlComment").hide();
		clearForm($("#mdlComment"));
	})
}

function getUploadFile(data, preview) {
	if(data != undefined) return data;
	if(preview != undefined) return preview.split(/\.\/uploads\//)[1];
	return undefined;
}

function btnSubmitEdit() {	
	uploadAttachments($("#frmEdit")).then(function (fields) {
		inputs = inputs2json($("#frmEdit"));            

		inputs["image_edit"] = getUploadFile(fields["image_edit"], $("#preview_image_edit").attr("src"));	         		         
		inputs["video_edit"] = getUploadFile(fields["video_edit"], $("#preview_video_edit").attr("src"));;
		inputs["audio_edit"] = getUploadFile(fields["audio_edit"], $("#preview_audio_edit").attr("src"));;
		
      inputs["tags"] = inputs["tags"].join(" ");
      console.log(inputs);
      console.log(JSON.stringify(inputs));
      updatePost(inputs, function (updatedRecord) {
      	updatedRecord["text"] = updatedRecord["text"].replace(/<script>/, "&lt;script>").replace(/<\/script>/, "&lt;/script>");
			updatedRecord["text"] = updatedRecord["text"].replace(rxurl, function foo(x) { return '<a href="' + x + '">Link</a>' });            	
			var newPost = cloneDiv($("#tmplPost"), updatedRecord, "./uploads/");
			console.log(newPost);
			newPost.find("#share").hide();
			$("#tmplPost" + updatedRecord["postid"]).html(newPost.html());
			$("#mdlEditBox").hide();
			clearForm($("#frmEdit"));
      })
  });
}