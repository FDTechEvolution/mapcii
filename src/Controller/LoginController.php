<?php

namespace App\Controller;

use App\Controller\AppController;

/**
 * Login Controller
 *
 *
 * @method \App\Model\Entity\Login[]|\Cake\Datasource\ResultSetInterface paginate($object = null, array $settings = [])
 */
class LoginController extends AppController {

    public function index() {
        if($this->MyAuthen->isLogin()){
            return $this->redirect(['controller'=>'home']);
        }
        
        if($this->request->is(['post'])){
            $this->loadComponent('RequestUrl');
            $postData = $this->request->getData();
            // $this->log($postData, 'debug');
            
            $res = $this->RequestUrl->postRequest(SITE_API.'api-accesses/verify',$postData);
            $res = json_decode($res,true);
            // $this->log($res,'debug');
            if($res['status'] == 200){
                $this->MyAuthen->setAuthen($res['access']['user']);
                return $this->redirect(['controller'=>'home']);
            }else{
                $this->log($res, 'debug');
            }
        }
        
        $this->set('headTitle','เข้าสู่ระบบ');
    }
    
    public function facebook(){
        if($this->request->is(['post'])){
            $postData = $this->request->getData();
            $facebookId = $postData['id'];
            $facebookName = $postData['name'];
        }
    }

}
