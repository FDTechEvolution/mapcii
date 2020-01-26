<?php

namespace App\Controller;

use App\Controller\AppController;

/**
 * Register Controller
 *
 *
 * @method \App\Model\Entity\Register[]|\Cake\Datasource\ResultSetInterface paginate($object = null, array $settings = [])
 */
class RegisterController extends AppController {

    /**
     * Index method
     *
     * @return \Cake\Http\Response|void
     */
    public function index() {
        $this->set('headTitle','สมัครสมาชิก');
    }
    
    public function rule(){
        $this->set('headTitle','ข้อตกลงและเงื่อนไขการใช้บริการเว็บไซต์');
    }

}
