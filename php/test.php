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
$sql = mark_sql_get("SELECT id FROM Users WHERE email=[email] AND password=[password]");
echo $sql;
/* $result = $conn->query($sql);
$rs = $result->fetch_array(MYSQLI_ASSOC);
$currentuser = $rs["id"];
if($currentuser !== "")
    setcookie("currentuser", $currentuser);
echo $currentuser; */
$conn->close();
?>
