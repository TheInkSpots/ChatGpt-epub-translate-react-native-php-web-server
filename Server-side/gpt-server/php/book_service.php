<?php
require __DIR__ . '/vendor/autoload.php';
use HaoZiTeam\ChatGPT\V2 as ChatGPTV2;


class Book {
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
        if($string != null)
            return str_replace("'", "\'", $string);
        else
            return $string;
    }
    function insertBookDB ($data, $tableName, $uuid ,$path){
        //require_once 'db.php';
        //$server = '172.19.0.3';
        $server = 'mysql';
        $dbuser = 'root';
        $dbpassword = 'new_password';
        $dbname = 'gpttrans';

        $conn = new mysqli($server, $dbuser, $dbpassword, $dbname);
        if ($conn->connect_error) {
            die ('Database connection failed');
        }
     
        $sqlPartial = ' 0 ,';
        $curdate = date('Y-m-d H:i:s');
        if($data->filepath == null) $data->filepath = $path;
        foreach($data as $key => $val) {
            $val = $this->relpaceQuo($val);
            $data->$key = $val;

            if($val == null )
                $data->$key = 'null';
            else if($val ===  '1' || $val === '0')
                $data->$key = $val;
            else
                $data->$key = '\''.$val.'\'';
        }
        
        
        $sqlPartial = $sqlPartial." '$uuid' ,$data->filepath ,$data->lang ,$data->author ,$data->name ,$data->destription ,$data->matadata ,$data->orig_uuid ,now() ,$data->created_by ,$data->cate ,$data->public , $data->title";
        $sql = "INSERT INTO $tableName  VALUES  ($sqlPartial ) ";
        //echo $sql;
        try {
            //echo $sql;
        //    echo var_dump($data);

          // exit;
            $conn->query($sql);
            //$this->echoRespone('success','200',"row is inserted.");
           return true;
        } 
        catch (Exception $e) {
            $this->echoRespone('error','809',',SQL insert failed. exception  > '.$e->getMessage());
            exit;
        }
    }
    function POST($parameters) {  // upload original book
        require_once 'epub.php';
        
        $data = json_decode(file_get_contents('php://input'));
        $file = base64_decode($data->base64Str);
        $uuid = uniqid("ori-",false);
        mkdir("/var/www/html/trans-book-py/bookshelf/ori/{$uuid}/", 0777, true);
        $filepath = "/var/www/html/trans-book-py/bookshelf/ori/{$uuid}/{$data->name}";
        file_put_contents($filepath,$file);
        $data = json_decode(file_get_contents('php://input'), false);
        
        try{
            $book = new Epub($filepath);
            $data->author =  array_values($book->Authors())[0];
            $data->title = $book->Title();
            //$img =  $book->Cover();
            //file_put_contents("/var/www/html/trans-book-py/bookshelf/ori/{$uuid}/cover.jpg",$img['data']);
            // echo base64_encode($img['data']);
        }catch (Exception $e){
            $error = $e->getMessage();
        }

        $table = $parameters[0];
        $path ="/var/www/html/trans-book-py/bookshelf/ori/{$uuid}/{$data->name}";
        
       
        $this->insertBookDB($data,$table,$uuid, $filepath);
        $this->echoRespone('success','200',"good book uploaded request");
        exit;
    }
    function GET($parameters) { // get book from bookshelf with uuid (read with diff lang in bookDertails) , send in base64
        $tableAndId = explode('(', $parameters[0]);
        $tableName = $tableAndId[0];
        $guid = str_replace(')','', $tableAndId[1]);
        $guid = str_replace(' ','', $guid);
        require_once 'db.php';

        $sql = "SELECT * FROM $tableName WHERE uuid = '$guid' ";
        try {
            $conn->query($sql);
            $rs = $conn->query($sql); // got it ori-6457fa0240d39
            $output = array();
            while ($row = $rs->fetch_assoc()) {
                $output[] = $row;
            }

            $book = file_get_contents($output[0]['filepath']);
            $base64Str = base64_encode($book);
            $base64 = array();
            $base64['base64Str'] = $base64Str;

            echo json_encode($base64);
            exit();

        }catch (Exception $e) {
            $this->echoRespone('error','804',',SQL failed. exception  > '.$e->getMessage());
        }
        

    }
    function PUT($parameters) { // translation and update db
        require_once 'db.php';
        if(str_contains($parameters[0],'(')){
            $tableAndId = explode('(', $parameters[0]);
            $tableName = $tableAndId[0];
            $guid = str_replace(')','', $tableAndId[1]);
            $guid = str_replace(' ','', $guid);// handle data injection of > OR 1=1 , to delete all rows.
            if($tableName == null){
                $this->echoRespone('error','801','SQL error Entity Name missing...');
                exit;
            }elseif(empty($guid)){
                $this->echoRespone('error','806','SQL error , GUID is missing... 123');
                exit;
            }
            $sql = "SELECT * FROM $tableName WHERE uuid = '$guid' ";
            try {
                $conn->query($sql);
                $rs = $conn->query($sql); // got it ori-6457fa0240d39
                $output = array();
                while ($row = $rs->fetch_assoc()) {
                    $output[] = $row;
                }
               
                $dataHttp = json_decode(file_get_contents('php://input'));
                
                $env_varJson = file_get_contents(__DIR__ . '/env/var.json');
                $env_varJson = json_decode($env_varJson);

                $orig_uuid = $guid;
                $oriuuid = $output[0]['uuid']; // the same

                $ori_filename = $output[0]['name'];
                $ori_book_title = $output[0]['title'];

                if(file_exists('script/translate.sh')) {
                    // shell_exec('rm -f script/translate.sh');
                    unlink('script/translate.sh');
                }
                
                $script = "python3 ./trans-book-py/make_book.py --book_name ./trans-book-py/bookshelf/ori/{$guid}/{$ori_filename} --openai_key ".$env_varJson->tokenv2." --test --translation_style \"color: #808080; font-style: italic;\" --translate-tags p,br --language \"{$dataHttp->tarLang}\" --prompt ./trans-book-py/prompt_cus.json";
                
                $scriptFile = fopen("script/translate.sh", "a") or die("error: cannot create file");
                fwrite($scriptFile, "#!/bin/bash\n");
                fwrite($scriptFile, $script."\n");
                fclose($scriptFile);

                chmod("script/translate.sh", 0750);
                $shell = 'script/translate.sh';
                $shell .= " > /dev/null 2>&1 &";
                shell_exec($shell);
                //echo $script;
               // exit;

                $ori_filename_title = str_replace(".epub", "", $ori_filename);
                $filename = "/var/www/html/trans-book-py/bookshelf/ori/{$guid}/{$ori_filename_title}_bilingual_". $dataHttp->tarLang .".epub";
                while (!file_exists($filename)) {
                   sleep(1);
                }
                 // insert translation bbook into db

                $newUuid = uniqid("tran-",false);

                $dataDB = new stdClass();

                $dataDB->uuid = $newUuid;
                $dataDB->filepath = $filename;
                $dataDB->lang = $dataHttp->tarLang;
                $dataDB->name = "{$ori_filename_title}_bilingual_". $dataHttp->tarLang .".epub";
                $dataDB->orig_uuid = $oriuuid;
                $dataDB->created_by = $dataHttp->createdBy;
                $dataDB->cate = "tempuscategory";

                $dataDB->author = null;
                $dataDB->destription = null;
                $dataDB->matadata = null;
                $dataDB->public = null;
                $dataDB->title = $ori_book_title;

                $this->insertBookDB($dataDB,$tableName,$newUuid , null);
                $this->echoRespone('success','200',"good request , book translated successfully");
                exit;
            } 
            catch (Exception $e) {
                $this->echoRespone('error','804',',SQL failed. exception  > '.$e->getMessage());
            }
        }else{
            $this->echoRespone('error','806','SQL error , GUID is missing... '. $parameters[0]);
            exit;
        }

        //$this->echoRespone('success','200',"good request , book translated successfully");
        exit;
    }
}