<?php
/*
 * deletefrompost.php
 * Exports function "updatefrompost"
 * Reads fields from AJAX post call and updates corresponding records
 * Usage Example:
 * $conn = open_connection();
 * echo deletefrompost("UPDATE Users SET name=[name], dob=[dob] WHERE id=[user]", $conn);
 * $conn.close_connection();
 */

require "../php/mark_sql_post.php";

function updatefrompost($sql, $conn) {
    if ($conn->query(mark_sql_post($sql)) === TRUE) {
        echo "Record udpated successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }    
}
?>