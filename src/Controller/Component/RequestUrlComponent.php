<?php

namespace App\Controller\Component;

use Cake\Controller\Component;

class RequestUrlComponent extends Component {
    
    public function getRequest($url, $data = []) {
        if(is_array($data) >0){
            $url = $url.'?'.http_build_query($data);
        }
        // $this->log('requestURL - '.$url, 'debug');
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $json = curl_exec($ch);
        curl_close($ch);
        $resp = json_decode($json, true);
        return $resp;

        // $context = stream_context_create(array(
        //     'http' => array(
        //         'method' => 'GET',
        //         'header' => 'Content-type: application/x-www-form-urlencoded',
        //         //'content' => http_build_query($params),
        //         'timeout' => 60
        //     )
        // ));
        
        // $resp = file_get_contents($url, FALSE, $context);
        // // $this->log($data,'debug');
        // $resp = json_decode($resp,true);
        // return $resp;
    }

    public function postRequest($url, $data = []) {
        $params = http_build_query($data);

        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $json = curl_exec($ch);
        // $info = curl_getinfo($ch);
        // $this->log($info, 'debug');
        curl_close($ch);
        // $resp = json_decode($json, true);
        // $this->log($resp, 'debug');
        return $json;

        // $context = stream_context_create(array(
        //     'http' => array(
        //         'method' => 'POST',
        //         'header' => 'Content-type: application/x-www-form-urlencoded',
        //         'content' => http_build_query($params),
        //         'timeout' => 60
        //     )
        // ));

        // $resp = file_get_contents($url, FALSE, $context);

        // return $resp;
    }

}
