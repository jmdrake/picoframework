<?php
/*
 * File : putPost.php
 * Input type: POST
 * Inputs: text, user, image, shared
 * Outputs: Returns status of insertion or error information
 */

require "../php/config.php";
require "../php/insertfrompost.php";
$conn = open_connection();

$sql = "INSERT INTO Posts(text, user, image, post_shared)";
echo insertfrompost($sql, $conn);

$conn->close();
?>