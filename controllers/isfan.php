<?php
/*
 * File : isfan.php
 * Input type: GET
 * Inputs: user1, user2
 * Outputs: Returns social graph record from FanMatrix
 */

require "../php/querytojson.php";
require "../php/config.php";
require "../php/mark_sql_get.php";

$sql = mark_sql_get("SELECT fan, fanof FROM FanMatrix WHERE fan = [fan] AND fanof = [fanof]");

$conn = open_connection();
echo querytojson($sql, $conn);
$conn->close();
?> 