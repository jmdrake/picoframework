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
$timestamp = time();
$sql = mark_sql_post("INSERT INTO Posts(text, user, image, audio, video, tags, timestamp) 
VALUES ([text], [currentuser], [image], [audio], [video], [tags], '" . $timestamp . "');");

if ($conn->query($sql) === TRUE) {
  $selquery = mark_sql_post("SELECT text, Posts.id AS postid, Users.id AS userid, userimage, Posts.image AS image, audio, video, tags 
  FROM Posts INNER JOIN Users ON Posts.user = Users.id WHERE Posts.user = [currentuser] AND Posts.timestamp = " . $timestamp);

  echo querytojson($selquery, $conn);
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
