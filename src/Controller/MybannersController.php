<?php
namespace App\Controller;

use App\Controller\AppController;

/**
 * Mybanners Controller
 *
 *
 * @method \App\Model\Entity\Mybanner[]|\Cake\Datasource\ResultSetInterface paginate($object = null, array $settings = [])
 */
class MybannersController extends AppController
{

    /**
     * Index method
     *
     * @return \Cake\Http\Response|void
     */
    public function index()
    {
        
    }

    /**
     * View method
     *
     * @param string|null $id Mybanner id.
     * @return \Cake\Http\Response|void
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function view($id = null)
    {
        $mybanner = $this->Mybanners->get($id, [
            'contain' => []
        ]);

        $this->set('mybanner', $mybanner);
    }

    /**
     * Add method
     *
     * @return \Cake\Http\Response|null Redirects on successful add, renders view otherwise.
     */
    public function add()
    {
        
    }

    /**
     * Edit method
     *
     * @param string|null $id Mybanner id.
     * @return \Cake\Http\Response|null Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function edit($id = null)
    {
        $mybanner = $this->Mybanners->get($id, [
            'contain' => []
        ]);
        if ($this->request->is(['patch', 'post', 'put'])) {
            $mybanner = $this->Mybanners->patchEntity($mybanner, $this->request->getData());
            if ($this->Mybanners->save($mybanner)) {
                $this->Flash->success(__('The mybanner has been saved.'));

                return $this->redirect(['action' => 'index']);
            }
            $this->Flash->error(__('The mybanner could not be saved. Please, try again.'));
        }
        $this->set(compact('mybanner'));
    }

    /**
     * Delete method
     *
     * @param string|null $id Mybanner id.
     * @return \Cake\Http\Response|null Redirects to index.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function delete($id = null)
    {
        $this->request->allowMethod(['post', 'delete']);
        $mybanner = $this->Mybanners->get($id);
        if ($this->Mybanners->delete($mybanner)) {
            $this->Flash->success(__('The mybanner has been deleted.'));
        } else {
            $this->Flash->error(__('The mybanner could not be deleted. Please, try again.'));
        }

        return $this->redirect(['action' => 'index']);
    }
}
