<?php

/**
 * User: jackie
 * Date: 22/05/2016
 * Time: 9:12 PM
 * model for orders table

 */
class Payment_type_model extends CI_Model {
	private $TABLENAME = 'payment_type';
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