<?php
 // foreach ($_GET as $k => $v) {
 //   echo "$k = $v<br />";
 // }
  $sign = isset($_GET['sign']) ? $_GET['sign'] : 'virgo';
	$jsonurl = "http://widgets.fabulously40.com/horoscope.json?sign=" . $sign;
	$json = file_get_contents($jsonurl);
	echo json_encode($json);
?>