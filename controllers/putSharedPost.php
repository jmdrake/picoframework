<?php
/*
 * File : putSharedPost.php
 * Input type: POST
 * Inputs: text, user, post_shared
 * Outputs: Returns status of insertion or error information
 */

require "../php/config.php";
require "../php/insertfrompost.php";
$conn = open_connection();

$sql = "INSERT INTO Posts(text, user, post_shared)";
echo insertfrompost($sql, $conn);

$conn->close();
?>