<?php
/*
 * File : getComments.php
 * Input type: GET
 * Inputs: post
 * Outputs: List of comments for post
 */

require "../php/querytojson.php";
require "../php/config.php";
require "../php/mark_sql_get.php";

$conn = open_connection();
$sql = mark_sql_get("SELECT Comments.id AS commentid, text, Users.name AS name, Users.userimage AS image FROM Comments INNER JOIN Users ON Users.id = user WHERE post = [post];");
echo querytojson($sql, $conn);
$conn->close();
?>