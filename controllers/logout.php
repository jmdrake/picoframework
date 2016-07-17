<?php
/*
 * File : logout.php
 * Input type: GET
 * Inputs: None
 * Outputs: Returns "logged out" message
 */

require "../php/config.php";
require "../php/mark_sql_post.php";

$conn = open_connection();
$sql = mark_sql_post("UPDATE Users SET session=NULL WHERE user=[currentuser]");
$conn->query($sql);
$conn->close();
?>

