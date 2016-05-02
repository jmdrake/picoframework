$(document).ready(function () {
    var pageUser = window.location.search.split("=")[1];
    if (pageUser == "" || pageUser == undefined) {
        showNews();        
    } else {
        showProfile(pageUser);
    }
});

function showNews(){
    getCurrentUser(function (user) {
        if (user != "") {
            $("#msgWelcome").html("Godigio H.U.B. News");
        } else {
            $("#btnLogin").show();
            $("#btnRegister2").show();
        }
        $("#msgWelcome").show();
    })

    getSamplePhotos(function (photos) {
        var photoList = JSON.parse(photos);
        populateList($("#lstPhotos"), photoList, $("#tmplPhoto"), undefined, "./uploads/");
    });

    getSampleVideos(function (videos) {
        var videoList = JSON.parse(videos);
        populateList($("#lstVideos"), videoList, $("#tmplVideo"), undefined, "./uploads/");
    });

    getSampleAudio(function (tracks) {
        var audioList = JSON.parse(tracks);
        populateList($("#lstSongs"), audioList, $("#tmplAudio"), undefined, "./uploads/");
    });

    getNews("r_and_b", function (posts) {
        var rnbNews = JSON.parse(posts);
        populatePostList($("#r_and_bNews"), rnbNews);
    });

    getNews("gospel", function (posts) {
        var gospelNews = JSON.parse(posts);
        console.log(posts);
        populatePostList($("#gospelNews"), gospelNews);
    });

    getNews("hip_hop", function (posts) {
        var hiphopNews = JSON.parse(posts);
        populatePostList($("#hip_hopNews"), hiphopNews);
    });

    getNews("jazz", function (posts) {
        var jazzNews = JSON.parse(posts);
        populatePostList($("#jazzNews"), jazzNews);
    });

    getNews("country", function (posts) {
        var countryNews = JSON.parse(posts);
        populatePostList($("#countryNews"), countryNews);
    });

    getNews("rock", function (posts) {
        var rockNews = JSON.parse(posts);
        populatePostList($("#rockNews"), rockNews);
    });
}

function showProfile(pageUser) {
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

    $(".upload").change(function () {
        var previewdiv = "#preview-" + this.id;
        readURL(this, previewdiv);
        $(previewdiv).show();
    });

    $(".fileselect").click(function () {
        $(this).parent().find("input").click();
        return false;
    });    
}    