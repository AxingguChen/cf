<?php

class Comment extends CI_Controller {
    public function __construct() {
        parent::__construct ();
        $this->load->model ( 'Comment_model', '', TRUE );
    }

    // access
    // index.php/color/view_color
    public function view_comments($projects_id, $offset = 0, $limit = 0){
    	if ($limit <= 0) {
    		$MAX_RECORDS = 8; /* each request return 8 records at most */
    	} else {
    		$MAX_RECORDS = $limit;
    	}
        $data ['rows'] = $this->Comment_model->get_by_projects_id($projects_id);
        $data ['offset'] = $offset + 1;
        print json_encode($data);
    }


}
?>