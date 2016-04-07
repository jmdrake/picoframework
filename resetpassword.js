$.ajaxSetup({ cache: false });
$("#navbar").load("navbar.html", function () {
    showNavbar();
});

var guid;
$(document).ready(function () {
    if ((match = location.href.match(/\?guid=([^&]*)/)) != null) {
        guid = match[1];
        verifyResetToken(guid, function (result) {
            if (result == "Ok") {
                $("#divResetPassword").show();
            } else {
                $("#divErrorMessage").show()
            }
        })
    } else {
        $("#divErrorMessage").show()
    }
});

function btnReset() {
    var data = form2json($("#divResetPassword"));
    if(data["password"] != data["passwordconfirm"]) {
        alert("Passwords do not match")
    } else {
        data["token"] = guid;
        resetPassword(data, function (result) {
            if (result.trim().toLowerCase() == "ok") {
                window.location.replace("index.html?login")
            } else {
                alert(result);
            }
        })
    }
}
