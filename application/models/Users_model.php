<?php

/**
 * User: jackie
 * Date: 04/04/2016
 * Time: 9:12 PM
 * model for users table

 */
class Users_model extends CI_Model {
	private $TABLENAME = 'users';
	function __construct() {
		parent::__construct ();
		#$this->load->model ( 'users_model', '', TRUE );
	}
	
	function login($email, $password) {
		$this->db->select ( 'users_id, users_groups_id, email, password' );
		$this->db->from ( $this->TABLENAME );
		$this->db->where ( 'email', $email );
		$this->db->where ( 'password', sha1 ( $password ) );
		// $this -> db -> limit(1);	
		$query = $this->db->get();
	
		if ($query->num_rows () == 1) {
			#$this->set_permissions($query->row()->users_groups_id);
			return $query->result ();
		} else {
			return false;
		}	
	}
	
	function signup() {
		$data = array (
				'email' => $this->input->post ( 'email' ),
				'username' => $this->input->post ( 'username' ),
				'users_groups_id' => 10, //designer
				'password' => sha1 ( $this->input->post ( 'password' ) )
		);
		$this->db->insert ( $this->TABLENAME, $data );
	}
	
	
}

?>