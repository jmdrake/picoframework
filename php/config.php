<?php
require "config_local.php";
/*
$servername = "my.smtpserver.com";
$username = "myusername";
$password = "mypassword";
$database = "databasename";

$smtphost = 'my.smtphost.com';  // Specify main and backup SMTP servers
$smtpauth = true;                               // Enable SMTP authentication
$smtpusername = 'mysmtpusername';
$smtppassword = 'mysmtppassword';                           // SMTP password
$smtpport = mysmtpport;         // Usually 25 or 26
*/

function open_connection(){
    $conn = new mysqli($GLOBALS['servername'], $GLOBALS['username'], $GLOBALS['password'], $GLOBALS['database']);
    return $conn;
}


function set_currentuser(){
	global $currentuser;	
	$session = $_REQUEST["session"];
	if($session=="") { 
		$currentuser = "";
	} else {
		$conn = open_connection();
		$currentuser = currentUserFromSession($conn, $session);		
		$conn->close();	
	}		
}

function currentUserFromSession($conn, $session){	
	$sql = "SELECT id FROM Users WHERE session='" . $session . "'";	
	$result = $conn->query($sql);	
	if($result) {
		$rs = $result->fetch_array(MYSQLI_ASSOC);
		return $rs["id"];
	} else {
		return "";
	}		
}

set_currentuser();
?>