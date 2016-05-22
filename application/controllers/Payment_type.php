<?php

class Payment_type extends CI_Controller {
    public function __construct() {
        parent::__construct ();
        $this->load->model ( 'payment_type_model', '', TRUE );
    }

    // access
    // index.php/projects/view_all
    public function view_all(){
        $data ['rows'] = $this->payment_type_model->get_all();
        print json_encode($data);
    }

}
?>