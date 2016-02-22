<?php
/*
 * File : getprofiledata.php
 * Input type: GET
 * Inputs: user
 * Outputs: Returns name and image fields from user profile
 */

require "../php/querytojson.php";
require "../php/config.php";
require "../php/mark_sql_get.php";

$conn = open_connection();
$sql = mark_sql_get("SELECT id, name, userimage, bannerimage, dob, gender, zip, marital, location FROM Users WHERE id = [user]");
// echo $sql;
echo querytojson($sql, $conn);
$conn->close();
?>