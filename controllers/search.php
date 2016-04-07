<?php
/*
 * File : search.php
 * Input type: GET
 * Inputs: searchstr
 * Outputs: matches to search string
 */

require "../php/querytojson.php";
require "../php/config.php";
require "../php/mark_sql_get.php";

$conn = open_connection();
$sql = mark_sql_get("SELECT Users.id AS userid, name, userimage FROM Users WHERE MATCH(name) AGAINST([searchstr])");
echo querytojson($sql, $conn);
$conn->close();
?>