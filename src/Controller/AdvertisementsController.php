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

}
