<?php


class Users extends CI_Controller {
	function __construct()
	{
		parent::__construct();
		$this->load->model('users_model','',TRUE);
		$this->load->model('users_address_model','',TRUE);	
		$this->load->library('form_validation');
		$this->load->model('payment_model','',TRUE);
		$this->load->model('address_model','',TRUE);
		$this->load->helper('form');
	}
	
	public function login(){
		//This method will have the credentials validation
		$this->form_validation->set_rules('email', 'Email', 'trim|required');
		$this->form_validation->set_rules('password', 'Password', 'trim|required|callback_check_database');
		if($this->form_validation->run() == FALSE)
		{
			//Field validation failed.  User redirected to login page
			#$this->load->view('welcome_message');	
			#return false;
			$data ['state'] = false;
			print json_encode($data);
		}
		else
		{
			//Go to private area
			//redirect('users/user_profile', 'refresh');
	
			/* USE CASE FOR ACL SYSTEM*/
// 			$data = array('data' => array(
// 					'acl_view' => $this->users_model->can_do_it('acl_view'),
// 					'acl_update_profile' => $this->users_model->can_do_it('acl_update_user'),
// 					'acl_view_profile' => $this->users_model->can_do_it('acl_view_user'),
// 					'acl_create_project' => $this->users_model->can_do_it('acl_update_designer'),
// 					'acl_update_project' => $this->users_model->can_do_it('acl_update_designer'),
// 					'acl_update_check' => $this->users_model->can_do_it('acl_update_checker'),
// 					'acl_update_acl' => $this->users_model->can_do_it('acl_update_acl')
// 			));

			#$_POST["email"]
			$data ['rows'] = $this->users_model->get_by_id_designer(1);
			$data ['state'] = true;
			print json_encode($data);
		}
		
// 		print_r($_POST["email"]);
	}
	
	function check_database($password)
	{
		//Field validation succeeded.  Validate against database
		$email = $this->input->post('email');
	
		//query the database
		$result = $this->users_model->login($email, $password);
		if($result)
		{
			//session
			$sess_array = array();
			foreach($result as $row)
			{
				$sess_array = array(
						'users_id' => $row->users_id,
						'firstname' => $row->firstname
						
				);
				$this->session->set_userdata('logged_in', $sess_array);
			}
			return true;
		}
		else
		{
			$this->form_validation->set_message('check_database', 'Invalid email or password');
			return false;
		}
	}
	
	public function signup() {
		$this->load->library ( 'form_validation' );
		// error message, validation rules
		$this->form_validation->set_rules ( 'email', 'Your Email', 'trim|required|valid_email' );
		$this->form_validation->set_rules ( 'username', 'User Name', 'trim|required' );
		$this->form_validation->set_rules ( 'password', 'Password', 'trim|required|min_length[4]|max_length[32]' );
		$this->form_validation->set_rules ( 'con_password', 'Password Confirmation', 'trim|required|matches[password]' );
	
		if ($this->form_validation->run () == FALSE) {
			return false;
			#redirect ( 'verification/login', 'refresh' );
		} else {
			$this->users_model->register();
			// query the database search by email
			$result = $this->users_model->getByEmail($this->input->post('email'));
			//session
			$sess_array = array ();
			foreach ( $result as $row ) {
				$sess_array = array (
						'users_id' => $row->users_id,
						'email' => $row->email
				);
				$this->session->set_userdata ( 'logged_in', $sess_array );
			}
			// Go to private area
			#redirect ( 'users/user_profile', 'refresh' );
			return true;
		}
	}
	
	// access
	// index.php/projects/view_designer
	public function view_designer($users_id = 0){
		if ($users_id > 0) {
			$data ['rows'] = $this->users_model->get_by_id_designer($users_id);
		} else {
			$data ['rows'] = array ();
		}
		print json_encode($data);
		//print_r($data);
	}
	
	// index.php/projects/view_user
	public function view_user($users_id = 0){
		if ($users_id > 0) {
			$data ['rows'] = $this->users_model->get_by_id_user($users_id);
		} else {
			$data ['rows'] = array ();
		}
		print json_encode($data);
		//print_r($data);
	}
	
	// access
	// index.php/projects/view_designers
	public function view_designers($offset = 0, $limit = 0){
		if ($limit <= 0) {
			$MAX_RECORDS = 8; /* each request return 8 records at most */
		} else {
			$MAX_RECORDS = $limit;
		}
		$data ['rows'] = $this->users_model->get_all($offset, $MAX_RECORDS);
		print json_encode($data);
		//print_r($data);
	}
	
	//according to projects number
	//index.php/projects/designers_popularity
	public function designers_popularity($offset = 0, $limit = 0){
		if ($limit <= 0) {
			$MAX_RECORDS = 8; /* each request return 8 records at most */
		} else {
			$MAX_RECORDS = $limit;
		}
		$data ['rows'] = $this->users_model->get_by_popularity($offset, $MAX_RECORDS);
		$data ['offset'] = $offset + 1;
		print json_encode($data);
		//print_r($data);
	}
	
	//according to sales number
	//index.php/projects/designers_sales
	public function designers_sales($offset = 0, $limit = 0){
		if ($limit <= 0) {
			$MAX_RECORDS = 8; /* each request return 8 records at most */
		} else {
			$MAX_RECORDS = $limit;
		}
		$data ['rows'] = $this->users_model->get_by_popularity($offset, $MAX_RECORDS);
		$data ['offset'] = $offset + 1;
		print json_encode($data);
		//print_r($data);
	}
	
	//according to schools
	public function designers_schools($schools_id = 55,$offset = 0, $limit = 0){
		if ($limit <= 0) {
			$MAX_RECORDS = 8; /* each request return 8 records at most */
		} else {
			$MAX_RECORDS = $limit;
		}
		$data ['rows'] = $this->users_model->get_by_schools($schools_id,$offset, $MAX_RECORDS);
		$data ['offset'] = $offset + 1;
		print json_encode($data);
		//print_r($data);
	}
	
	//get address by user id
	public function view_address_by_user_id($users_id = 0,$offset = 0, $limit = 0){
		if ($limit <= 0) {
			$MAX_RECORDS = 8; /* each request return 8 records at most */
		} else {
			$MAX_RECORDS = $limit;
		}
		$data ['rows'] = $this->users_address_model->get_address_by_user_id($users_id,$offset, $MAX_RECORDS);
		$data ['offset'] = $offset + 1;
		print json_encode($data);
		//print_r($data);
	}
	
	public function view_followed_designers($users_id = 0,$offset = 0, $limit = 0){
		if ($limit <= 0) {
			$MAX_RECORDS = 8; /* each request return 8 records at most */
		} else {
			$MAX_RECORDS = $limit;
		}
		$data ['rows'] = $this->users_model->get_followers_by_user_id($users_id,$offset, $MAX_RECORDS);
		$data ['offset'] = $offset + 1;
		print json_encode($data);
		//print_r($data);
	}
	
	public function view_payment_method_by_user_id($users_id = 0,$offset = 0, $limit = 0){
		$this->load->model('payment_method_model','',TRUE);
		if ($limit <= 0) {
			$MAX_RECORDS = 8; /* each request return 8 records at most */
		} else {
			$MAX_RECORDS = $limit;
		}
		$data ['rows'] = $this->payment_method_model->get_payment_mothod_by_user_id($users_id,$offset, $MAX_RECORDS);
		$data ['offset'] = $offset + 1;
		print json_encode($data);
		//print_r($data);
	}
	
	public function view_payment_by_id($payment_id = 0){
		$data ['rows'] = $this->payment_model->get_payment_by_id($payment_id);
		print json_encode($data);
		//print_r($data);
	}
	
	public function view_address_by_id($address_id = 0){
		$data ['rows'] = $this->address_model->get_address_by_id($address_id);
		print json_encode($data);
		//print_r($data);
	}
	
	// access
	// index.php/users/update_payment_by_id
	function update_payment_by_id($payment_id = 1) {
		// get session data
		$sess_array = array(
				'users_id' => 1,
				'firstname' => 'yuxing'
	
		);
		$this->session->set_userdata('logged_in', $sess_array);
		//TODO
		if ($this->session->userdata ( 'logged_in' )) {
			$session_data = $this->session->userdata ( 'logged_in' );
	
			//$tmparray = $this->input->post ( NULL, TRUE );
			$this->payment_model->update_payment_by_id ($payment_id);
	
			// get user data by id
			$data ['rows'] = $this->payment_model->get_payment_by_id ($payment_id);
			$data ['state'] = true;
		} else {
			$data ['state'] = false;
				
		}
		print json_encode($data);
	}
	
	// access
	// index.php/users/update_address_by_id
	function update_address_by_id($address_id = 1) {
		// get session data
// 		$sess_array = array(
// 				'users_id' => 1,
// 				'firstname' => 'yuxing'
	
// 		);
// 		$this->session->set_userdata('logged_in', $sess_array);
	
		if ($this->session->userdata ( 'logged_in' )) {
			$session_data = $this->session->userdata ( 'logged_in' );
	
			//$tmparray = $this->input->post ( NULL, TRUE );
			$this->address_model->update_address_by_id ($address_id);
	
			// get user data by id
			$data ['rows'] = $this->address_model->get_address_by_id ($address_id);
			$data ['state'] = true;
		} else {
			$data ['state'] = false;
	
		}
		print json_encode($data);
	}
	
	
	public function view_wishlist_by_user_id($users_id = 0,$offset = 0, $limit = 0){
		$this->load->model('wishlist_model','',TRUE);
		if ($limit <= 0) {
			$MAX_RECORDS = 8; /* each request return 8 records at most */
		} else {
			$MAX_RECORDS = $limit;
		}
		$data ['rows'] = $this->wishlist_model->get_wishlist_by_user_id($users_id,$offset, $MAX_RECORDS);
		$data ['offset'] = $offset + 1;
		print json_encode($data);
		//print_r($data);
	}
	
	// access
	// index.php/users/update_profile
	function update_profile($users_id = 1) {
		// get session data
		$sess_array = array(
				'users_id' => $users_id,
				'firstname' => 'yuxing'
		
		);
		$this->session->set_userdata('logged_in', $sess_array);
		
		if ($this->session->userdata ( 'logged_in' )) {
			$session_data = $this->session->userdata ( 'logged_in' );
				
			//$tmparray = $this->input->post ( NULL, TRUE );
			$this->users_model->update_profile ( $session_data ['users_id']);
				
			// get user data by id
			$data ['rows'] = $this->users_model->get_by_id ( $session_data ['users_id'] );
			$data ['state'] = true;
		} else {
			$data ['state'] = false;
			
		}
		print json_encode($data);
	}
	
	
	
}

?>