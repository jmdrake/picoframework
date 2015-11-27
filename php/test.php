<?php

function mark_sql_get($sql) {
    preg_match_all("/\[(\w+)]/", $sql, $params);
    $patterns = array();
    $replacements = array();
    for($i=0; $i<count($params[0]); $i++) {
        $patterns[$i] = "/\\" . $params[0][$i] . "/";
        $replacements[$i] = "'" . $_GET[$params[1][$i]] . "'";
    }
    return preg_replace($patterns, $replacements, $sql);
}

$sql = "SELECT * FROM FanMatrix WHERE fan = [fan]";

echo mark_sql_get($sql);
?>