<?php
 header("Access-Control-Allow-Origin: *");
 header("Access-Control-Allow-Headers: *");
 header("Access-Control-Allow-Methods: *");
 class Controller { // console : { php -s 0.0.0.0:8081 index.php } to open loacal server.
    private $pathInfo;
    private $urlSegments;

    function echoError($code, $message){
        $output = array();
        $innerSmg = array();
        $innerSmg['code'] = $code;
        $innerSmg['message'] = $message;
        $output['error'] = $innerSmg;
        echo json_encode($output);
        exit;
    }

    function __construct() {
       // var_dump($_SERVER); die;
        if (!isset($_SERVER['REQUEST_URI'])) {
            echo '{"Usage": "http://127.0.0.1:8081/{resource name}"}';
         //   exit;
        }
        $this->pathInfo = $_SERVER['REQUEST_URI']; //get after .com/ (parameter)
        $this->urlSegments = explode('/', $this->pathInfo); //split w/ '/'
        array_shift($this->urlSegments); // [0] = null, poped it.
        $service = array_shift($this->urlSegments); // get 1st segment
        $service = lcfirst($service);  // replace substring[0] to lowercase (useless)

        if($service === 'js'){
            $resourseName = array_shift($this->urlSegments);
            try{
                echo file_get_contents(__DIR__."/web/js/$resourseName".'');
            }
            catch( Exception $e){
                header("HTTP/1.1 500 Internal Server Error");
            }
        }
        else if($service === 'css'){
            $resourseName = array_shift($this->urlSegments);
            echo file_get_contents(__DIR__."/web/css/$resourseName".'');
        }
        else if($service === 'jss'){
            $resourseName = array_shift($this->urlSegments);
            echo file_get_contents(__DIR__."/web/js/$resourseName".'');
        }
        else if($service === 'images'){
            $resourseName = array_shift($this->urlSegments);
            echo file_get_contents(__DIR__."/web/images/$resourseName".'');
        }
        else if($service === 'phot'){
            $resourseName = array_shift($this->urlSegments);
            echo file_get_contents(__DIR__."/photo/$resourseName".'.jpg');
        }
        else if ($service === 'gpt'){
            $serviceClassName = ucfirst($service);  
            $serviceFileName = $service.'_service'.'.php';  
            if (file_exists($serviceFileName)) {
                require_once $serviceFileName; 
                $provider = new $serviceClassName; 
                $httpMETHOD = $_SERVER['REQUEST_METHOD']; 
                $provider->$httpMETHOD($this->urlSegments); 
            } else {    
                $this->echoError('404',"Sites '$service' not found");
                exit;
            }
        }
        else if ($service === 'gptv2'){
            $serviceClassName = ucfirst($service);  
            $serviceFileName = $service.'_service'.'.php';  
            if (file_exists($serviceFileName)) {
                require_once $serviceFileName; 
                $provider = new $serviceClassName; 
                $httpMETHOD = $_SERVER['REQUEST_METHOD']; 
                $provider->$httpMETHOD($this->urlSegments); 
            } else {    
                $this->echoError('404',"Sites '$service' not found");
                exit;
            }
        }else if ($service === 'book'){
            $serviceClassName = ucfirst($service);  
            $serviceFileName = $service.'_service'.'.php';  
            if (file_exists($serviceFileName)) {
                require_once $serviceFileName; 
                $provider = new $serviceClassName; 
                $httpMETHOD = $_SERVER['REQUEST_METHOD']; 
                $provider->$httpMETHOD($this->urlSegments); 
            } else {    
                $this->echoError('404',"Sites '$service' not found");
                exit;
            }
        }
        else if($service === 'api'){
            $serviceClassName = ucfirst($service);  // replace substring[0] to uppercase (class name)
            $serviceFileName = $service.'_service'.'.php';  // append '_service' to prevent heack information;
            if (file_exists($serviceFileName)) {
                require_once $serviceFileName; // include api_service.php here
                $provider = new $serviceClassName; // new a Class of .php (Api myClass = new Api;)
                $httpMETHOD = $_SERVER['REQUEST_METHOD']; // get what is the CURD in the header of request 
                $provider->$httpMETHOD($this->urlSegments); // = call Api.GET(<segment.after./api/>)
            } else {    
                $this->echoError('404',"Sites '$service' not found");
                exit;
            }

        }else{ // for web html
            echo "error";
            return;
            $CurSites = $service;
            //require_once $CurSites.'.html';
            //return \File::get(public_path() . "web/$CurSites.html");       
            echo file_get_contents(__DIR__."/web/$CurSites.html");
            
        } 
    }
 }

 $controller = new Controller();