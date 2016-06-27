<?php

/**
 * User: jackie
 * Date: 22/05/2016
 * Time: 9:12 PM
 * model for orders table

 */
class Users_address_model extends CI_Model {
	private $TABLENAME = 'users_address';
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
	
	function get_address_by_user_id($users_id){
		$this->db->select('*');
		$this->db->from( $this->TABLENAME );
		$this->db->join('address', "address.address_id = $this->TABLENAME.address_id");
		$this->db->where('users_id',$users_id);
		$query = $this->db->get();
		return $query->result();
	}

	function update_default($users_id, $address_id) {
	
		$this->db->where('users_id', $users_id);
		$data = array(
				'default' => 0
		);
		$this->db->update($this->TABLENAME , $data);
	
		$this->db->where('address_id', $address_id);
		$this->db->where('users_id', $users_id);
		$data = array(
				'default' => 1
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