<?php
/*
 * File : resetPassword.php
 * Input type: POST
 * Inputs: username, password
 * Outputs: Returns currentuser
 */

require "../../php/querytojson.php";
require "../../php/config.php";
require "../../php/mark_sql_post.php";

$conn = open_connection();
$selectsql = mark_sql_post("SELECT user, token FROM Recovery WHERE token=[token]");

$result = $conn->query($selectsql);

if($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if($_POST["password"] != $_POST["passwordconfirm"]) {
        echo "Error: Passwords do not match";
    } else {
        $updatesql = "UPDATE Users SET password='" . $_POST["password"] . "' WHERE id=" . $rs["user"];
        if($conn->query($updatesql)) {
            $delsql = "DELETE FROM Recovery WHERE token=[token]";
            if($conn->query($delsql)) {
                echo "Ok";    
            } else {
                echo "Error: Unknown SQL eror ". $delsql;
            }         
        } else {
            echo "Error: Unknown SQL eror ". $updatesql;            
        }            
    }
} else {
    echo "Error: Recovery token not found";
}
$conn->close();
?>
