<?php
/*
 * File : putSharedPost.php
 * Input type: POST
 * Inputs: text, user, post_shared
 * Outputs: Returns status of insertion or error information
 */

require "../php/config.php";
//require "../php/insertfrompost.php";
require "../php/mark_sql_post.php";
$conn = open_connection();

// $sql = "INSERT INTO Posts(text, user, post_shared)";
// echo insertfrompost($sql, $conn);
$sql = mark_sql_post("INSERT INTO Posts(text, user, post_shared) VALUES([text], [currentuser], [post_shared])");

if ($conn->query($sql) === TRUE) {
    echo "Ok";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>