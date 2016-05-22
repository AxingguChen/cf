<?php

/**
 * User: jackie
 * Date: 22/05/2016
 * Time: 9:12 PM
 * model for orders table

 */
class Payment_method_model extends CI_Model {
	private $TABLENAME = 'payment_method';
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
	
	function get_payment_mothod_by_user_id($users_id, $offset = 0, $limit = 0, $order = 'payment_method.users_id', $direction = 'desc'){
		$this->db->select('*');
		$this->db->from($this->TABLENAME);
		$this->db->join('payment', "$this->TABLENAME.payment_id = payment.payment_id");;
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