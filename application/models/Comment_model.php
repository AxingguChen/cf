<?php

/**
 * User: jackie
 * Date: 15/05/2016
 * Time: 12:15 AM
 * model for users table

 */
class Comment_model extends CI_Model {
	private $TABLENAME = 'comment';
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
	
	function get_by_projects_id($projects_id, $offset = 0, $limit = 0, $order = 'comment.date_create', $direction = 'desc'){
		$this->db->select('*');
		$this->db->from($this->TABLENAME);
		$this->db->where('comments_projects_id',$projects_id);
		if (strlen($order) > 0)
		{
			$this->db->order_by($order, $direction);
		}
		if ($limit > 0)
		{
			$this->db->limit($limit, $offset);
		}
		$query = $this->db->get();
		return $query->result();
	}
	

	
	
}

?>