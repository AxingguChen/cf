<?php

/**
 * User: jackie
 * Date: 25/05/2016
 * Time: 10:10 PM
 * model for orders table

 */
class Payment_model extends CI_Model {
	private $TABLENAME = 'payment';
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

	function get_payment_by_id($payment_id){
		$this->db->select('*');
		$this->db->from( $this->TABLENAME );
		$this->db->where('payment_id',$payment_id);
		$query = $this->db->get();
		return $query->result();
	}
	
	function update_payment_by_id($payment_id){
		$this->db->where('payment_id', $payment_id);
		
		$data = array(
				'cardholder' => $this->input->post('cardholder'),
				'payment_type_id' => $this->input->post('payment_type_id'),
				'account' => $this->input->post('account'),
				'month' => $this->input->post('month'),
				'year' => $this->input->post('year')
		);
		$this->db->update($this->TABLENAME , $data);
		
		
		$this->db->trans_complete();
		if ($this->db->trans_status() === FALSE)
		{
			//
			return -1;
		}
		else
		{
			return $this->db->affected_rows();
		}
	}
	
	
}

?>