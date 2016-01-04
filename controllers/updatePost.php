<?php
/*
 * File : updatePost.php
 * Input type: POST
 * Inputs: valText, valPostID, imgUpload
 * Outputs: Returns status of insertion or error information
 */

require "../php/config.php";
require "../php/mark_sql_post.php";
$conn = open_connection();

$sql = mark_sql_post("UPDATE Posts SET text=[lblText], image=[imgPostImage] WHERE id=[valPostID]");
if ($conn->query($sql) === TRUE) {
    echo "Record udpated successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}    

$conn->close();
?>