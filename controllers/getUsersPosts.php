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
$sql = mark_sql_get("SELECT Posts.id AS postid, Users.id AS userid, Users.image AS userimage, Users.name AS username, text, post_shared, Posts.image AS postimage FROM Posts INNER JOIN USERS ON Posts.user = Users.id WHERE user = [user]");
echo querytojson($sql, $conn);
$conn->close();
?>