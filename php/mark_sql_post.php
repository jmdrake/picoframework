<?php

function mark_sql_post($sql) {
    // $sql = "SELECT var1,var2 FROM emps WHERE name=[name] AND ssn=[ssn]";
    preg_match_all("/\[(\w+)]/", $sql, $params);
    $patterns = array();
    $replacements = array();
    for($i=0; $i<count($params); $i++) {
        $patterns[$i] = "/\\" . $params[0][$i] . "/";
        $replacements[$i] = "'" . $_POST[$params[1][$i]] . "'";
    }
    return preg_replace($patterns, $replacements, $sql);;
}
?>