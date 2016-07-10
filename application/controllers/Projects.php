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
        $this->load->model ( 'projects_model', '', TRUE );
        $this->load->model ( 'orders_model', '', TRUE );
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
    public function view_project($projects_id = 0){
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
        print json_encode($data);
    }
    
    public function view_projects_homepage($offset = 0, $limit = 0){
    	if ($limit <= 0) {
    		$MAX_RECORDS = 8; /* each request return 8 records at most */
    	} else {
    		$MAX_RECORDS = $limit;
    	}

    	$data ['rows'] = $this->projects_model->get_all ( $offset * $MAX_RECORDS, $MAX_RECORDS );
    	$data ['offset'] = $offset + 1;
    	print json_encode($data);
    }
    
    public function view_projects_lastchance($offset = 0, $limit = 0){
    	if ($limit <= 0) {
    		$MAX_RECORDS = 8; /* each request return 8 records at most */
    	} else {
    		$MAX_RECORDS = $limit;
    	}
    	$data ['rows'] = $this->projects_model->get_last_chance ( $offset * $MAX_RECORDS, $MAX_RECORDS );
    	$data ['offset'] = $offset + 1;
    	print json_encode($data);
    }
    public function view_projects_newarrivals($offset = 0, $limit = 0){
    	if ($limit <= 0) {
    		$MAX_RECORDS = 8; /* each request return 8 records at most */
    	} else {
    		$MAX_RECORDS = $limit;
    	} 	
    	$data ['rows'] = $this->projects_model->get_new_arrivals ( $offset * $MAX_RECORDS, $MAX_RECORDS );
    	$data ['offset'] = $offset + 1;
    	print json_encode($data);
    }
    
    
	//according to users id to get all relevant projects
    public function view_projects_by_user($projects_users_id, $offset = 0, $limit = 0){
    	if ($limit <= 0) {
    		$MAX_RECORDS = 8; /* each request return 8 records at most */
    	} else {
    		$MAX_RECORDS = $limit;
    	}
    	$data ['rows'] = $this->projects_model->get_by_users_id ($projects_users_id, $offset * $MAX_RECORDS, $MAX_RECORDS );
    	$data ['offset'] = $offset + 1;
    	print json_encode($data);
    }
    
    //according to users id to get all relevant projects
    public function view_project_related($projects_id, $offset = 0, $limit = 0){
    	if ($limit <= 0) {
    		$MAX_RECORDS = 8; /* each request return 8 records at most */
    	} else {
    		$MAX_RECORDS = $limit;
    	}
    	$data ['rows'] = $this->projects_model->get_by_related ($projects_id, $offset * $MAX_RECORDS, $MAX_RECORDS );
    	$data ['offset'] = $offset + 1;
    	print json_encode($data);
    }
    
    //according to current sale number 
    public function view_projects_popularity($offset = 0, $limit = 0){
    	if ($limit <= 0) {
    		$MAX_RECORDS = 8; /* each request return 8 records at most */
    	} else {
    		$MAX_RECORDS = $limit;
    	}
    	$data ['rows'] = $this->projects_model->get_by_popularity ( $offset * $MAX_RECORDS, $MAX_RECORDS );
    	$data ['offset'] = $offset + 1;
    	print json_encode($data);
    }
    
    public function view_projects_filter($type_id = -1, $gender = -1, $color_id = -1,$sort = -1,$offset = 0, $limit = 0){
    	if ($limit <= 0) {
    		$MAX_RECORDS = 8; /* each request return 8 records at most */
    	} else {
    		$MAX_RECORDS = $limit;
    	}
    	
    	if($type_id == -1 && $gender == -1 && $color_id == -1){
    		$data ['rows'] = $this->projects_model->get_by_sort ($sort, $offset * $MAX_RECORDS, $MAX_RECORDS );
    	}
    	elseif($type_id == -1 && $color_id == -1){
    		$data ['rows'] = $this->projects_model->get_by_gender($sort, $gender, $offset * $MAX_RECORDS, $MAX_RECORDS );
    	}
    	elseif($gender == -1 && $color_id == -1){
    		$data ['rows'] = $this->projects_model->get_by_type($type_id, $sort,$offset * $MAX_RECORDS, $MAX_RECORDS );
    	}
    	elseif($type_id == -1 && $gender == -1 ){
    		$data ['rows'] = $this->projects_model->get_by_color($color_id, $sort,$offset * $MAX_RECORDS, $MAX_RECORDS );
    	}
    	elseif($color_id == -1){
    		$data ['rows'] = $this->projects_model->get_by_type_gender($type_id,$gender, $sort,$offset * $MAX_RECORDS, $MAX_RECORDS );
    	}
    	elseif($type_id == -1){
    		$data ['rows'] = $this->projects_model->get_by_gender_color($gender,$color_id, $sort,$offset * $MAX_RECORDS, $MAX_RECORDS );
    	}
    	elseif($gender == -1){
    		$data ['rows'] = $this->projects_model->get_by_type_color($type_id,$color_id, $sort,$offset * $MAX_RECORDS, $MAX_RECORDS );
    	}
    	else{
    		#$data ['rows'] = "asdf";
    		$data ['rows'] = $this->projects_model->get_by_type_gender_color($type_id,$gender,$color_id, $sort,$offset * $MAX_RECORDS, $MAX_RECORDS );
    	} 
    		
    	$data ['offset'] = $offset + 1;
    	print json_encode($data);
    	
    }
    
    public function view_pending_projects($offset = 0, $limit = 0){
    	if ($limit <= 0) {
    		$MAX_RECORDS = 8; /* each request return 8 records at most */
    	} else {
    		$MAX_RECORDS = $limit;
    	}
    	$data ['rows'] = $this->projects_model->get_pending_projects($offset * $MAX_RECORDS, $MAX_RECORDS );
    	$data ['offset'] = $offset + 1;
    	print json_encode($data);
    }
    
    public function update_project_pic($project_id,$position){
    	//TODO session
    	
    	$file_element_name = 'project_pic_upload';
    	
    	// $file_name = $upload_data['file_name'];
    	
    	//$session_data = $this->session->userdata ( 'logged_in' );
    	//$users_id = $session_data ['users_id'];
    	// $file_name = $users_id . '.pdf';
    	$filepath = 'pic/';
    	$path = $_FILES['project_pic_upload']['name'];
    	$filetype = '.'.pathinfo($path, PATHINFO_EXTENSION);
    	// $config ['file_name'] = 'e'.$filename.".jpg";
    	$filename = $project_id . "_" . $position;
    	$config ['file_name'] = $project_id . "_" . $position;
    	// used to be './assets/img/certificate' get absolute directory by getcwd()
    	$config ['upload_path'] = $filepath;
    	$config ['allowed_types'] = 'gif|jpg|png|doc|txt|pdf';
    	$config ['max_size'] = 2048; // 2MB
    	$config ['encrypt_name'] = FALSE;
    	$config ['overwrite'] = true;
    	// print_r($config ['upload_path']);
    	$this->load->library ( 'upload', $config );
    	if (! $this->upload->do_upload ( $file_element_name )) {
    		echo $this->upload->display_errors ( '', '' );
    	} else {
    		$data = $this->upload->data ();
    		$image_path = $data ['full_path'];
    		if (file_exists ( $image_path ) && $this->resizeimg($filepath,$filename,$filetype) ) {
    			// update db
    			$data ['state'] = true;
    		} else {
    			$data ['state'] = false;
    		}
    	}
    	print json_encode($data);
    	@unlink ( $_FILES [$file_element_name] );
    }

    //
	public function resizeimg($filepath = 'pic/',$filename ='1431248954',$filetype = ".jpg") {
		//header ( 'Content-Type: image/jpeg' );
		// $dst_image = base_url().'assets/img/project/1/1430653106_R.jpg';
		//$src_filename = 'assets/img/project/1/1431248954.jpg';
		$src_filename = $filepath.$filename.$filetype;
		//print_r($src_filename);
		if ($filetype == '.jpg' || $filetype == '.JPG')
			$src_image = imagecreatefromjpeg ( $src_filename );
		else if($filetype == '.png' || $filetype == '.PNG')
			$src_image = imagecreatefrompng ( $src_filename );
		list ( $src_w, $src_h ) = getimagesize ( $src_filename );
		$dst_x = 0;
		$dst_y = 0;
		$src_x = 0;
		$src_y = 0;
		//print_r($src_h/$src_w );
		if ($src_h/$src_w > 1.5) //too HIGH
		{
			$dst_w = $src_w;
			$dst_h = $src_w * 3 / 2;
			$src_y = ($src_h-$dst_h)/2;
	
		}
		else  					//too wide
		{
			$dst_h = $src_h;
			$dst_w = $src_h * 2 / 3;
			$src_x = ($src_w-$dst_w)/2;
			// 			print_r($dst_w);
			// 			print_r($dst_h);
		}
		
		// $src_w, $src_h
		$dst_image = imagecreatetruecolor ( $dst_w, $dst_h );
		
		if (imagecopyresampled ( $dst_image, $src_image, $dst_x, $dst_y, $src_x, $src_y, $src_w, $src_h, $dst_w, $dst_h )) {
			//imagejpeg ( $src_image );
			//imagejpeg($dst_image,null,100);
			if ($filetype == '.jpg' || $filetype == '.JPG')
				imagejpeg($dst_image,$filepath.'r'.$filename.$filetype);
			else if($filetype == '.png' || $filetype == '.PNG')
				imagepng($dst_image,$filepath.'r'.$filename.$filetype);
			//echo '<img width="400" height="300" src='.base_url().'assets/img/project/1/1430653106r.jpg>';
			//imagefilter ( $dst_image, IMG_FILTER_GRAYSCALE );
			//imagejpeg ( $dst_image, base_url () . 'assets/img/project/1/1430653106_R.jpg' );
			imagedestroy ( $src_image );
			imagedestroy ( $dst_image );
			return true;
		} else {
			imagedestroy ( $src_image );
			imagedestroy ( $dst_image );
			return false;
		}
	}
    //
    
	public function launch_project($user_id){
		// get session data
		$sess_array = array(
				'users_id' => $user_id,
				'firstname' => 'yuxing'
		
		);
		$this->session->set_userdata('logged_in', $sess_array);
		//TODO
		if ($this->session->userdata ( 'logged_in' )) {
			$session_data = $this->session->userdata ( 'logged_in' );
		
			//$tmparray = $this->input->post ( NULL, TRUE );
			$projects_id = $this->projects_model->insert_project( $session_data ['users_id']);
			$data ['state'] = true;
		} else {
			$data ['state'] = false;
				
		}
		print json_encode($data);
	}
	
	public function verify_project($project_id,$flag=0){
		//TODO checker user checking 
		$data ['row'] =$this->projects_model->verify_project($project_id,$flag);
		if ($data ['row']<0){
			$data ['state'] = false;
		}else {
			$data ['state'] = true;
		}
		print json_encode($data);
	}
	
	public function num_projects_finished($user_id){
		$data ['row'] = $this->projects_model->get_count_projects_finished($user_id);
		print json_encode($data);
	}
	
	public function num_projects_published($user_id){
		$data ['row'] = $this->projects_model->get_count_projects_published($user_id);
		print json_encode($data);
	}
	
	public function add_preorder($projects_id,$quantity,$size_id,$users_id){
		// get session data
// 		$sess_array = array(
// 				'users_id' => $users_id,
// 				//'firstname' => 'yuxing'
		
// 		);
// 		$this->session->set_userdata('logged_in', $sess_array);
		//TODO
		if ($users_id>0) {//TODO seesion
			//$session_data = $this->session->userdata ( 'logged_in' );
		
			//$tmparray = $this->input->post ( NULL, TRUE );
			$order_id = $this->orders_model->insert_preorder($projects_id,$quantity,$size_id,$users_id);
			$data ['state'] = true;
		} else {
			$data ['state'] = false;
				
		}
		print json_encode($data);
		
	}
}
?>