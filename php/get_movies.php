    <?php
/**
 * Google Showtime grabber
 * 
 * This file will grab the last showtimes of theatres nearby your zipcode.
 * Please make the URL your own! You can also add parameters to this URL: 
 * &date=0|1|2|3 => today|1 day|2 days|etc.. 
 * &start=10 gets the second page etc...
 * 
 * Please download the latest version of simple_html_dom.php on sourceForge:
 * http://sourceforge.net/projects/simplehtmldom/files/
 * 
 * @author Bas van Dorst <info@basvandorst.nl>
 * @version 0.1 
 * @package GoogleShowtime
 *
 * @modifyed by stephen byrne <gold.mine.labs@gmail.com>
 * @GoldMinelabs.com 
 */

require_once('simple_html_dom.php');

$city = isset($_GET['city']) ? $_GET['city'] : 'melbourne';
$curl = curl_init(); 
curl_setopt($curl, CURLOPT_URL, 'http://www.google.ie/movies?near=' . $city);  
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);  
curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, 10);  
$str = curl_exec($curl);  
curl_close($curl);  

$html = str_get_html($str);

$theaters_array = array();
foreach($html->find('#movie_results .theater') as $div) {
    $theater_array = array();
    // $value = $div->find('h2 a',0)->innertext;
    $value = $div->find('h2 a',0)->innertext;
    $theater_array['name'] = $value;
    $full_address = $div->find('.info', 0)->innertext;
    $theater_array['full_address'] = $full_address;
    $index = strpos($full_address, ',');
    $address = substr($full_address, 0, $index);
    $theater_array['address'] = $address;
    $char1 = strpos($full_address, '-');
    $phone = substr($full_address, $char1);
    $char2 = strpos($phone, '<a');
    $phone = substr($phone, 0, $char2);
    $theater_array['phone'] = $phone;

    $movies_array = array();
    foreach($div->find('.movie') as $movie) {
        // Get movie name
        $movie_array = array();
        $name = $movie->find('.name a',0)->innertext;
        $movie_array['name'] = $name;
        // Get movie times
        $time = $movie->find('.times',0)->innertext;
        $movie_array['times'] = (strip_tags($time));
        // Get movie info
        $info = $movie->find('.info',0)->innertext;
        // Get movie length and rating
        $chr_pos = strpos($info, '<a');
        $str = substr($info, 0, $chr_pos);
        $pieces = explode("-", $str);
        $movie_len = $pieces[0];
        $movie_array['howlong'] = $movie_len;
        $movie_rate = $pieces[1];
        $movie_array['rating'] = $movie_rate;
        $movie_type = $pieces[2];
        $movie_array['type'] = $movie_type;
        // Get movie trailer url
        $chr_pos = strpos($info, 'http');
        $trailer_url = substr($info,$chr_pos);
        // var_dump(urldecode($trailer_url));
        $chr_pos = strpos($trailer_url, '&');
        $trailer_url = substr($trailer_url, 0, $chr_pos);
        $movie_array['trailer'] = urldecode($trailer_url);

        array_push($movies_array,$movie_array);
    }
    $theater_array['movies'] = $movies_array;

    // array_push($theater_array,$movies_array);
// var_dump($theater_array); exit;
    array_push($theaters_array,$theater_array);
}
// $params_str = implode(",", $theater_array);
// var_dump($params_str);
$data = json_encode($theaters_array);
// var_dump($data);
echo $data;


// print '<pre>';
// foreach($html->find('#movie_results .theater') as $div) {
//     // print theater and address info
//     print "Theate:  ".$div->find('h2 a',0)->innertext."\n";
//     //print "Address: ". $div->find('.info',0)->innertext."\n";

//     // print all the movies with showtimes
//     foreach($div->find('.movie') as $movie) {
//         print "Movie:    ".$movie->find('.name a',0)->innertext.'<br />';
//         print "Time:    ".$movie->find('.times',0)->innertext.'<br />';
//     }
//     print "\n\n";
// }

// clean up memory
$html->clear();
?>