/**
* Created with fanhubphp.
* User: jmdrake
* Date: 2015-11-22
* Time: 07:39 PM
* To change this template use Tools | Templates.
*/

var sqlresults;
$("#btnLogin").click(function () {
    login(form2json($("#login_form")), function (userid) {
        if (userid != "") {            
            window.location.replace("index.html?user=" + userid);
        } else {
            alert("Invalid Username or Password");
        }
    });
});

function btnReset() {
    $("#mdlReset").show();
}

function btnSendResetRequest(){
    var resetrequest;
    resetrequest = form2json($("#frmReset"));
    $("#mdlReset").find("#frmReset").hide();
    sendResetRequest(resetrequest, function (result) {
        console.log(result);
        $("#mdlReset").find("#message").show();
        if (result.search("0:") >= 0) {            
            $("#mdlReset").find("#message").html("A password reset link sent to your email");
        } else if (result.search("1:") >= 0) {
            $("#mdlReset").find("#message").html("Uable to sent reset email");
        } else if (result.search("2:") >= 0) {
            $("#mdlReset").find("#message").html("Unknown SQL error");
        } else if (result.search("3:") >= 0) {
            $("#mdlReset").find("#message").html("Email address not found");
        }
    })
}    

