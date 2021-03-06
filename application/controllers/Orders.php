<?php

class Orders extends CI_Controller {
    public function __construct() {
        parent::__construct ();
        $this->load->model ( 'orders_model', '', TRUE );
    }

    // access
    // index.php/projects/view_projects
    public function view_Orders(){
        $data ['rows'] = $this->orders_model->get_all();
        print json_encode($data);
    }
    
    public function view_by_users_id($users_id,$offset = 0, $limit = 0){
    	if ($limit <= 0) {
    		$MAX_RECORDS = 8; /* each request return 8 records at most */
    	} else {
    		$MAX_RECORDS = $limit;
    	}
    	$data ['rows'] = $this->orders_model->get_by_user_id ($users_id, $offset * $MAX_RECORDS, $MAX_RECORDS );
    	$data ['offset'] = $offset + 1;
    	print json_encode($data);
    }

	public function view_preorder_by_users_id($users_id,$offset = 0, $limit = 0){
    	if ($limit <= 0) {
    		$MAX_RECORDS = 8; /* each request return 8 records at most */
    	} else {
    		$MAX_RECORDS = $limit;
    	}
    	$data ['rows'] = $this->orders_model->get_preorder_by_user_id ($users_id, $offset * $MAX_RECORDS, $MAX_RECORDS );
    	$data ['offset'] = $offset + 1;
    	print json_encode($data);
    }
    
    public function update_preorder_quantity($orders_id, $quantity){
    	//TODO get session of users_id
    	
    	//TODO if($quantity == 0)
    	$data ['rows'] = $this->orders_model->update_quantity ($orders_id, $quantity);
    	if($data ['rows'] == 1) //affected_rows()
    		$data ['state'] = true;
    	else 
    		$data ['state'] = false;
    	print json_encode($data);
    }
    
    public function delete_preorder($orders_id){
    	//TODO get session of users_id
    	$data ['rows'] = $this->orders_model->delete_preorder ($orders_id);
    	if($data ['rows'] == 1) //affected_rows()
    		$data ['state'] = true;
    	else
    		$data ['state'] = false;
    	print json_encode($data);
    }
    
}
?>