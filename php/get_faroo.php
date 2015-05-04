<?php
 // foreach ($_GET as $k => $v) {
 //   echo "$k = $v<br />";
 // }
  
  // $now = date('Y-m-d');
  // $start_date = isset($_GET['start_date']) ? $_GET['start_date'] : $now;
  // $end_date = isset($_GET['end_date']) ? $_GET['end_date'] : $now;
  // $section = isset($_GET['grp']) ? $_GET['grp'] : false;
  $start = isset($_GET['start']) ? $_GET['start'] : 1;
  $query = isset($_GET['query']) ? $_GET['query'] : false;
  if($query == 'world') { $query = ''; }

  // $jsonurl = "http://content.guardianapis.com/search?from-date=" . $start_date . "&to-date=" . $end_date . "&page=" . $page . "&show-elements=all&api-key=933vwbedch8tdrmza937yfqs";
  // if($section) {
  //   $jsonurl .= "&section=" . $section;
  // }
  // $jsonurl .= ($section) ? "&section=" . $section : '';
  // $jsonurl .= ($query) ? "&q=" . $query : '';

// $jsonurl = "http://www.faroo.com/api?&start=1&length=10&l=en&src=news&i=false&f=json&key=CL-BL5YBNHYpMwJ3rnE2jg-tZ4A_";

  $jsonurl = "http://www.faroo.com/api?length=10&l=en&src=news&i=false&f=json&key=CL-BL5YBNHYpMwJ3rnE2jg-tZ4A_";
  $jsonurl .= ($query) ? "&q=" . $query : '';
  $jsonurl .= "&start=" . $start;
  $json = file_get_contents($jsonurl);
  echo $json;
  // echo json_encode($json);
?>
