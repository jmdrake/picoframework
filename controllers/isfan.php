<?php
/*
 * File : isfan.php
 * Input type: GET
 * Inputs: user1, user2
 * Outputs: Returns "true" if user1 is a fan of user2; returns false otherwise
 */

require "../php/querytojson.php";
require "../php/config.php";

$fan = $_GET["fan"];
$fanof = $_GET["fanof"];

$sql = "SELECT fan, fanof FROM FanMatrix WHERE fan = '" . $fan . "'AND fanof = '" . $fanof . "'";

$conn = open_connection();
echo querytojson($sql, $conn);
$conn->close();
?> 