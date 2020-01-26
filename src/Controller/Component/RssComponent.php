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
        $xml = simplexml_load_file($url,'SimpleXMLElement',LIBXML_NOCDATA);
   
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

   
    
}
