<?php
/*
 * File : 
 * Input type: GET
 * Inputs: 
 * Outputs: 
 */

require "../php/querytojson.php";
require "../php/config.php";
require "../php/mark_sql_get.php";

$conn = open_connection();
$sql = mark_sql_get("SELECT id, text, post_shared, image FROM Posts WHERE user = [user]");
echo querytojson($sql, $conn);
$conn->close();
?>