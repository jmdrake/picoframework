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
$sql = mark_sql_get("SELECT id, Users.id AS userid, Users.image AS userimage, Users.name AS username, text, post_shared, image FROM Posts INNER JOIN USERS ON Posts.user = Users.id WHERE user = [user] OR user IN SELECT fanof FROM FanMatrix WHERE fan = [user]");
echo querytojson($sql, $conn);
$conn->close();
?>