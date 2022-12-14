<?php
/*
 * File : getAudio.php
 * Input type: GET
 * Inputs: user
 * Outputs: user's audio tracks
 */

require "../php/querytojson.php";
require "../php/config.php";
require "../php/mark_sql_get.php";

$conn = open_connection();

$sql = mark_sql_get(
"SELECT id as postid, audio AS preview_audio_edit, video AS preview_video_edit, image AS preview_image_edit, text, tags FROM Posts
WHERE id = [postid]");

// echo $sql;
echo querytojson($sql, $conn);
$conn->close();
?>