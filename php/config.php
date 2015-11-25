<?php
require "config_local.php";
/* $servername = "localhost";
$username = "root";
$password = "";
$database = "godigio"; */

function open_connection(){
    $conn = new mysqli($GLOBALS['servername'], $GLOBALS['username'], $GLOBALS['password'], $GLOBALS['database']);
    return $conn;
}

?>