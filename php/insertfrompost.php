<?php
/*
 * Insertfrompost.php
 * Exports function "insertfrompost"
 * Reads fields from form post or AJAX call and inserts them into the database
 * Usage Example:
 * $conn = open_connection();
 * echo insertfrompost("INSERT INTO user(name, email, password)");
 * $conn.close_connection();
 */

require "utils.php";

function insertfrompost($sql, $conn){
    $table = before(after($sql, "INSERT INTO"), "(");
    $fields = splitstr(before(after($sql, "("), ")"), ",");
    $sql .= " VALUES(";
    $numfields = count($fields);
    for($i = 0; $i < $numfields; $i++) {
        $sql .= "'" . $_POST[$fields[$i]] . "'";
        if($i+1 < $numfields)
            $sql .= ", ";
    }
    $sql .= ")";
    echo $sql;
    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}
?>