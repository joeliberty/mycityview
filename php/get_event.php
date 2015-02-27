<?php
  $username = isset($_GET['username']) ? $_GET['username'] : 'wwwmycityviewinfo';
  // var_dump('username: ' . $username);
  $password = isset($_GET['password']) ? $_GET['password'] : 'is567nd6xx8k7f';
  // var_dump('password: ' . $password);
  $point = isset($_GET['point']) ? $_GET['point'] : '-37.82,144.97';
  // var_dump('point: ' . $point);
  $radius = isset($_GET['radius']) ? $_GET['radius'] : 10;
  // var_dump('radius: ' + $radius);
  $start_date = isset($_GET['start_date']) ? $_GET['start_date'] : date('Y-m-d');
  // var_dump('start_date: ' . $start_date);
  $end_date = isset($_GET['end_date']) ? $_GET['end_date'] : date("Y-m-d", time()+86400);
  // var_dump('end_date: ' . $end_date);
  
  // foreach ($_GET as $k => $v) {
  //    var_dump($k . ' is' .  $v );
  // }

  // $url = 'http://api.eventfinda.com.au/v2/events.json?point=-37.8175,144.967&radius=10&start_date=2015-02-01&end_date=2015-02-03';

  $url = 'http://api.eventfinda.com.au/v2/events.json?point=' . $point . '&radius=' . $radius . '&start_date=' . $start_date . '&end_date=' . $end_date;

  // $url = 'http://api.eventfinda.com.au/v2/events.json?point=' . $point . '&radius=' . $radius;

  // $url = 'http://api.eventfinda.com.au/v2/events.json';

  $process = curl_init($url);
  curl_setopt($process, CURLOPT_USERPWD, $username . ":" . $password);
  curl_setopt($process, CURLOPT_RETURNTRANSFER, TRUE);
  $return = curl_exec($process);

  $collection = json_decode($return);

  // Iterate over the events and their image transforms echoing out the event
  // name and the image transform URLs
  $events_array = array();
  foreach ($collection->events as $event) {
    $event_array = array();
    // echo the name field
    // echo 'Name: ' . $event->name . "\n";
    $event_array['name'] = $event->name;
    // echo 'start: ' . $event->datetime_start . "\n";
    // echo 'end: ' . $event->datetime_end . "\n";
    // echo 'From - To: ' . $event->datetime_summary . "\n";
    $event_array['date_summary'] = $event->datetime_summary;
    // echo 'Address: ' . $event->address . "\n";
    $event_array['address'] = $event->address;
    $event_array['point'] = $event->point;
    $event_array['location'] = $event->location;
    $event_array['description'] = $event->description;

    // echo 'Rating: ' . $event->restrictions . "\n";
    $event_array['rating'] = $event->location_summary;
    // echo 'URL: ' . $event->url . "\n";
    $event_array['url'] = $event->url;
    $sessions = $event->sessions;
    // var_dump('count: ' . count($sessions));
    // echo 'url: ' . $event->web_sites->web_site->url . "\n";
    // foreach ($event->web_sites->web_sites as $website) {
    //   echo 'url: ' . $website->url . "\n";
    // }

    $sessions_array = json_decode(json_encode($sessions), true);
    foreach ($sessions_array as $key => $session) {
      // var_dump($key . ' is' .  $session );
      if($key != '@attributes'){
        // var_dump('session cnt: ' . count($session));
        $session_cnt = count($session);
        if($session_cnt > 1) {
          // $dates_array = new Array();
          for ($x = 0; $x < $session_cnt; $x++) {
            
            $date_time = $session[$x]['datetime_start'];
            $date_time = substr($date_time,0,10);
            // var_dump('date is: ' . $date_time);
            // $event_array['date_time'] = $start_date . ' : ' . $date_time;
            if($start_date == $date_time) {
              $start_time = substr($session[$x]['datetime_start'], 10);
              $start_time = substr($start_time, 0, 6);
              $end_time = substr($session[$x]['datetime_end'], 10);
              $end_time = substr($end_time, 0, 6);
              $event_array['date_time'] = $start_date . ' @ ' . $start_time . ' to ' . $end_time;
              // $event_array['date_time'] = 'found one';
            }
          }
          // var_dump('start: ' .  $session[$session_cnt - 1]['datetime_start'] );
          // $event_array['start'] = $session[$session_cnt - 1]['datetime_start'];
          // var_dump('end: ' .  $session[$session_cnt - 1]['datetime_end'] );
          // $event_array['end'] = $session[$session_cnt - 1]['datetime_end'];
        } else {
          $start_time = substr($session[0]['datetime_start'], 10);
          $start_time = substr($start_time, 0, 6);
          $end_time = substr($session[0]['datetime_end'], 10);
          $end_time = substr($end_time, 0, 6);
          $event_array['date_time'] = $start_date . ' @ ' . $start_time . ' to ' . $end_time;
        }
        
      }
    }
    array_push($events_array,$event_array);
    // $events_array['event'] = $event_array;
    //  for ($x = 0; $x <= count($array); $x++) {

    //     $id = $array[$x]->id;
    //    echo 'id is: ' . $id;
    // }

    // echo "\n";

    // echo $event->description . "\n";
    // iterate over the images collection of images
    // foreach ($event->images->images as $image) {
    //   echo $image->id . "\n";
    //   // iterate over the transforms collection of transforms
    //   foreach ($image->transforms->transforms as $transform) {
    //     echo $transform->url . "\n";
    //   }
    // }
  }
  echo json_encode($events_array);
?>