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

        getUsersPosts(pageUser, function (postData) {
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
            // $("#lstTags").append(newDiv);
            newDiv.show();
				newDiv.find("input").attr("id", "tag_" + tags[i]);
            $(".tags").append(newDiv);            
        }
        console.log(profileData);
    });

    getFans(pageUser, function (fanData) {
        var fanList = JSON.parse(fanData);
        $("#fancount").html(fanList.length);
        populateList($("#lstFans"), fanList, $("#tmplFan"), function (div, record) {
            div.find("a").attr("href", "?user=" + record["userid"]);
            div.show();
            $("#lstFans").append(div);
        }, "./uploads/");
    });

    getFavs(pageUser, function (fanData) {
        var favList = JSON.parse(fanData);
        $("#favcount").html(favList.length);
        populateList($("#lstFavs"), favList, $("#tmplFan"), function (div, record) {
            div.find("a").attr("href", "?user=" + record["userid"]);
            div.show();
            $("#lstFavs").append(div);
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

function updateCommentList(prefix, postid, newComment) {
    var post = $(prefix + postid);
    post.find("#lstComments").prepend(newComment);
    increment(post.find("#lblCommentCount"));
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

