<?php
/*
 * File : putComment.php
 * Input type: POST
 * Inputs: text, user, post
 * Outputs: Returns status of insertion or error information
 */

require "../php/querytojson.php";
require "../php/config.php";
require "../php/insertfrompost.php";
$conn = open_connection();

$sql = "INSERT INTO Comments(text, user, post)";
$results = insertfrompost($sql, $conn);

$sql2 = "SELECT text AS lblCommentText, post AS valCommentPostID, Comments.id AS valCommentID, users.image as imgUser FROM Comments INNER JOIN Users ON Comments.user = Users.ID WHERE Comments.id = " . mysqli_insert_id($conn);

if($results == "Ok") {
    echo querytojson($sql2, $conn);
} else {
    echo $results;
}

$conn->close();
?>