<?php

namespace App\Controller\Component;

use Cake\Controller\Component;

class MyAuthenComponent extends Component {

    public function setAuthen($user) {
        $this->request->getSession()->write('Authen.isactive', 'Y');
        $this->request->getSession()->write('Authen.User', $user);
    }

    public function isLogin() {
        $isactive = $this->request->getSession()->read('Authen.isactive');
        if ($isactive == 'Y') {
            return true;
        }
        return false;
    }
    
    public function getUserId(){
        $user_id = $this->request->getSession()->read('Authen.User.id');
        return $user_id;
    }

}
