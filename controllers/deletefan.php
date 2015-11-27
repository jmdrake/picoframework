<?php
/*
 * File : deletefan.php
 * Input type: POST
 * Inputs: fan, fanof
 * Outputs: Returns status of deletion or error information
 */

require "../php/config.php";
require "../php/deletefrompost.php";

$conn = open_connection();
$sql = "DELETE FROM FanMatrix WHERE fan = [fan] AND fanof = [fanof]";
echo deletefrompost($sql, $conn);
$conn->close();
?>