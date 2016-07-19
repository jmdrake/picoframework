<?php
/*
 * File : updatePost.php
 * Input type: POST
 * Inputs: valText, valPostID, imgUpload
 * Outputs: Returns status of insertion or error information
 */

require "../php/config.php";
require "../php/mark_sql_post.php";
require "../php/querytojson.php";
$conn = open_connection();

$updatesql = mark_sql_post("UPDATE Posts SET text=[text], image=[image], audio=[audio], video=[video] WHERE id=[postid]");

$selsql = mark_sql_post("SELECT text, Posts.id AS postid, Users.id AS userid, userimage, Posts.image AS image, audio, video, tags 
FROM Posts INNER JOIN Users ON Posts.user = Users.id WHERE Posts.id = [postid]");

if ($conn->query($updatesql) === TRUE) {    
    echo querytojson($selsql, $conn);
} else {
    echo '{"error" : "' . $conn->error . '", "sql" : "' . $updatesql . '"}';  
}
$conn->close();
?>