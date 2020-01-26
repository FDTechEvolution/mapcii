<?php

namespace App\Controller;

use App\Controller\AppController;
use Cake\Event\Event;
/**
 * Myassets Controller
 *
 *
 * @method \App\Model\Entity\Myasset[]|\Cake\Datasource\ResultSetInterface paginate($object = null, array $settings = [])
 */
class MyassetsController extends AppController {

 
    public function beforeFilter(Event $event) {
        parent::beforeFilter($event);
        
        if(is_null($this->getRequest()->getSession()->read('Authen.User'))){
            $this->redirect(['controller'=>'login']);
        }
    }
    
    public function index() {
        $user_id = $this->MyAuthen->getUserId();
        
        $this->set(compact('user_id'));
    }
    
    public function add(){
        $user_id = $this->MyAuthen->getUserId();
        
        $this->set(compact('user_id'));
    }
    
    public function update(){
        $asset_id = $this->request->getQuery('id');
        $user_id = $this->MyAuthen->getUserId();
        
        if(is_null($asset_id) || $asset_id == ''){
            return $this->redirect(['action'=>'index']);
        }
        
        
        
        $this->set(compact('user_id','asset_id'));
    }

    
}
