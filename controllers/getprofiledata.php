<?php
/*
 * File : getprofiledata.php
 * Input type: GET
 * Inputs: user
 * Outputs: Returns name and image fields from user profile
 */

require "../php/querytojson.php";
require "../php/config.php";

$conn = open_connection();
$sql = "SELECT name, image FROM Users WHERE id = '" . $_GET["user"] ."'";
echo querytojson($sql, $conn);
$conn->close();
?>