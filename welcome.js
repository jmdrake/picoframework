var rxurl = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:\/~\+#]*[\w\-\@?^=%&amp;\/~\+#])?/g;

$(document).ready(function () {
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
        populatePostList($("#gospelNews"), gospelNews);
    });

    getNews("hip hop", function (posts) {
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
});

function populatePostList(list, data){
    populateList(list, data, $("#tmplPost"), function (newPost, record) {
        var postid = newPost.find("#valPostID").val();
        newPost.attr("id", "tmplPost" + list.attr("id") + postid);
        var blogtext = decodeURIComponent(record["text"]);
        newPost.find("#text").html(blogtext.replace(rxurl, function foo(x) { return '<a href="' + x + '">Link</a>' }));
        if (newPost.find("#valLiked").val() == "1") {
            newPost.find(".btnLikePost").addClass("fa-heart");
            newPost.find(".btnLikePost").removeClass("fa-heart-o");
        }
    }, "./uploads/")
}