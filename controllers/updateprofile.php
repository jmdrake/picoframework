<?php
/*
 * File : updatefrompost.php
 * Input type: POST
 * Inputs: name, dob, image, id
 * Outputs: Returns status of udpate or error information
 */

require "../php/config.php";
require "../php/mark_sql_post.php";
$conn = open_connection();

$sql = mark_sql_post("UPDATE Users SET name=[name], dob=[dob], image=[image], location=[location] WHERE id=[userid]");

// echo "Fubar";
if ($conn->query($sql) === TRUE) {
    echo $sql;
    echo "Record udpated successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}    

$conn->close();
?>