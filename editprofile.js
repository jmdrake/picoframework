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
        else
            console.log("Current User:" + user);
        getProfileData(user, function (profileData) {
            console.log(profileData);
            $("#name").val(profileData['name']);
            $("#dob").val(profileData['dob']);
            $("#userid").val(user);
            $("#location").val(profileData['location']);
            if (profileData['image'] != '') {
                $("#preview-img").attr("src", "uploads/" + profileData['image']);
            }
        })
    })

    $(".upload").change(function () {
        readURL(this, "#preview-img");
    });

    $("#preview-img").click(function () {
        $('#imageupload').click()
    });

    $("#btnSubmit").click(function () {
        var fields = form2json($("#profile_form"));
        if ($("#imageupload").prop('files').length > 0) {
            var fileext = $("#imageupload").prop('files')[0]["type"].split("/")[1];
            var filename = "user" + fields["userid"] + "pic." + fileext;
            console.log("Uploading Image");
            uploadFile($("#imageupload"), filename);
        } else {
            var filename = $("#preview-img").attr("src").split("/")[1];
            if (filename == defaultimg)
                filename = "";
        }
        fields["image"] = filename;
        updateProfile(fields, function (result) {
            console.log(result);
            window.location.replace("./index.html?user="+fields["userid"])
        });
    });
});

