<?php

class Color extends CI_Controller {
    public function __construct() {
        parent::__construct ();
        $this->load->model ( 'Color_model', '', TRUE );
    }

    // access
    // index.php/color/view_color
    public function view_color(){
        $data ['rows'] = $this->Color_model->get_all();
        print json_encode($data);
    }


}
?>