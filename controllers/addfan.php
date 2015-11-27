<?php
/*
 * File : addfan.php
 * Input type: POST
 * Inputs: fan, fanof
 * Outputs: Returns status of insertion or error information
 */

require "../php/config.php";
require "../php/insertfrompost.php";
$conn = open_connection();

echo insertfrompost("INSERT INTO FanMatrix(fan, fanof)", $conn);

$conn->close();
?>