<?php

/**
 * User: jackie
 * Date: 09/05/2016
 * Time: 7:15 PM
 * model for users table

 */
class Color_model extends CI_Model {
	private $TABLENAME = 'color';
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