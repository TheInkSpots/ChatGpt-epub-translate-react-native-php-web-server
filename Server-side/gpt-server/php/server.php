<?php
 header("Access-Control-Allow-Origin: *");
/**
 * Laravel - A PHP Framework For Web Artisans
 * php -S 127.0.0.1:8000 server.php
 *
 * @package  Laravel
 * @author   Taylor Otwell <taylor@laravel.com>
 */

$uri = urldecode(
    parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH)
);

function dd($obj, $json=true){
    if($json){
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($obj);
    } else {
        var_dump($obj);
    }
    die();
}

// This file allows us to emulate Apache's "mod_rewrite" functionality from the
// built-in PHP web server. This provides a convenient way to test a Laravel
// application without having installed a "real" web server software here.
if ($uri !== '/' && file_exists(getcwd().$uri)) {
    return false;
} else if ($uri !== '/') {
    $_GET['_route_'] = ltrim($uri, '/');
}

require_once getcwd().'/index.php';