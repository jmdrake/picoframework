<?php
require "../php/config.php";
require "../php/insertfrompost.php";
$conn = open_connection();

echo insertfrompost("INSERT INTO Users(name, email, password)", $conn);

$conn->close();
?>