<?php
// These code snippets use an open-source library.
require_once 'unirest-php-master/lib/Unirest.php';
$response = Unirest::post("https://andruxnet-random-famous-quotes.p.mashape.com/cat=famous",
  array(
    "X-Mashape-Key" => "2ZSI72udG6mshBsov6QKtZmPZrscp1JrCYljsnmqaqmCWkpxiT",
    "Content-Type" => "application/x-www-form-urlencoded"
  )
);
$response = stripslashes($response->raw_body);
echo $response;
?>