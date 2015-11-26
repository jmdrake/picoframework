<?php
/*
 * File : deletefan.php
 * Input type: POST
 * Inputs: fan, fanof
 * Outputs: Returns status of deletion or error information
 */

require "../php/config.php";
require "../php/mark_sql_post.php";
$conn = open_connection();
$sql = mark_sql_post("DELETE FROM FanMatrix WHERE fan = [fan] AND fanof = [fanof]");
if ($conn->query($sql) === TRUE) {
    echo "Record deleted successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}
?>