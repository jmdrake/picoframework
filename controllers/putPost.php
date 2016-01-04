<?php
/*
 * File : putPost.php
 * Input type: POST
 * Inputs: text, user
 * Outputs: Returns status of insertion or error information
 */

require "../php/config.php";
require "../php/insertfrompost.php";
require "../php/querytojson.php";
$conn = open_connection();

$sql = "INSERT INTO Posts(text, user)";
$results = insertfrompost($sql, $conn);

if($results == "Ok") {
    $selquery = "SELECT text AS lblText, Posts.id AS valPostID, Users.id AS valUserID, Users.image AS imgUserImage FROM Posts INNER JOIN Users ON Posts.user = Users.id WHERE Posts.id = " . mysqli_insert_id($conn);
    echo querytojson($selquery, $conn);
    // echo $selquery;
    // echo querytojson("SELECT text AS lblText, Posts.id AS valPostID, Users.id AS valUserID, Users.image AS imgUserImage FROM Posts INNER JOIN Users ON Posts.user = Users.id WHERE Posts.id = " . mysqli_insert_id($conn));
    // echo '{"lblText" : "' . $_POST["text"] . '", "valPostID" : "' . mysqli_insert_id($conn) . '"}';
    // echo "{'lblText' : '" . $_POST["text"] . "', 'valPostID' : '" . mysqli_insert_id($conn) . "'}";
} else {
    echo $results;
}
$conn->close();
?>