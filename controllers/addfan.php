<?php
require "../php/config.php";
require "../php/insertfrompost.php";
$conn = open_connection();

echo insertfrompost("INSERT INTO FanMatrix(fan, fanof)", $conn);

$conn->close();
?>