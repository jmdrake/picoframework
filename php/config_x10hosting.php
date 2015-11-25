<?php
$servername = "localhost";
$username = "visionpa_test";
$password = "pass";
$database = "visionpa_godigio";

function open_connection(){
    return new mysqli($GLOBALS('servername'), $GLOBALS('username'), $GLOBALS('password'), $GLOBALS('database'));
}

function close_connection($conn){
    $conn->close();
}
?>