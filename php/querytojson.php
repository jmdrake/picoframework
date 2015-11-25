<?php
require "utils.php";

function querytojson($sql, $conn) {
    $fields = splitstr(before(after($sql, "SELECT"), "FROM"), ",");
    $result = $conn->query($sql);
    $outp = "[";
    $numfields = count($fields);
    while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
        if ($outp != "[") {$outp .= ",";}
        $outp .= '{';
        for($i = 0; $i < $numfields; $i++) {
            $outp .= '"' . $fields[$i] . '":"' . $rs[$fields[$i]];
            if($i+1 < $numfields) $outp .= '",';
        }
        $outp .= '"}';
    }
    $outp .="]";
    return $outp;
}
?>

