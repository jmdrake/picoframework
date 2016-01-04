<?php
function querytojson($sql, $conn) {
    $result = $conn->query($sql);
    $i = 0;
    while ($finfo = $result->fetch_field()) {
        $fields[$i] = $finfo->name;
        $i++;
    }

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

