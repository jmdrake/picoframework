<?php
$timestamp = time()+date("Z");
echo gmdate("Y_m_d_H_i_s",$timestamp) . "<br/>";
echo $timestamp . "<br/>";
echo md5(microtime());
?>