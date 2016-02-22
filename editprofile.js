// JavaScript File

/**
* Created with fanhubphp.
* User: jmdrake
* Date: 2015-11-19
* Time: 05:44 PM
* To change this template use Tools | Templates.
*/

$(document).ready(function () {
    // executes when HTML-Document is loaded and DOM is ready
    var defaultimg = "profile-icon.png";
    getCurrentUser(function (user) {
        if ((user == undefined) || (user == ""))
            window.location.replace("welcome.html");
        getProfileData(user, function (profileData) {
            json2form($("#frmProfile"), profileData, "./uploads/");
            console.log(profileData);
        })
    })

    $(".upload").change(function () {
        var id = $(this).parent().find(".preview").attr("id");
        readURL(this, "#" + id);
    });

    $(".preview").click(function () {
        $(this).parent().parent().find(".upload").click();
    });

    $("#btnSubmit").click(function () {
        var fields = form2json($("#frmProfile"), "./uploads/");
        var newfile = uploadFileFromForm($("#frmProfile"), fields["id"]);
        if (newfile != null) 
            fields["image"] = newfile;
        console.log(fields);
        updateProfile(fields, function (result) {
            console.log(result);
            window.location.replace("./index.html?user=" + fields["id"]);
        })
    });
});

