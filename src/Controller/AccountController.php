<?php

namespace App\Controller;

use App\Controller\AppController;

/**
 * Account Controller
 *
 *
 * @method \App\Model\Entity\Account[]|\Cake\Datasource\ResultSetInterface paginate($object = null, array $settings = [])
 */
class AccountController extends AppController {

    /**
     * Index method
     *
     * @return \Cake\Http\Response|void
     */
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

    public function assetFav(){
        
    }
}
