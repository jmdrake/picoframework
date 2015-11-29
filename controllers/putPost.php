<?php
/*
 * File : 
 * Input type: POST
 * Inputs: 
 * Outputs: Returns status of insertion or error information
 */

require "../php/config.php";
require "../php/insertfrompost.php";
$conn = open_connection();

$sql = "INSERT SQL";
echo insertfrompost($sql, $conn);

$conn->close();
?>