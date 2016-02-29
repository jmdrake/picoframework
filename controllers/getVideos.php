<?php
/*
 * File : getVideos.php
 * Input type: GET
 * Inputs: user
 * Outputs: user's videos
 */

require "../php/querytojson.php";
require "../php/config.php";
require "../php/mark_sql_get.php";

$conn = open_connection();

$sql = mark_sql_get(
"SELECT video FROM Posts
WHERE user = [user]
AND video <> ''");

// echo $sql;
echo querytojson($sql, $conn);
$conn->close();
?>