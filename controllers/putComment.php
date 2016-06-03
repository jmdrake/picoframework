<?php
/*
 * File : putComment.php
 * Input type: POST
 * Inputs: text, user, post
 * Outputs: Returns status of insertion or error information
 */

require "../php/querytojson.php";
require "../php/config.php";
// require "../php/insertfrompost.php";
require "../php/mark_sql_post.php";
$conn = open_connection();

// $sql = "INSERT INTO Comments(text, user, post)";
// $results = insertfrompost($sql, $conn);

$sql = mark_sql_post("INSERT INTO Comments(text, user, post) VALUES([text], [currentuser], [postid])");

if ($conn->query($sql) === TRUE) {
    $sql2 = "SELECT text, post AS postid, Comments.id AS commentid, Users.userimage as image 
    FROM Comments INNER JOIN Users ON Comments.user = Users.ID WHERE Comments.id = " . mysqli_insert_id($conn);

    echo querytojson($sql2, $conn);
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>

