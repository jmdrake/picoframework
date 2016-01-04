<?php
/*
 * File : getLikes.php
 * Input type: GET
 * Inputs: post
 * Outputs: Count of users who like post
 */

require "../php/querytojson.php";
require "../php/config.php";
require "../php/mark_sql_get.php";

$conn = open_connection();
$sql = mark_sql_get("SELECT COUNT(*) AS sharecount FROM Posts WHERE post_shared = [post]");
echo querytojson($sql, $conn);
$conn->close();
?>