<?php
/*
 * File : getprofiledata.php
 * Input type: GET
 * Inputs: user
 * Outputs: Returns name and image fields from user profile
 */

require "../php/querytojson.php";
require "../php/config.php";

$user = $_GET["user"];
$sql = "SELECT name, image FROM users WHERE id = " . $user;
$conn = open_connection();
echo querytojson($sql, $conn);
$conn->close();
?>