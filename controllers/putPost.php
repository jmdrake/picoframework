<?php
/*
 * File : putPost.php
 * Input type: POST
 * Inputs: text, user
 * Outputs: Returns status of insertion or error information
 */

require "../php/config.php";
require "../php/mark_sql_post.php";
// require "../php/insertfrompost.php";
require "../php/querytojson.php";

$conn = open_connection();
$sql = mark_sql_post("INSERT INTO Posts(text, user, image, audio, video, tags) 
VALUES ([text], [currentuser], [image], [audio], [video], [tags])");

$results = $conn->query($sql);    

$selquery = "SELECT text, Posts.id AS postid, Users.id AS userid, userimage, Posts.image AS image, audio, video, tags 
FROM Posts INNER JOIN Users ON Posts.user = Users.id WHERE Posts.id = " . mysqli_insert_id($conn);

echo querytojson($selquery, $conn);
$conn->close();
?>