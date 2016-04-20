<?php


class Users extends CI_Controller {
	function __construct()
	{
		parent::__construct();
		$this->load->model('users_model','',TRUE);
		$this->load->library('form_validation');
		$this->load->helper('form');
	}
	
	public function login(){
		//This method will have the credentials validation
	
		$this->form_validation->set_rules('email', 'Email', 'trim|required');
		$this->form_validation->set_rules('password', 'Password', 'trim|required|callback_check_database');
		if($this->form_validation->run() == FALSE)
		{
			//Field validation failed.  User redirected to login page
			//redirect('verification/login', 'refresh');
			return true;
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
// 			$this->load->view('welcome_message',$data);		
			return false;
		}
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
	
}

?>