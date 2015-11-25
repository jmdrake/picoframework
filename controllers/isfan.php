<?php
/*
 * File : isfan.php
 * Input type: GET
 * Inputs: user1, user2
 * Outputs: Returns "true" if user1 is a fan of user2; returns false otherwise
 */

require "../php/querytojson.php";
require "../php/config.php";

$user1 = $_GET["user1"];
$user2 = $_GET["user2"];

$sql = "SELECT fan, fanof FROM FanMatrix WHERE fan = '" . $user1 . "'AND fanof = '" . $user2 . "'";

$conn = open_connection();
echo querytojson($sql, $conn);
$conn->close();
?> 