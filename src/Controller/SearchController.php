<?php

namespace App\Controller;

use App\Controller\AppController;

/**
 * Search Controller
 *
 *
 * @method \App\Model\Entity\Search[]|\Cake\Datasource\ResultSetInterface paginate($object = null, array $settings = [])
 */
class SearchController extends AppController {

    
    public function index() {
        $this->viewBuilder()->setLayout('full_frame');
        if($this->request->is(['post'])){
            $postData = $this->request->getData();
            //$this->log($postData,'debug');
            
            
            
        }
    }

}
