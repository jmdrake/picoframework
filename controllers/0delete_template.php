<?php
/*
 * File : 
 * Input type: POST
 * Inputs: 
 * Outputs: Returns status of deletion or error information
 */

require "../php/config.php";
require "../php/deletefrompost.php";

$conn = open_connection();
$sql = "DELETE SQL";
echo deletefrompost($sql, $conn);
$conn->close();
?>