<?php

/**
 * User: jackie
 * Date: 22/05/2016
 * Time: 9:12 PM
 * model for orders table

 */
class Orders_model extends CI_Model {
	private $TABLENAME = 'orders';
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
	
	function get_by_user_id($users_id){
		$this->db->select('*');
		$this->db->from( $this->TABLENAME );
		$this->db->where('orders_users_id',$users_id);
		$query = $this->db->get();
		return $query->result();
	}
	
	function get_preorder_by_user_id($users_id,$offset = 0, $limit = 0){
		$this->db->select('*');
		$this->db->from( $this->TABLENAME );
		$this->db->where('orders_users_id',$users_id);
		$this->db->where('orders_order_state_id',4);

		if ($limit > 0)
		{
			$this->db->limit($limit, $offset);
		}
		$query = $this->db->get();
		return $query->result();
	}

	
	
}

?>