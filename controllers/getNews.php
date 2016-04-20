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
$sql = mark_sql_get("SELECT text, tags, image, video, audio FROM Posts WHERE MATCH(tags) AGAINST([tag] IN BOOLEAN MODE) LIMIT 0,3");
// $sql = mark_sql_get("SELECT text, tags, image, video, audio FROM Posts WHERE tags LIKE(%[tag]%) LIMIT 0,3");
echo querytojson($sql, $conn);
// echo $sql;
$conn->close();
?>