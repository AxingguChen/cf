<?php

class Size extends CI_Controller {
    public function __construct() {
        parent::__construct ();
        $this->load->model ( 'Size_model', '', TRUE );
    }

    // access
    // index.php/color/view_color
    public function view_size(){
        $data ['rows'] = $this->Size_model->get_all();
        print json_encode($data);
    }

    public function get_size_by_id($size_id){
    	$data ['rows'] = $this->Size_model->get_by_id($size_id);
    	print json_encode($data);
    }

}
?>