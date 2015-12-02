<?php
$prefix = $_GET['prefix'];
$date = date_create();
echo $prefix . date_timestamp_get($date);
?>



