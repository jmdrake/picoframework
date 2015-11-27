<?php
/*
 * File : getfanoflist
 * Input type: GET
 * Inputs: user
 * Outputs: List of users that are fans of user
 */

require "../php/querytojson.php";
require "../php/config.php";
require "../php/mark_sql_get.php";

$conn = open_connection();
$sql = mark_sql_get("SELECT name, image FROM FanMatrix INNER JOIN Users ON FanMatrix.fan = Users.id WHERE FanMatrix.fan = [user]");
echo querytojson($sql, $conn);
$conn->close();
?>