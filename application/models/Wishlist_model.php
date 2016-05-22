<?php

/**
 * User: jackie
 * Date: 22/05/2016
 * Time: 9:12 PM
 * model for orders table

 */
class Wishlist_model extends CI_Model {
	private $TABLENAME = 'wishlist';
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
	
	public function get_wishlist_by_user_id($users_id, $offset = 0, $limit = 0, $order = 'projects.date_publish', $direction = 'desc'){
		$this->db->select('*');
		$this->db->from($this->TABLENAME);
		$this->db->join('projects', "$this->TABLENAME.projects_id = projects.projects_id");;
		$this->db->where('users_id',$users_id);
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