<?php
/* when requesting tweets with lat/lgn coord */
  // $point = isset($_GET['q']) ? $_GET['q'] : '-37.82,144.97,1';

  /* When requesting tweets with city name */
  $city_state_country = isset($_GET['q']) ? $_GET['q'] : '%23melbourne%20au';

  //This is all you need to configure.
  $app_key = 'aRsatvTkbItl653FCCMVJew1I';

  $app_token = '4ORiCZgTYJe8hCHOYBD3Gk6057M9hQwtbsphoIEitFaJeNxb9M';

  //These are our constants.
  $api_base = 'https://api.twitter.com/';
  $bearer_token_creds = base64_encode($app_key.':'.$app_token);

  //Get a bearer token.
  $opts = array(
    'http'=>array(
      'method' => 'POST',
      'header' => 'Authorization: Basic '.$bearer_token_creds."\r\n".
                 'Content-Type: application/x-www-form-urlencoded;charset=UTF-8',
      'content' => 'grant_type=client_credentials'
    )
  );

  $context = stream_context_create($opts);
  $json = file_get_contents($api_base.'oauth2/token',false,$context);

  $result = json_decode($json,true);

  if (!is_array($result) || !isset($result['token_type']) || !isset($result['access_token'])) {
    die("Something went wrong. This isn't a valid array: ".$json);
  }

  if ($result['token_type'] !== "bearer") {
    die("Invalid token type. Twitter says we need to make sure this is a bearer.");
  }


  /* Set oAuth bearer token  and request params */
  $bearer_token = $result['access_token'];
  $opts = array(
    'http'=>array(
      'method' => 'GET',
      'header' => 'Authorization: Bearer '.$bearer_token
    )
  );
  $context = stream_context_create($opts);

  /* Get tweets about the city */
  $url = "https://api.twitter.com/1.1/search/tweets.json?q=" . $city_state_country . "&count=100&result_type=recent";
  /* Get all tweets with in radius */
  // $url = "https://api.twitter.com/1.1/search/tweets.json?q=&geocode=" . $point . ",2km&lang=en&result_type=recent";

  $collection=json_decode(file_get_contents($url, false, $context));
  // echo json_encode($collection->statuses);
  // exit;
  $tweets_array = array();
  $media = false;
  foreach ($collection->statuses as $tweet) {
    $tweet_array = array();
    // echo 'icon: ' . $tweet->user->profile_image_url;
    $tweet_array['icon'] = $tweet->user->profile_image_url;
    // echo 'name: ' . $tweet->user->name . '<br/>';
    $tweet_array['name'] = $tweet->user->name;
    // echo 'screen_name: ' . $tweet->user->screen_name . '<br/>';
    $tweet_array['screen_name'] = $tweet->user->screen_name;
    // echo $tweet->text . '<br/>';
    $tweet_array['text'] = $tweet->text;
    // echo 'description: ' . $tweet->user->description . '<br/>';
    $tweet_array['description'] = $tweet->user->description;
    $media = ($tweet->entities->media) ? $tweet->entities->media : false;
    
    if($media) {
      foreach ($media as $image_url) {
        // var_dump($image_url->media_url);
        $tweet_array['image'] = $image_url->media_url;
      }
    }
    $tweet_array['url'] = $tweet->user->url;
    array_push($tweets_array,$tweet_array);
  }
  echo json_encode($tweets_array);
  // echo json_encode($collection);
?>