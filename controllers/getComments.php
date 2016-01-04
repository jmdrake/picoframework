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
$sql = mark_sql_get("SELECT COmments.id AS valCommentID, text AS lblCommentText, Users.name AS lblUserName, Users.image AS imgUser FROM Comments INNER JOIN Users ON Users.id = user WHERE post = [post];");
echo querytojson($sql, $conn);
$conn->close();
?>