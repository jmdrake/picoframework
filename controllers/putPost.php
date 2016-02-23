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

$selquery = "SELECT text AS lblText, Posts.id AS valPostID, Users.id AS valUserID, Users.userimage AS imgUserImage FROM Posts INNER JOIN Users ON Posts.user = Users.id WHERE Posts.id = " . mysqli_insert_id($conn);

// echo $selquery;
echo querytojson($selquery, $conn);
$conn->close();
?>