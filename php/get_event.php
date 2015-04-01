<?php
  /* Set params from request. */
  $username = isset($_GET['username']) ? $_GET['username'] : 'wwwmycityviewinfo';
  $password = isset($_GET['password']) ? $_GET['password'] : 'is567nd6xx8k7f';
  $point = isset($_GET['point']) ? $_GET['point'] : '-37.82,144.97';
  $radius = isset($_GET['radius']) ? $_GET['radius'] : 10;
  $start_date = isset($_GET['start_date']) ? $_GET['start_date'] : date('Y-m-d');
  $end_date = isset($_GET['end_date']) ? $_GET['end_date'] : date("Y-m-d", time()+86400);
  $url = 'http://api.eventfinda.com.au/v2/events.json?point=' . $point . '&radius=' . $radius . '&start_date=' . $start_date . '&end_date=' . $end_date;
  /* Query api */
  $process = curl_init($url);
  curl_setopt($process, CURLOPT_USERPWD, $username . ":" . $password);
  curl_setopt($process, CURLOPT_RETURNTRANSFER, TRUE);
  $return = curl_exec($process);
  $collection = json_decode($return);
  /*
   * Iterate over the events
   * Get all props
   * Push them into $events_aray
  */
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

    $sessions_array = json_decode(json_encode($sessions), true);
    foreach ($sessions_array as $key => $session) {
      if($key != '@attributes'){
        $session_cnt = count($session);
        if($session_cnt > 1) {
          for ($x = 0; $x < $session_cnt; $x++) {
            $date_time = $session[$x]['datetime_start'];
            $date_time = substr($date_time,0,10);
            if($start_date == $date_time) {
              $start_time = substr($session[$x]['datetime_start'], 10);
              $start_time = substr($start_time, 0, 6);
              $end_time = substr($session[$x]['datetime_end'], 10);
              $end_time = substr($end_time, 0, 6);
              $event_array['date_time'] = $start_date . ' @ ' . $start_time . ' to ' . $end_time;
            }
          }
        } else {
          $start_time = substr($session[0]['datetime_start'], 10);
          $start_time = substr($start_time, 0, 6);
          $end_time = substr($session[0]['datetime_end'], 10);
          $end_time = substr($end_time, 0, 6);
          $event_array['date_time'] = $start_date . ' @ ' . $start_time . ' to ' . $end_time;
        }
        
      }
    }
    /*
    * Add images
    * If there's more than one chose one randomly
    */
    $cnt = count($event->images->images);
    $cnt -= 1;
    if ($cnt > 0) {
      $num = rand(1, $cnt);
    } else {
      $num = 0;
    }
    $img_url = $event->images->images[$num]->transforms->transforms[2]->url;
    $event_array['img_url'] = $img_url;
    array_push($events_array,$event_array);

    /*
     * To see all images available
     * Iterate over the images collection of images
    foreach ($event->images->images as $image) {
      echo $image->id . "\n";
      // iterate over the transforms collection of transforms
      foreach ($image->transforms->transforms as $transform) {
        echo $transform->url . "\n";
      }
    }
    */
  }
  echo json_encode($events_array);
?>