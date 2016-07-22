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
        $("#mdlWaiting").show();
        var fields = form2json($("#frmProfile"), "./uploads/");

        uploadImages(fields).then(
            function (response) {
                updateProfile(fields, function (res) {
                    console.log(res);
                    window.location.replace("./index.html?user=" + fields["id"]);
                })
            }, function (error) {
                console.log(error)
            }
        );
    });
});

function uploadImages(profileData){    
    return new Promise(function (resolve, reject) {
        var filecount = 2;
        var semaphore = filecount;
        $("progress").attr("max", semaphore);
        var filename = "userimage";
        uploadImageFile($("#userimageupload"), filename, function (res) {
            if (res.indexOf("Error:") >= 0)
                if (res.indexOf("No file selected") >= 0)
                    profileData["userimage"] = $("#userimage").attr("src").split("/")[2];
                else
                    reject(res);
            else
                profileData["userimage"] = res;
            semaphore--;
            $("progress").attr("value", filecount - semaphore);
            if (semaphore == 0)
                resolve(profileData);
        });
        filename = "bannerimage";
        uploadImageFile($("#bannerimageupload"), filename, function (res) {
            if (res.indexOf("Error:") >= 0)
                if (res.indexOf("No file selected") >= 0)
                    profileData["bannerimage"] = $("#bannerimage").attr("src").split("/")[2];
                else
                    reject(res);                
            else
                profileData["bannerimage"] = res;
            semaphore--;
            $("progress").attr("value", filecount - semaphore);
            if (semaphore == 0)
                resolve(profileData);
        });
    })
}