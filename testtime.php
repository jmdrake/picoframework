<?php
$nextWeek = time() + (7 * 24 * 60 * 60);
                   // 7 days; 24 hours; 60 mins; 60 secs
echo 'Now:       '. date('Y-m-d') ."<br/>";
echo 'Next Week: '. date('Y-m-d', $nextWeek) ."<br/>";
// or using strtotime():
echo 'Next Week: '. date('Y-m-d', strtotime('+1 week')) ."<br/>";

$t = microtime() / 1000000;
echo "Microtime : " . $t . "<br/>";

echo date("l jS F \@\ g:i a", $t) . "<br/>";
echo "Time : " . time() . "<br/>";
echo "Ratio : " . (microtime() / time()) . "<br/>";
$ratio = floor(microtime() / time());
echo "Newtime " . microtime() / $ratio . "<br/>";
echo "Today " . date('Y-m-d', floor(microtime() / $ratio));
echo "Today for real" . date('Y-m-d', time());
?>
