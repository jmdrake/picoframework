<?php

require "../php/config.php";
// require "../php/insertfrompost.php";
require "../php/mark_sql_post.php";

$conn = open_connection();
$sql = mark_sql_post("INSERT INTO Users(name, username, email, password) VALUES ([name], [username], [email], [password], [session])");

if ($conn->query($sql) === TRUE) {
    echo "Ok";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}
$conn->close();
?>
