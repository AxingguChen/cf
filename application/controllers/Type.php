<?php

class Type extends CI_Controller {
    public function __construct() {
        parent::__construct ();
        $this->load->model ( 'type_model', '', TRUE );
    }

    // access
    // index.php/projects/view_projects
    public function view_type(){
        $data ['rows'] = $this->type_model->get_all();
        print json_encode($data);
    }


}
?>