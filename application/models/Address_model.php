<?php

/**
 * User: jackie
 * Date: 25/05/2016
 * Time: 10:10 PM
 * model for orders table

 */
class Address_model extends CI_Model {
	private $TABLENAME = 'address';
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

	function get_address_by_id($address_id){
		$this->db->select('*');
		$this->db->from( $this->TABLENAME );
		$this->db->where('address_id',$address_id);
		$query = $this->db->get();
		return $query->result();
	}
	
	function update_address_by_id($address_id){
		$this->db->where('address_id', $address_id);
		
		$data = array(
				'firstname' => $this->input->post('firstname'),
				'lastname' => $this->input->post('lastname'),
				'street' => $this->input->post('street'),
				'country' => $this->input->post('country'),
				'city' => $this->input->post('city'),
				'zip_code' => $this->input->post('zip_code'),
				'additional_info' => $this->input->post('additional_info'),
				'phone' => $this->input->post('phone'),
				'address_label' => $this->input->post('address_label'),
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