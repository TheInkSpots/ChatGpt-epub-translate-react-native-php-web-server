<?php
//$server = '172.26.0.3';
//echo 'here';
$server = 'mysql';
$dbuser = 'root';
$dbpassword = 'new_password';
$dbname = 'gpttrans';
try{
    $conn = new mysqli($server, $dbuser, $dbpassword, $dbname);
}
catch(e){ 
    echo "Error: " . $e->getMessage();
    //echo e;
    exit;
    die (e);

}
if ($conn->connect_error) {
    die ('Database connection failed');
}