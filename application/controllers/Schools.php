<?php

class Schools extends CI_Controller {
    public function __construct() {
        parent::__construct ();
        $this->load->model ( 'schools_model', '', TRUE );
    }

    // access
    // index.php/projects/view_projects
    public function view_schools(){
        $data ['rows'] = $this->schools_model->get_all();
        print json_encode($data);
    }


}
?>