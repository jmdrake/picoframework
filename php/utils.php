<?php
/*
 * PHP utility functions developed for the Godigio project
 */

function after($input, $tag) {
    $taglen = strlen($tag);
    $startpos = strpos($input, $tag) + $taglen;
    return substr($input, $startpos, strlen($input) - $taglen);
}

function before($input, $tag) {    
    return strstr($input, $tag, true);
}

function splitstr($s, $ch){
    $token = strtok($s, $ch);
    $i = 0;
    while($token !== false) {
        $fields[$i] = ltrim(rtrim($token));
        $token = strtok($ch);
        $i++;
    }
    return $fields;
}

?>