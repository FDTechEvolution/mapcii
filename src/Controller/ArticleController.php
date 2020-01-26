<?php

namespace App\Controller;

use App\Controller\AppController;

/**
 * Article Controller
 *
 *
 * @method \App\Model\Entity\Article[]|\Cake\Datasource\ResultSetInterface paginate($object = null, array $settings = [])
 */
class ArticleController extends AppController {
    
    public function index(){
        $this->loadComponent('Rss');
        $sanookNews = $this->Rss->get('http://rssfeeds.sanook.com/rss/feeds/sanook/home.review.xml');
        $bkkNews = $this->Rss->get('https://www.bangkokbiznews.com/rss/feed/economic.xml');
        $this->set(compact('sanookNews','bkkNews'));
    }
    
    public function read($id){
        $article = $this->RequestUrl->getRequest(SITE_API.'api-articles/index/'.$id);
        
        $this->set(compact('article'));
    }
    
}
