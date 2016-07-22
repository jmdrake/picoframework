<?php
/*
 * File : addfan.php
 * Input type: POST
 * Inputs: fan, fanof
 * Outputs: Returns status of insertion or error information
 */

require "../php/config.php";
require "../php/mark_sql_post.php";
$conn = open_connection();

$sql = mark_sql_post("INSERT INTO FanMatrix(fan, fanof) VALUES ([currentuser], [fanof])");

if ($conn->query($sql) === TRUE) {
    echo "Ok";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>