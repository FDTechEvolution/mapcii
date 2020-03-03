<?php

namespace App\Controller;

use App\Controller\AppController;

/**
 * Advertisements Controller
 *
 *
 * @method \App\Model\Entity\Advertisement[]|\Cake\Datasource\ResultSetInterface paginate($object = null, array $settings = [])
 */
class AdvertisementsController extends AppController {

    public function package() {
        $packageId = $this->request->getQuery('id');
        if (!is_null($packageId)) {
            
        }
    }

    public function packageNew() {
        
    }

    public function packageBA() {
        $this->set('headTitle','ค่าบริการลงโฆษณา Banner A');
    }

    public function packageBB() {
        $this->set('headTitle','ค่าบริการลงโฆษณา Banner B');
    }

    public function packageBC() {
        $this->set('headTitle','ค่าบริการลงโฆษณา Banner C');
    }

    public function packagePayment() {
        $this->set('headTitle','แจ้งชำระเงินค่าบริการลงโฆษณา');
        
        if(is_null($this->getRequest()->getSession()->read('Authen.User'))){
            $this->redirect(['controller'=>'login']);
        }
    }

}
