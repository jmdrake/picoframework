<?php
/*
 * File : 
 * Input type: GET
 * Inputs: 
 * Outputs: 
 */

require "../php/querytojson.php";
require "../php/config.php";
require "../php/mark_sql_get.php";

$conn = open_connection();

/*
$sql = mark_sql_get(
"SELECT 
    Posts.id AS postid, 
    Users.id AS userid, 
    Users.userimage AS imgUserImage, 
    Users.name AS lblUserName, 
    text AS lblText, post_shared AS valPostShared, 
    Posts.image AS imgPostImage, 
    tags,
    (SELECT COUNT(*) FROM Likes WHERE post = Posts.id) AS lblLikeCount, 
    (SELECT COUNT(*) FROM Posts WHERE post_shared = valPostID) AS lblShareCount, 
    (SELECT COUNT(*) FROM Comments WHERE post = Posts.id) AS lblCommentCount, 
    Posts.id IN (SELECT post FROM likes WHERE likes.user = [currentuser]) AS valLiked,
    (SELECT Users.userimage FROM Posts INNER JOIN Users ON Posts.user = Users.id WHERE Posts.id =valPostShared) AS imgShareUserImage,
    (SELECT Posts.text FROM Posts INNER JOIN Users ON Posts.user = Users.id WHERE Posts.id =valPostShared) AS lblShareText,
    (SELECT Posts.image FROM Posts INNER JOIN Users ON Posts.user = Users.id WHERE Posts.id =valPostShared) AS imgShareImage
FROM Posts INNER JOIN USERS ON Posts.user = Users.id 
WHERE Posts.user = [pageuser] 
OR Posts.user IN (SELECT fanof FROM FanMatrix WHERE fan = [pageuser]) 
ORDER BY valPostID DESC");*/

$sql = mark_sql_get("
SELECT 
    p.id AS postid, 
    Users.id AS userid, 
    userimage, 
    Users.name AS username, 
    p.text, 
    p.tags,
    p.post_shared, 
    p.image AS image, 
    p.video,
    p.audio,
    (SELECT COUNT(*) FROM Likes WHERE post = p.id) AS likecount, 
    (SELECT COUNT(*) FROM Comments WHERE post = p.id) AS commentcount, 
    p.id IN (SELECT post FROM Likes WHERE Likes.user = [currentuser]) AS liked,
	s.text AS shared_text,
	s.video AS shared_video,
	s.image AS shared_image,
	s.audio AS shared_audio,
	(SELECT COUNT(*) FROM Posts
         WHERE post_shared = p.id) AS sharecount
FROM Posts AS p 
LEFT JOIN Posts AS s
ON p.post_shared = s.id 
INNER JOIN Users ON p.user = Users.id
WHERE p.user = [pageuser];");

// echo $sql;
echo querytojson($sql, $conn);
$conn->close();
?>