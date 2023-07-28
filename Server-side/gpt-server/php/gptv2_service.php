<?php
require __DIR__ . '/vendor/autoload.php';
use HaoZiTeam\ChatGPT\V2 as ChatGPTV2;


class Gptv2 {
    function echoRespone($status, $code, $message){
        $output = array();
        $innerSmg = array();
        $innerSmg['code'] = $code;
        $innerSmg['message'] = $message;
        $output[$status] = $innerSmg;
        echo nl2br(json_encode($output));
        exit;
    }
    function relpaceQuo($string){
        return str_replace("'", "\'", $string);
    }
    
    function POST($parameters) { 
        $env_varJson = file_get_contents(__DIR__ . '/env/var.json');
        $env_varJson = json_decode($env_varJson);
        $data = json_decode(file_get_contents('php://input'));
        $chatGPT = new ChatGPTV2($env_varJson->tokenv2);
        $chatGPT->addMessage('Answer concisely', 'system');
        $answers = $chatGPT->ask($data->ask);
        $answer = '';
        $all = array();
        foreach ($answers as $item) {
           // print_r($item);
            $answer = $item['answer'];
            $all = $item;
        }
        echo Json_encode($all);
        //$this->echoRespone('success','200',$answer);
        exit;
    }
    function GET($parameters) {
        $env_varJson = file_get_contents(__DIR__ . '/env/var.json');
        $env_varJson = json_decode($env_varJson);
        $chatGPT = new ChatGPTV2($env_varJson->tokenv2);
        $answers = $chatGPT->ask("how are you?");
        $final = '';
        foreach ($answers as $item) {
            print_r($item);
            $final = $item['answer'];
        }
        $this->echoRespone('success','200',$final);
        exit;
    }
}