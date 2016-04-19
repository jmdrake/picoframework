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

    getNews("r&b", function (posts) {
        var postList = JSON.parse(posts);
        populateList($("#r_and_bNews"), postList, $("#tmplPost"), undefined, "./uploads/");
    });

    getNews("gospel", function (posts) {
        var postList = JSON.parse(posts);
        populateList($("#gospelNews"), postList, $("#tmplPost"), undefined, "./uploads/");
    });

    getNews("hip hop", function (posts) {
        var postList = JSON.parse(posts);
        populateList($("#hip_hopNews"), postList, $("#tmplPost"), undefined, "./uploads/");
    });

    getNews("jazz", function (posts) {
        var postList = JSON.parse(posts);
        populateList($("#jazzNews"), postList, $("#tmplPost"), undefined, "./uploads/");
    });

    getNews("country", function (posts) {
        var postList = JSON.parse(posts);
        populateList($("#countryNews"), postList, $("#tmplPost"), undefined, "./uploads/");
    });

    getNews("rock", function (posts) {
        var postList = JSON.parse(posts);
        populateList($("#rockNews"), postList, $("#tmplPost"), undefined, "./uploads/");
    });
});