<?php

namespace App\Controller;

use App\Controller\AppController;
use Cake\Event\Event;

/**
 * Services Controller
 *
 *
 * @method \App\Model\Entity\Service[]|\Cake\Datasource\ResultSetInterface paginate($object = null, array $settings = [])
 */
class ServicesController extends AppController {
    
    public $Message = ['code'=>200,'data'=>[]];

    public function beforeFilter(Event $event) {
        parent::beforeFilter($event);
        $this->loadComponent('RequestUrl');
        //$this->Auth->allow();
        $this->viewBuilder()->setLayout('ajax');
    }

    public function authen() {
        $type = $this->request->getQuery('type');
        $result = null;
        if (strtolower($type) == 'login') {
            if ($this->request->is(['post'])) {
                $postData = $this->request->getData();
                $result = $this->RequestUrl->getRequest(SITE_API . 'api-authen/login', $postData);
            }
        }
    }

    public function property() {
        $assetId = $this->request->getQuery('id');
        $action = $this->request->getQuery('action');
        $action = is_null($action) ? '' : strtolower($action);

        $data = ['id'=>$assetId];
        
        if ($action == 'favorite') {
            //$this->log($this->request->getSession()->read('Authen.User'),'debug');
            if ($this->request->getSession()->check('Authen.User')) {
                $user = $this->request->getSession()->read('Authen.User');
                //$this->log($user,'debug');
                $getData = [
                    'user_id'=>$user['id'],
                    'asset_id'=>$assetId
                ];
                $result = $this->RequestUrl->getRequest(SITE_API . 'api-users/asset-favorite', $getData);
            } else {
                $this->Message['code'] = 403;
            }
        }
        
        $this->Message['data']= $data;
        
        $json = json_encode($this->Message);
        $this->set([
            'json' => $json,
            '_serialize' => ['json']
        ]);
    }

}
