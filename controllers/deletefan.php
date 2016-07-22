<?php
/*
 * File : deletefan.php
 * Input type: POST
 * Inputs: fan, fanof
 * Outputs: Returns status of deletion or error information
 */

require "../php/config.php";
require "../php/deletefrompost.php";

$conn = open_connection();
$sql = mark_sql_post("DELETE FROM FanMatrix WHERE fan = [currentuser] AND fanof = [fanof]");

if ($conn->query($sql) === TRUE) {
    echo "Ok";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>