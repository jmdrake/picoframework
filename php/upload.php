<?php
require "config.php";
$conn = open_connection();
$filetoken = explode("|", $_REQUEST["name"]);
$postfix = $filetoken[0];
$session = $filetoken[1];
$currentuser = currentUserFromSession($conn, $session);
$conn->close();

$upLoadOk = 1;
$target_dir = "uploads/";
$target_file = $target_dir . basename($_FILES["file"]["name"]);
$filename = "user" . $currentuser . $postfix;

if ($_FILES["file"]["size"] > 5000000) {
    echo "Error: Sorry, your file is too large.";
    $upLoadOk = 0;
}

if ( 0 < $_FILES['file']['error'] ) {
    echo 'Error: ' . $_FILES['file']['error'] . '<br>';
    $upLoadOk = 0;
}
if($upLoadOk == 1) {
    move_uploaded_file($_FILES['file']['tmp_name'], '../uploads/' . $filename);
    echo('Successful:uploads/' . $filename);
}
?>