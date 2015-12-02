<?php
require "utils.php";
$sql = "SELECT Posts.id, Users.id AS userid, Users.image AS userimage, Users.name AS username, text, post_shared, Posts.image FROM Posts INNER JOIN USERS ON Posts.user = Users.id WHERE user = '3'";

echo $sql . "<br/>";

$fields = splitstr(before(after($sql, "SELECT"), "FROM"), ",");

for($i=0; $i<count($fields);$i++){
    if(strpos($fields[$i], " AS ")>0) {
        $asfield = after($fields[$i], " AS ");  
        $fields[$i] = $asfield;
        echo $fields[$i] . "<br/>";
    }            
}

?>

