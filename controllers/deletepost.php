<?php
/*
 * File : deletepost.php
 * Input type: POST
 * Inputs: postid
 * Outputs: Returns status of deletion or error information
 */

require "../php/config.php";
require "../php/deletefrompost.php";
// require "../php/mark_sql_post.php";

$conn = open_connection();
$sql = "DELETE FROM Posts WHERE user = [currentuser] and id = [postid]";
echo deletefrompost($sql, $conn);
// echo mark_sql_post("DELETE FROM Posts WHERE user = [currentuser] and id = [postid]");
$conn->close();
?>