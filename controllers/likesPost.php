<?php
/*
 * File : 
 * Input type: GET
 * Inputs: 
 * Outputs: 
 */

require "../php/querytojson.php";
require "../php/config.php";
require "../php/mark_sql_get.php";

$conn = open_connection();
$sql = mark_sql_get("SELECT count(*) AS likecount FROM Likes WHERE Likes.user = [userid] AND Likes.post = [postid]");
echo querytojson($sql, $conn);
$conn->close();
?>