<?php
/*
 * File : getPhotos.php
 * Input type: GET
 * Inputs: user
 * Outputs: user's photos
 */

require "../php/querytojson.php";
require "../php/config.php";
require "../php/mark_sql_get.php";

$conn = open_connection();

$sql = mark_sql_get(
"SELECT image FROM Posts
WHERE user = [user]
AND image <> ''");

// echo $sql;
echo querytojson($sql, $conn);
$conn->close();
?>