<?php

namespace App\Controller;

use App\Controller\AppController;

/**
 * Logout Controller
 *
 *
 * @method \App\Model\Entity\Logout[]|\Cake\Datasource\ResultSetInterface paginate($object = null, array $settings = [])
 */
class LogoutController extends AppController {

    public function index() {
        $this->request->getSession()->destroy();
        $this->request->getSession()->write('Authen.isactive','N');
        //return $this->redirect(['controller'=>'home']);
    }

}
