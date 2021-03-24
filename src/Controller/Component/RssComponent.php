<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\Controller\Component;

use Cake\Controller\Component;
use Cake\Utility\Xml;
use Cake\ORM\TableRegistry;
/**
 * Description of UploadImageComponent
 *
 * @author sakorn.s
 * version 1.2
 */
class RssComponent extends Component {
    
    public $Contents = null;

    public function get($url) {
        $xmlobj = $this->get_xml_from_url($url);
        $xml = new \SimpleXMLElement($xmlobj);
        // $xml = (array)$xml;
        // $this->log($xml, 'debug');
   
        $rows = [];
        foreach ($xml->channel->item as $row) {
            $n = [
                'url' => (string)$row->link,
                'title' => (string)$row->title,
                'description' => (string)$row->description,
                'image' => (string)$row->enclosure->attributes()->url,
                'date' => (string)$row->pubDate,
               
            ];
            array_push($rows, $n);
        }
        return $rows;
    }

    private function get_xml_from_url($url){
        $ch = curl_init();
    
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13');
    
        $xmlstr = curl_exec($ch);
        curl_close($ch);
    
        return $xmlstr;
    }

   
    
}
