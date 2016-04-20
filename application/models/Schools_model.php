<?php

/**
 * User: jackie
 * Date: 20/04/2016
 * Time: 10:12 PM
 * model for users table

 */
class Schools_model extends CI_Model {
	private $TABLENAME = 'schools';
	function __construct() {
		parent::__construct ();
		#$this->load->model ( 'users_model', '', TRUE );
	}
	
	function get_all($order = 'schools.name',$direction = 'asc') {
		$this->db->select('*');
		$this->db->from( $this->TABLENAME );
		if (strlen($order) > 0)
		{
			$this->db->order_by($order, $direction);
		}
		$query = $this->db->get();
		return $query->result();
	}
	

	
	
}

?>