<?php
/*
 * File : getNews.php
 * Input type: GET
 * Inputs: searchstr
 * Outputs: matches to search string
 */

require "../php/querytojson.php";
require "../php/config.php";
require "../php/mark_sql_get.php";

$conn = open_connection();
// $sql = mark_sql_get("SELECT id as postid, text, tags, image, video, audio FROM Posts WHERE MATCH(tags) AGAINST([tag] IN BOOLEAN MODE) LIMIT 0,3");
$sql = mark_sql_get(
"SELECT 
    Posts.id AS postid, 
    Users.id AS userid, 
    userimage, 
    Users.name AS username, 
    text, 
    tags,
    post_shared, 
    Posts.image AS image, 
    video,
    audio,
    (SELECT COUNT(*) FROM Likes WHERE post = Posts.id) AS likecount, 
    (SELECT COUNT(*) FROM Posts WHERE post_shared = Posts.id) AS sharecount, 
    (SELECT COUNT(*) FROM Comments WHERE post = Posts.id) AS commentcount, 
    Posts.id IN (SELECT post FROM Likes WHERE Likes.user = [currentuser]) AS liked,
    (SELECT Users.userimage FROM Posts INNER JOIN Users ON Posts.user = Users.id WHERE Posts.id = post_shared) AS shareuserimage,
    (SELECT Posts.text FROM Posts INNER JOIN Users ON Posts.user = Users.id WHERE Posts.id =post_shared) AS sharetext,
    (SELECT Posts.image FROM Posts INNER JOIN Users ON Posts.user = Users.id WHERE Posts.id =post_shared) AS shareimage, 
    (SELECT Posts.video FROM Posts INNER JOIN Users ON Posts.user = Users.id WHERE Posts.id =post_shared) AS sharevideo, 
    (SELECT Posts.audio FROM Posts INNER JOIN Users ON Posts.user = Users.id WHERE Posts.id =post_shared) AS shareaudio
FROM Posts INNER JOIN Users ON Posts.user = Users.id 
WHERE MATCH(tags) AGAINST([tag] IN BOOLEAN MODE) LIMIT 0,3");
// $sql = mark_sql_get("SELECT text, tags, image, video, audio FROM Posts WHERE tags LIKE(%[tag]%) LIMIT 0,3");
echo querytojson($sql, $conn);
// echo $sql;
$conn->close();
?>