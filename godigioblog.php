<?php

$dom = new DOMDocument;
$dom->loadHTMLfile("https://godigioblog.com/category/entertainment/");

$node = $dom->getElementsByTagName('header')->item(0);
$node->parentNode->removeChild($node);  

$node = $dom->getElementsByTagName('header')->item(0);
$node->parentNode->removeChild($node);  

echo $dom->saveHTML();
?>
