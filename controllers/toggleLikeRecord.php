<?php
/*
 * File : toggleLikeRecord.php
 * Input type: POST
 * Inputs: postid, userid
 * Outputs: likecount
 */

require "../php/querytojson.php";
require "../php/config.php";
require "../php/mark_sql_post.php";

$conn = open_connection();

$selsql = mark_sql_post("SELECT id FROM Likes WHERE user = [userid] AND post = [postid]");
$result = $conn->query($selsql);

if($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    $delsql = mark_sql_post("DELETE FROM Likes WHERE user = [userid] AND post = [postid]");
    $result = $conn->query($delsql);    
} else {
    $insertsql = mark_sql_post("INSERT INTO Likes(user, post, like_dislike) VALUES ([userid], [postid], '1')");
    $result = $conn->query($insertsql);
}

$countsql = mark_sql_post("SELECT COUNT(*) AS likecount FROM Likes WHERE post = [postid]");
$result = $conn->query($countsql);

if($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    $likes = $rs["likecount"];    
    $updatesql = mark_sql_post("UPDATE posts SET likecount = " . $likes . " WHERE id = [postid]");        
    $conn->query($updatesql);
    echo $likes;
}

$conn->close();
?>