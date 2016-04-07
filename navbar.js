$("#navbar").load("navbar.html");

$(document).ready(function () {
    getCurrentUser(function (user) {
        if (user != "") {
            $("#btnLoginLogout").html("Logout");
            $("#btnViewProfile").show();
            $("#btnViewProfile").attr("href", "index.html?user=" + user);
            $("#btnEditProfile").show();
            $("#btnRegister").hide();
        }
    })
});

function btnLoginLogout(){
    console.log($("#btnLoginLogout").html());
    if ($("#btnLoginLogout").html() == "Logout") {
        logout(function (res) {            
            window.location.replace("./welcome.html");
        })
    } else {
        window.location.replace("./login.html");
    }
}

function btnSearch() {
    var searchstr = $("#search").val();
    search(searchstr, function (userList) {
        $("#lstSearch").html("");
        populateList($("#lstSearch"), userList, $("#tmplUser"), function (div, record) {
            div.find("a").attr("href", "index.html?user=" + record["userid"]);
        }, "./uploads/");
    })
}