<?php

/**
 * User: jackie
 * Date: 26/06/2016
 * Time: 7:12 PM
 * model for users table

 */
class Size_model extends CI_Model {
	private $TABLENAME = 'size';
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
	
	function get_by_id($size_id){
		$this->db->select('*');
		$this->db->from( $this->TABLENAME );
		$this->db->where('size_id',$size_id);
		$query = $this->db->get();
		return $query->result();
	}
	
	
}

?>