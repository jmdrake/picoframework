<?php
/*
 * File : verifyResetToken.php
 * Input type: GET
 * Inputs: reset token
 * Outputs: Returns reset token status
 */

require "../../php/querytojson.php";
require "../../php/config.php";
require "../../php/mark_sql_get.php";

$conn = open_connection();
$sql = mark_sql_get('SELECT token FROM Recovery WHERE token = [token]');
// echo $sql;
echo querytojson($sql, $conn);
$conn->close();
?>