<?php
/*
 * File : 
 * Input type: POST
 * Inputs: 
 * Outputs: Returns status of deletion or error information
 */

require "../php/config.php";

$conn = open_connection();
$sql = "DELETE SQL";
if ($conn->query($sql) === TRUE) {
    echo "Record deleted successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}
?>