<?php

namespace App\Controller;

use App\Controller\AppController;
use Cake\Event\Event;
use Cake\ORM\TableRegistry;
use Cake\Routing\Router;

/**
 * Property Controller
 *
 *
 * @method \App\Model\Entity\Property[]|\Cake\Datasource\ResultSetInterface paginate($object = null, array $settings = [])
 */
class PropertyController extends AppController {

    public function beforeFilter(Event $event) {
        parent::beforeFilter($event);
        $this->loadComponent('RequestUrl');
        $this->loadComponent('Property');
    }

    public function index() {

        $params = $this->request->getQueryParams();
        //$url = Router::url(null, false);
        //$this->log($params, 'debug');
        //$urls = explode('?', str_replace('amp;', '', $url) );
        //$this->log($urls,'debug');
        $assets = $this->Property->searchAvaliable($params);

        $this->set(compact('assets'));
    }

    public function newProject() {
        $params = $this->request->getQueryParams();
        $assets = $this->Property->searchAvaliable($params);

        $startPrice = $this->GolbalObj->getStartPriceList();
        $endPrice = $this->GolbalObj->getEndPriceList();

        $this->set(compact('startPrice', 'endPrice'));

        $this->set(compact('assets'));
    }

    public function view() {

        $id = $this->request->getQuery('id');
        //$this->log($id, 'debug');
        $asset = $this->RequestUrl->getRequest(SITE_API . 'api-assets/asset?id=' . $id);

        $asset = $asset['detail'];
        $this->set(compact('asset'));
    }

}
