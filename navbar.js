$("#navbar").load("navbar.html");

$(document).ready(function () {
    getCurrentUser(function (user) {
        if (user != "") {
            $("#btnLoginLogout").html("Logout");
            $("#btnViewProfile").show();
            $("#btnViewProfile").attr("href", "index.html?user=" + user);
            $("#btnEditProfile").show();
            $("#btnRegister").hide();
        } else {
				$("#btnLoginLogout").html("Login");
            $("#btnViewProfile").hide();
            $("#btnEditProfile").hide();
            $("#btnRegister").show();        		
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

function btnFanToggle() {
	 var pageUser = window.location.search.split("=")[1].trim();
    if ($("#btnFanToggle").html() == "Fan")
        addFan({ "fanof": pageUser}, function (result) {
            console.log(result);
            $("#btnFanToggle").html("Unfan");
        })
    else
        deleteFan({ "fanof": pageUser }, function (result) {
            console.log(result);
            $("#btnFanToggle").html("Fan");
        })    
}

window.onscroll = function() {scrollFunction()};

function scrollFunction() {	 
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        $("#logoimg").attr("height", "60px");
    } else {
        $("#logoimg").attr("height", "120px");
    }
}