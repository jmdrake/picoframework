<?php
/*
 * File : mark_sql_get
 * Input type: GET
 * Inputs: Takes a SQL string and replaces paramaterized [variables] and replaces them with variables coming from GET input
 * Example: "SELECT var1,var2 FROM emps WHERE name=[name] AND ssn=[ssn]" becomes
 *          "SELECT var1,var2 FROM emps WHERE name='" . $_GET['name'] . "' AND ssn='" . $_GET['ssn' . "'"
 * Outputs: Returns status of deletion or error information
 */

function mark_sql_get($sql) {
    preg_match_all("/\[(\w+)]/", $sql, $params);
    $patterns = array();
    $replacements = array();
    for($i=0; $i<count($params[0]); $i++) {
        $patterns[$i] = "/\\" . $params[0][$i] . "/";

        if($params[1][$i] == "currentuser")
            $getval = $_COOKIE["currentuser"];
        else
            $getval = $_GET[$params[1][$i]];
                
        if($getval!="")
            if($getval[0] == "(")
                $replacements[$i] = $getval;
            else
                $replacements[$i] = "'" . $getval . "'";
        else
            $replacements[$i] = "NULL";
    }
    return preg_replace($patterns, $replacements, $sql);
}
?>