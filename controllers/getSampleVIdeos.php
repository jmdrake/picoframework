<?php
/*
 * File : getSampleVideos.php
 * Input type: GET
 * Inputs: user
 * Outputs: user's photos
 */

require "../php/querytojson.php";
require "../php/config.php";
require "../php/mark_sql_get.php";

$conn = open_connection();

$sql = mark_sql_get(
"SELECT user, video, text FROM Posts
WHERE video <> ''
ORDER BY id DESC
LIMIT 0,5");

// echo $sql;
echo querytojson($sql, $conn);
$conn->close();
?>