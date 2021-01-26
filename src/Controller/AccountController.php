<?php

namespace App\Controller;

use App\Controller\AppController;
use Cake\Event\Event;

/**
 * Account Controller
 *
 *
 * @method \App\Model\Entity\Account[]|\Cake\Datasource\ResultSetInterface paginate($object = null, array $settings = [])
 */
class AccountController extends AppController {

    public function beforeFilter(Event $event) {
        parent::beforeFilter($event);
        
        if(is_null($this->getRequest()->getSession()->read('Authen.User'))){
            $this->redirect(['controller'=>'login']);
        }
    }

    public function index() {
        
    }

    public function update(){
        $user_id = $this->MyAuthen->getUserId();
        
        $this->set(compact('user_id'));
    }
    
    public function changePassword(){
        
    }
    
    public function package(){
        
    }

    public function history() {
        
    }

    public function assetFav(){
        
    }
}
