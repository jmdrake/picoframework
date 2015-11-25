<?php
require "../php/config.php";
require "../php/insertfrompost.php";
$conn = open_connection();

// $sql = "SELECT id FROM Users WHERE email='" . $_POST["email"] . "' AND password='" . $_POST["password"] . "'";
$result = $conn->query("SELECT id FROM Users WHERE email='" . $_POST["email"] . "' AND password='" . $_POST["password"] . "'");
$currentuser = $result->fetch_array(MYSQLI_ASSOC)["id"];
if($currentuser !== "")
    setcookie("currentuser", $currentuser);
echo $currentuser;
$conn->close();
?>