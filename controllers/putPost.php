<?php
/*
 * File : putPost.php
 * Input type: POST
 * Inputs: text, user
 * Outputs: Returns status of insertion or error information
 */

require "../php/config.php";
require "../php/insertfrompost.php";
$conn = open_connection();

$sql = "INSERT INTO Posts(text, user)";
echo insertfrompost($sql, $conn);

$conn->close();
?>