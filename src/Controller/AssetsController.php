<?php

namespace App\Controller;

use App\Controller\AppController;
use Cake\Event\Event;
use Cake\ORM\TableRegistry;
/**
 * Assets Controller
 *
 *
 * @method \App\Model\Entity\Asset[]|\Cake\Datasource\ResultSetInterface paginate($object = null, array $settings = [])
 */
class AssetsController extends AppController {
    
    public function beforeFilter(Event $event) {
        parent::beforeFilter($event);
         $this->loadComponent('RequestUrl');
    }
    
    public function index(){
        $issales = $this->request->getQuery('issales');
        
        
        $assets = $this->RequestUrl->getRequest(SITE_API.'api-assets/avaliable-asset?issales=Y');
        $assets = isset($assets['list'])?$assets['list']:[];
        
         $this->set(compact('assets'));
    }
    
   

    public function listview(){
        $type = $this->request->getQuery('type');
        $asset_type_id = $this->request->getQuery('id');
        $assets = $this->RequestUrl->getRequest(SITE_API.'api-assets/avaliable-asset?type='.$asset_type_id);
        $assets = isset($assets['list'])?$assets['list']:[];
        $this->set(compact('assets','asset_type_id'));
    }
    
    public function view(){
       
        $id = $this->request->getQuery('id');
        
        $asset = $this->RequestUrl->getRequest(SITE_API.'api-assets/asset?id='.$id);
        $asset =$asset['detail'];
        $this->set(compact('asset'));
    }
}
