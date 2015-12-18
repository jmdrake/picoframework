/**
* Created with fanhubphp.
* User: jmdrake
* Date: 2015-11-19
* Time: 05:44 PM
* To change this template use Tools | Templates.
*/

$(document).ready(function () {
    // executes when HTML-Document is loaded and DOM is ready
    var userpage = window.location.search.split("=")[1];
    var currentuser;
    console.log("Userpage:" + userpage + ";");
    if (userpage == "" || userpage == undefined)
        window.location.replace("welcome.html");

    getProfileData(userpage, function (data) {
        console.log(data);
        if (data == undefined)
            window.location.replace("welcome.html");
        $(".name").html(data["name"]);
        if (data["image"] != "")
            $(".profileimg").attr("src", "uploads/" + data["image"]);
        $("#dob").html(data["dob"]);
        $("#location").html(data["location"]);
    });

    getCurrentUser(function (data) {
        currentuser = data;
        if ((currentuser !== userpage) && (currentuser != ""))
            $("#fantoggle").show();
        if ((currentuser == userpage) && (currentuser != "")) {
            $("#divEditProfile").show();
            $("#postform").show();
        }

        isFan(currentuser, userpage, function (data) {
            $("#fantoggle").html(data);
        });
        if (currentuser == "") {
            $("#login_out").html("Login");
        } else {
            $("#login_out").html("Logout");
        }
    });

    getFanOfList(userpage, function (fandata) {
        fanlist = JSON.parse(fandata);
        $(".fanofcount").html(fanlist.length);
        for (var i = 0; i < fanlist.length; i++) {
            newUserIcon = $("#fanoftemplate").clone();
            $("#fanoflist").append(newUserIcon);
            newUserIcon.find(".name").html(fanlist[i]["name"]);
            if (fanlist[i]["image"] != "")
                newUserIcon.find("img").attr("src", "uploads/" + fanlist[i]["image"]);
            newUserIcon.show();
        }
    });

    getFanList(userpage, function (fandata) {
        fanlist = JSON.parse(fandata);
        $(".fancount").html(fanlist.length)
        for (var i = 0; i < fanlist.length; i++) {
            newUserIcon = $("#fantemplate").clone();
            $("#fanlist").append(newUserIcon);
            newUserIcon.find(".name").html(fanlist[i]["name"]);
            if (fanlist[i]["image"] != "")
                newUserIcon.find("img").attr("src", "uploads/" + fanlist[i]["image"]);
            newUserIcon.show();
        }
    });

    getUsersPosts(userpage, function (postdata) {
        postlist = JSON.parse(postdata);
        $(".postcount").html(postlist.length);
        var newPost;
        for (var i = 0; i < postlist.length; i++) {
            newPost = $("#posttemplate").clone();
            $("#usersposts").append(newPost);
            newPost.find(".postid").val(postlist[i]["postid"]);
            if (postlist[i]["Users.image"] != "") {
                newPost.find(".userimage").attr("src", "uploads/" + postlist[i]["userimage"]);
                newPost.find(".userimage").attr("width", "100px");
            }
            if (postlist[i]["postimage"] != "")
                newPost.find(".postimage").attr("src", "uploads/" + postlist[i]["postimage"]);
            console.log("Post Image : " + postlist[i]["postimage"]);
            newPost.find(".message").html(postlist[i]["text"]);
            console.log(postlist[i]);
            getLikes(postlist[i]["postid"], function (likesdata) {
                likeslist = JSON.parse(likesdata);
                newPost.find(".likescount").html(likeslist.length);
                if ((likeslist.length > 0) && (findInJSON(likeslist, "user", currentuser))) {
                    newPost.find(".btnLike").removeClass("fa-heart-o");
                    newPost.find(".btnLike").addClass("fa-heart");
                }
            });
            // if (currentuser == postslist[i]["userid"])
            newPost.find(".btnShare").hide();
            newPost.show();
        }
    });

    $("#fantoggle").click(function () {
        if ($("#fantoggle").html() == "Fan")
            addFan({ "fan": currentuser, "fanof": userpage }, function (data) {
                console.log(data);
                $("#fantoggle").html("Unfan");
            })
        else
            deleteFan({ "fan": currentuser, "fanof": userpage }, function (data) {
                console.log(data);
                $("#fantoggle").html("Fan");
            })
    });

    $("#login_out").click(function () {
        if ($("login_out").html() == "Login") {
            window.location.replace("login.html");
        } else {
            logout(function (results) {
                console.log(results);
                window.location.replace("welcome.html");
            });
        }
    });

    $(".upload").change(function () {
        readURL(this, "#preview-img");
        $("#preview-img").show();
    });

    $(".fa-image").click(function () {
        $('#imageupload').click()
    });
    
    $(".fa-camera").click(function () {
        alert("Taking a picture");
    });    

    $("#btnPost").click(function () {
        var fields = form2json($("#postform"));
        if ($("#imageupload").prop('files').length > 0) {
            var fileext = $("#imageupload").prop('files')[0]["type"].split("/")[1];
            generateFileName("user" + currentuser + "poststamp", function (filename) {
                var file = filename.trim() + "." + fileext;
                console.log("Filename : " + file);
                uploadFile($("#imageupload"), file);
                fields["image"] = file;
                fields["user"] = currentuser;
                console.log(fields);
                putPostWithImage(fields, function (results) {
                    console.log(results);
                })
            })
        } else {
            fields["user"] = currentuser;
            console.log(fields);
            putPost(fields, function (results) {
                console.log(results);
            })
        }
    });

});

