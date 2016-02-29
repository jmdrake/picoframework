<?php
/*
 * File : getAudio.php
 * Input type: GET
 * Inputs: user
 * Outputs: user's audio tracks
 */

require "../php/querytojson.php";
require "../php/config.php";
require "../php/mark_sql_get.php";

$conn = open_connection();

$sql = mark_sql_get(
"SELECT audio FROM Posts
WHERE user = [user]
AND audio <> ''");

// echo $sql;
echo querytojson($sql, $conn);
$conn->close();
?>