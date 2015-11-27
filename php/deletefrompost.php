<?php
/*
 * deletefrompost.php
 * Exports function "deletefrompost"
 * Reads fields from AJAX post call and deletes corresponding records
 * Usage Example:
 * $conn = open_connection();
 * echo deletefrompost("DELETE FROM Users WHERE id=[user]", $conn);
 * $conn.close_connection();
 */

require "../php/mark_sql_post.php";

function deletefrompost($sql, $conn) {
    if ($conn->query(mark_sql_post($sql)) === TRUE) {
        echo "Record deleted successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }    
}
?>