<?php
/*
 * File : login.php
 * Input type: POST
 * Inputs: username, password
 * Outputs: Returns currentuser
 */

require "../php/querytojson.php";
require "../php/config.php";
require "../php/mark_sql_post.php";

$conn = open_connection();
$sql = mark_sql_post("SELECT id, email, password FROM Users WHERE (username=[username] OR email=[username]) AND password=[password]");
$result = $conn->query($sql);
if($result) {
    $rs = $result->fetch_array(MYSQLI_ASSOC);
    $currentuser = $rs["id"];
    if($currentuser != "") {
    	  $session = md5($rs["email"] . $rs["password"] . date("Y.M.D h:m:sa"));
    	  $updatesql = "UPDATE Users SET session = '" . $session . "' WHERE id = " . $currentuser;
    	  $result = $conn->query($updatesql);
    	  echo '{"session" : "' . $session . '", "userid" : "' . $currentuser . '"}';
    } else {
    	  echo "Error : username/email - password combination not found";
    }      
} else {
    echo("Error : Unable to fetch login record");
}
$conn->close();
?>
