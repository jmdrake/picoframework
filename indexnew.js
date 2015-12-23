$(document).ready(function () {
    var pageUser = window.location.search.split("=")[1];
    var currentUser;
    if(pageUser=="")
        window.location.replace("welcome.html");

    getCurrentUser(function(user) {
        currentUser = user;
        if(currentUser != ""){
            if(currentUser == pageUser){
                $("#btnEditProfile").show();
                $("#frmPost").show();}
            else {
                $("#btnFanToggle").show()}
        } else {
            $("#btnLoginLogout").html("Log In");}});

    getProfileData(pageUser, function(profileData){
        if(profileData == undefined){
            window.location.replace("welcome.html")}
        populateDiv($("#divProfile"), profiledata)});

    getFanList(pageUser, function(fanData){
        var fanlist = JSON.parse(fanData);
        $("#lblFanCount").html(fanlist.length);
        populateList($("#lstFans"), fanlist, $("#tmplFan"));});

    getFanOfList(pageUser, function(fanData){
        var fanoflist = JSON.parse(fanData);
        $("#lblFanOfCount").html(fanoflist.length);
        populateList($("#lstFanOf"), fanoflist, $("#tmplFan"))});

    getAllPosts(pageUser, function(data) {
        populatePostList($("#lstAllPosts"), data);});

    getUsersPosts(pageUser, function(data) {
        populatePostList($("#lstAllPosts"), data);});

    $("#btnSubmitPost").click(function() {
        var fields = form2json("#frmPost");
        putPost(fields, function(data){
            var newRecord = JSON.parse(data);
            if(newRecord["image"] != ""){
                uploadFile("#imageupload", newRecord["image"])};
            clearForm("#frmPost");
            newPost = cloneDiv($("#tmplPost"), newRecord);
            $("#lstAllPosts").prepend(newPost);
            $("#lstUsersPost").prepend(newPost) })});

    $("#btnSubmitComment").click(function() {
        var fields = form2json("#mdlComment");
        putComment(fields, function(newComment){
            clearForm("#mdlComment");
            increment(".lblCommentCount");
            $(".lstComments").prepend(cloneDiv($("#tmplComment"),newComment));
            $("#mdlComment").hide();})});

    $("#btnSubmitShare").click(function() {
        var fields = form2json("#mdlShare");
        var postid = fields["postid"];
        putShare(fields, function(res){
            clearForm("#mdlShare");
            increment($("#post"+postid).find(".lblShareCount"));
            $("#mdlShare").hide() })});

    $("#btnShare").click(function() {
        $("#mdlShare").show();
        $("#mdlSharePostID").val(findParent());});

    $("#btnComment").click(function() {
        $("#mdlComment").show() });

    $("#btnLikePost").click(function() {
        toggleLikeTable(currentUser, postId, function(res){
            toggleLikeIcon(this);})});

    $("#btnAllPosts").click(function() {
        $("#lstAllPosts").show();
        $("#lstUsersPosts").hide()});

    $("#btnAllPosts").click(function() {
        $("#lstAllPosts").hide();
        $("#lstUsersPosts").show();});

    $(".btnDeletePost").click(function() {
        currentPost = findParent(this, "#tmplPost");
        postid = currentPost.find(".postid").val;
        deletePost(postid, function(){
            deleteDiv(currentPost)})});
});

function populatePostList(list, data){
    populateList(list, data, $("#tmplPost"), function(newPost){
        if(likesPost(currentuser, newPost)){
            setLike(newPost)}})}



