<?php
/*
 * File : getLikes.php
 * Input type: GET
 * Inputs: post
 * Outputs: List of users who like post
 */

require "../php/querytojson.php";
require "../php/config.php";
require "../php/mark_sql_get.php";

$conn = open_connection();
$sql = mark_sql_get("SELECT user FROM Likes WHERE post = [post]");
echo querytojson($sql, $conn);
$conn->close();
?>