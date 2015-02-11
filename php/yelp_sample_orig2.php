#!/usr/bin/php
<?php

ini_set('display_startup_errors',1);
ini_set('display_errors',1);
error_reporting(-1);

require_once('lib/OAuth.php');


$CONSUMER_KEY = 'N-vPXMSQJMdY7KYmEGq8kQ';
$CONSUMER_SECRET = 'RK-tCS0hK1c6YE9L44kPTC4LhD4';
$TOKEN = 'c7Ghj5t3GfO6QIta1XnKLMplNNzafEqV';
$TOKEN_SECRET = 'wj1kyy0HYqsZctpOL5w3k3Neo64';
$API_HOST = 'api.yelp.com';
$DEFAULT_TERM = 'dinner';
$DEFAULT_LOCATION = 'San Francisco, CA';
$SEARCH_LIMIT = 3;
$SEARCH_PATH = '/v2/search/';
$BUSINESS_PATH = '/v2/business/';

var_dump('in php');

function request($host, $path) {
    $unsigned_url = "http://" . $host . $path;
    $token = new OAuthToken($GLOBALS['TOKEN'], $GLOBALS['TOKEN_SECRET']);
    $consumer = new OAuthConsumer($GLOBALS['CONSUMER_KEY'], $GLOBALS['CONSUMER_SECRET']);
    $signature_method = new OAuthSignatureMethod_HMAC_SHA1();
    $oauthrequest = OAuthRequest::from_consumer_and_token(
        $consumer, 
        $token, 
        'GET', 
        $unsigned_url
    );
    
    $oauthrequest->sign_request($signature_method, $consumer, $token);
    
    $signed_url = $oauthrequest->to_url();
    
    $ch = curl_init($signed_url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    $data = curl_exec($ch);
    curl_close($ch);
    
    return $data;
}

// function search($term, $location) {
//     $url_params = array();
    
//     $url_params['term'] = $term ?: $GLOBALS['DEFAULT_TERM'];
//     $url_params['location'] = $location?: $GLOBALS['DEFAULT_LOCATION'];
//     $url_params['limit'] = $GLOBALS['SEARCH_LIMIT'];
//     $search_path = $GLOBALS['SEARCH_PATH'] . "?" . http_build_query($url_params);
    
//     return request($GLOBALS['API_HOST'], $search_path);
// }

// function get_business($business_id) {
//     $business_path = $GLOBALS['BUSINESS_PATH'] . $business_id;
    
//     return request($GLOBALS['API_HOST'], $business_path);
// }

// function query_api($term, $location) {     
//     $response = json_decode(search($term, $location));
//     $business_id = $response->businesses[0]->id;
    
//     print sprintf(
//         "%d businesses found, querying business info for the top result \"%s\"\n\n",         
//         count($response->businesses),
//         $business_id
//     );
    
//     $response = get_business($business_id);
    
//     print sprintf("Result for business \"%s\" found:\n", $business_id);
//     print "$response\n";
// }

$longopts  = array(
    "term::",
    "location::",
);
    
$options = getopt("", $longopts);
// $term = $options['term'] ?: '';
// $location = $options['location'] ?: '';
// query_api($term, $location);
?>