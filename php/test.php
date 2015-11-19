<?php

$servername = "sql212.byethost33.com";
$username = "b33_16395906";
$password = "276s0gmz";

// Create connection
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
echo "Connected successfully";
$result = mysql_query("SELECT ...");
 $rows = array();
   while($r = mysql_fetch_assoc($result)) {
     $rows['object_name'][] = $r;
   }

 print json_encode($rows);
?>