<?php

namespace App\Controller\Component;

use Cake\Controller\Component;

class PropertyComponent extends Component {

    public $components = ['RequestUrl'];

    public function searchAvaliable($params = []) {

        $urlParam = '';
        
        foreach ($params as $key => $item){
            $urlParam .= sprintf('&%s=%s',$key,$item);
        }
        
        
        $url = sprintf('%sapi-assets/avaliable-asset?%s',SITE_API,$urlParam);
        //$this->log($url,'debug');
        $assets = $this->RequestUrl->getRequest($url);
        $assets = isset($assets['list'])?$assets['list']:[];
        
        return $assets;
    }

}
