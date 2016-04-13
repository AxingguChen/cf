<?php

/**
 * User: jackie
 * Date: 04/04/2016
 * Time: 9:12 PM
 * model for users table

 */
class Type_model extends CI_Model {
	private $TABLENAME = 'type';
	function __construct() {
		parent::__construct ();
		#$this->load->model ( 'users_model', '', TRUE );
	}
	
	function get_all() {
		$this->db->select('*');
		$this->db->from( $this->TABLENAME );
		$query = $this->db->get();
		return $query->result();
	}
	

	
	
}

?>