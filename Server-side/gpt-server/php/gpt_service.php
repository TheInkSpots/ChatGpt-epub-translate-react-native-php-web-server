<?php
require __DIR__ . '/vendor/autoload.php';
use HaoZiTeam\ChatGPT\V1 as ChatGPTV1;


class Gpt {

    
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
    
    function POST($parameters) {   // $chatGPT = new ChatGPTV1('https://chat.openai.com/backend-api/');
        $env_varJson = file_get_contents(__DIR__ . '/env/var.json');
        $env_varJson = json_decode($env_varJson);
      
        $chatGPT = new ChatGPTV1('https://bypass.churchless.tech/');
        //$chatGPT->addAccount($env_varJson->token);
        $chatGPT->addAccount('eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1UaEVOVUpHTkVNMVFURTRNMEZCTWpkQ05UZzVNRFUxUlRVd1FVSkRNRU13UmtGRVFrRXpSZyJ9.eyJodHRwczovL2FwaS5vcGVuYWkuY29tL3Byb2ZpbGUiOnsiZW1haWwiOiJxdXZveXBAbWFpbHRvLnBsdXMiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZX0sImh0dHBzOi8vYXBpLm9wZW5haS5jb20vYXV0aCI6eyJ1c2VyX2lkIjoidXNlci0wN09HeUVYaVJESXZVdEI4ZFFZUXZmc2oifSwiaXNzIjoiaHR0cHM6Ly9hdXRoMC5vcGVuYWkuY29tLyIsInN1YiI6ImF1dGgwfDYzOTMzYjgxNDY2MzRlZDNjNzg0NWMzZSIsImF1ZCI6WyJodHRwczovL2FwaS5vcGVuYWkuY29tL3YxIiwiaHR0cHM6Ly9vcGVuYWkub3BlbmFpLmF1dGgwYXBwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2ODE4MDEzODcsImV4cCI6MTY4MzAxMDk4NywiYXpwIjoiVGRKSWNiZTE2V29USHROOTVueXl3aDVFNHlPbzZJdEciLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIG1vZGVsLnJlYWQgbW9kZWwucmVxdWVzdCBvcmdhbml6YXRpb24ucmVhZCBvZmZsaW5lX2FjY2VzcyJ9.ST6TiiSbsRbU2zlBaFGOg0ZZEXDR8-YlDKkz6BskuZVG6D6K9KlNXG65zWB9zL4EDX9msfl6DDFkBM9aY_i1hMcrK7uRls6XixB7DX_hA3Q1uN7VgJJzx6BQdDS65t0kAVdgj7VC2nn-4MdnXdRWv5l_SJ5E9arF3O6qw4l_39Fw2NWisje2x1LtMj9D7u-sFqdjW7_5BWAZmiUIGL417J2iOrR0MmptGgRY1I_pTC3crdcryp37snaLLukPTUpjRyrwqZn7tUaj6hL7fwNA-2hlLgcaYyBj5oruFzW7p9R0_cGOerZd52vN6YztSJuboWHjN5DF8B8UP60XccxeHQ');
        $data = json_decode(file_get_contents('php://input'));
        //echo $data->ask,$env_varJson->conversationid, $env_varJson->parentid;
        $answers = $chatGPT->ask($data->ask,$env_varJson->conversationid, $env_varJson->parentid);
        // foreach ($answers as $item) {
        //     //print_r($item);
        //     echo $item;
        // }
      
        $this->echoRespone('success','200',"good");
        var_dump($answers);
        $env_varJson->parentid = $answers->parent_id;
        file_get_contents(__DIR__ . '/env/var.json', json_encode($env_varJson));
        exit;
    }
    function GET($parameters) {
        echo 'started';
        $env_varJson = file_get_contents(__DIR__ . '/env/var.json');
        $env_varJson = json_decode($env_varJson);
        echo 'started2';
        //$chatGPT = new ChatGPTV1('https://bypass.churchless.tech');
        //$chatGPT = new ChatGPTV1('https://chat.openai.com/backend-api/');
        $chatGPT = new ChatGPTV1();
        //$chatGPT->addAccount($env_varJson->token);
        $chatGPT->addAccount('eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1UaEVOVUpHTkVNMVFURTRNMEZCTWpkQ05UZzVNRFUxUlRVd1FVSkRNRU13UmtGRVFrRXpSZyJ9.eyJodHRwczovL2FwaS5vcGVuYWkuY29tL3Byb2ZpbGUiOnsiZW1haWwiOiJxdXZveXBAbWFpbHRvLnBsdXMiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZX0sImh0dHBzOi8vYXBpLm9wZW5haS5jb20vYXV0aCI6eyJ1c2VyX2lkIjoidXNlci0wN09HeUVYaVJESXZVdEI4ZFFZUXZmc2oifSwiaXNzIjoiaHR0cHM6Ly9hdXRoMC5vcGVuYWkuY29tLyIsInN1YiI6ImF1dGgwfDYzOTMzYjgxNDY2MzRlZDNjNzg0NWMzZSIsImF1ZCI6WyJodHRwczovL2FwaS5vcGVuYWkuY29tL3YxIiwiaHR0cHM6Ly9vcGVuYWkub3BlbmFpLmF1dGgwYXBwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2ODE4MDEzODcsImV4cCI6MTY4MzAxMDk4NywiYXpwIjoiVGRKSWNiZTE2V29USHROOTVueXl3aDVFNHlPbzZJdEciLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIG1vZGVsLnJlYWQgbW9kZWwucmVxdWVzdCBvcmdhbml6YXRpb24ucmVhZCBvZmZsaW5lX2FjY2VzcyJ9.ST6TiiSbsRbU2zlBaFGOg0ZZEXDR8-YlDKkz6BskuZVG6D6K9KlNXG65zWB9zL4EDX9msfl6DDFkBM9aY_i1hMcrK7uRls6XixB7DX_hA3Q1uN7VgJJzx6BQdDS65t0kAVdgj7VC2nn-4MdnXdRWv5l_SJ5E9arF3O6qw4l_39Fw2NWisje2x1LtMj9D7u-sFqdjW7_5BWAZmiUIGL417J2iOrR0MmptGgRY1I_pTC3crdcryp37snaLLukPTUpjRyrwqZn7tUaj6hL7fwNA-2hlLgcaYyBj5oruFzW7p9R0_cGOerZd52vN6YztSJuboWHjN5DF8B8UP60XccxeHQ');
        $answers = $chatGPT->ask('who are you?');
        //var_dump($answers);
        foreach ($answers as $item) {
            print_r($item);
             //$this->echoRespone('success','200',$item);
          // echo nl2br($item);
            //var_dump($item);
            
        }
        $this->echoRespone('success','200',$answers->answer);
        exit;
        //exit;
        //var_dump($answers);
        //$this->echoRespone('success','200',$answers->answer);
        exit;
    }
}