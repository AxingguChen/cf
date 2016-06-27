<?php

class Project_state extends CI_Controller {
    public function __construct() {
        parent::__construct ();
        $this->load->model ( 'Project_state_model', '', TRUE );
    }

    // access
    // index.php/color/view_color
    public function view_state(){
        $data ['rows'] = $this->Project_state_model->get_all();
        print json_encode($data);
    }

    public function get_state_by_id($size_id){
    	$data ['rows'] = $this->Project_state_model->get_by_id($size_id);
    	print json_encode($data);
    }

}
?>