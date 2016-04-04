<?php
/**
 * Created by PhpStorm.
 * User: jackie
 * Date: 23/3/2016
 * Time: 12:26 AM
 */

class Projects extends CI_Controller {
    public function __construct() {
        parent::__construct ();
        $this->load->model ( 'projects_model', '', TRUE );;
 //       $this->load->model ( 'users_model', '', TRUE );
 //       $this->load->model ( 'acl_model', '', TRUE );
    }

    // access
    // index.php/projects/view_projects
    public function view_projects(){
        $data ['rows'] = $this->projects_model->get_all();
        print json_encode($data);
        //print_r($data);
    }

    // access
    // index.php/projects/view_project/1
    public function view_project($projects_id = 1){
        if ($projects_id > 0) {
            $data ['rows'] = $this->projects_model->get_by_id ( $projects_id );
        } else {
            $data ['rows'] = array ();
        }
        //$this->load->view ( 'project_view', $data );
        print json_encode($data);
        //print_r($data);
    }

    // access
    // index.php/projects/view_project_by_users_id
    public function view_projects_by_users_id($users_id){
        if ($users_id > 0) {
            $data ['rows'] = $this->projects_model->get_by_users_id( $users_id );
        } else {
            $data ['rows'] = array ();
        }
        print_r($data);
    }
    
    public function view_projects_homepage($offset = 0, $limit = 0){
    	if ($limit <= 0) {
    		$MAX_RECORDS = 8; /* each request return 8 records at most */
    	} else {
    		$MAX_RECORDS = $limit;
    	}

    	$data ['rows'] = $this->projects_model->get_all ( $offset * $MAX_RECORDS, $MAX_RECORDS );
    	$data ['offset'] = $offset + 1;
    	print_r($data);
    }

}
?>