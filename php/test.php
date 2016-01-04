<?php
/*
 * File : getprofiledata.php
 * Input type: GET
 * Inputs: user
 * Outputs: Returns name and image fields from user profile
 */

require "../php/querytojson.php";
require "../php/config.php";
require "../php/insertfrompost.php";

$conn = open_connection();

/*
$sql = "INSERT INTO Comments(text, user, post)";
$results = insertfrompost($sql, $conn);

if($results == "Ok") {
    echo "SELECT text AS lblCommentText, post AS valCommentPostID, id AS valCommentID, users.image as imgUser FROM Comments INNER JOIN Users ON Comments.user = Users.ID WHERE id=" . mysqli_insert_id($conn);
    echo querytojson("SELECT text AS lblCommentText, post AS valCommentPostID, id AS valCommentID, users.image as imgUser FROM Comments INNER JOIN Users ON Comments.user = Users.ID WHERE id=" + mysqli_insert_id($conn));
} else {
    echo $results;
}*/

$conn->close();

?>
