<?php
$upLoadOk = 1;
$target_dir = "uploads/";
$target_file = $target_dir . basename($_FILES["file"]["name"]);
$filename = $_REQUEST["name"];

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