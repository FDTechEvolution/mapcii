<?php

namespace App\Controller;

use App\Controller\AppController;

/**
 * AccountActivate Controller
 *
 *
 * @method \App\Model\Entity\AccountActivate[]|\Cake\Datasource\ResultSetInterface paginate($object = null, array $settings = [])
 */
class AccountActivateController extends AppController {

    public function index() {
        $email = $this->request->getQuery('email');
        $code = $this->request->getQuery('code');
        
        $url = sprintf('%sapi-authen/account-activate?email=%s&code=%s',SITE_API,$email,$code);
        //$this->log($url,'debug');
        $this->RequestUrl->getRequest($url);
        
        return $this->redirect(['controller'=>'login']);
    }
    
    

}
