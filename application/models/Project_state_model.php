<?php

/**
 * User: jackie
 * Date: 27/06/2016
 * Time: 9:15 AM
 * model for project_state table

 */
class Project_state_model extends CI_Model {
	private $TABLENAME = 'project_state';
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
	

	function get_by_id($project_state_id){
		$this->db->select('*');
		$this->db->from( $this->TABLENAME );
		$this->db->where('project_state_id',$project_state_id);
		$query = $this->db->get();
		return $query->result();
	}
	
	
}

?>