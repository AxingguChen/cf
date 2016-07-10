<?php

/**
 * User: jackie
 * Date: 04/04/2016
 * Time: 9:12 PM
 * model for users table

 */
class Users_model extends CI_Model {
	private $TABLENAME = 'users';
	function __construct() {
		parent::__construct ();
		#$this->load->model ( 'users_model', '', TRUE );
		$this->load->model ( 'projects_model', '', TRUE );
	}
	
/**
	 * provide login input of email and password
	 * return user info if match
	 *
	 * @access public
	 * @param string $email       	
	 * @param stting $password      	       	
	 * @return login user records
	 */
	function login($email, $password) {
		$this->db->select ( 'users_id, email, firstname, password' );
		$this->db->from ( 'users' );
		$this->db->where ( 'email', $email );
		$this->db->where ( 'password', sha1 ( $password ) );
		// $this -> db -> limit(1);
		
		$query = $this->db->get ();
		
		if ($query->num_rows () == 1) {
			return $query->result ();
		} else {
			return false;
		}
	}
	
	public function getByEmail($email){
		$this->db->select('*');
		$this->db->from($this->TABLENAME);
		$this->db->where('email',$email);
		$query = $this->db->get();
		return $query->result();
	}
	
   /**
     * Get all records of users
     *
     * @access public
     * @param integer $offset
     * @param integer $limit
     * @param string $order
     * @param string $direction
     * @return array records
     */
    public function get_all($offset = 0, $limit = 0, $order = 'users.users_id', $direction = 'asc')
    {
        $this->db->select('*');
        $this->db->from($this->TABLENAME);
        $this->db->where('users_groups_id',10);
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
    public function get_by_id_designer($users_id){
    	$this->db->select('*');
    	$this->db->from($this->TABLENAME);
    	$this->db->where('users_groups_id',10);
		$this->db->where('users_id',$users_id);
    	$query = $this->db->get();
    	return $query->result();
    }
    public function get_by_id_user($users_id){
    	$this->db->select('*');
    	$this->db->from($this->TABLENAME);
    	$this->db->where('users_groups_id',12);
    	$this->db->where('users_id',$users_id);
    	$query = $this->db->get();
    	return $query->result();
    }
    
    public function get_by_id($users_id){
    	$this->db->select('*');
    	$this->db->from($this->TABLENAME);
    	$this->db->where('users_id',$users_id);
    	$query = $this->db->get();
    	return $query->result();
    }
    
	
	public function signup() {
		$data = array (
				'email' => $this->input->post ( 'email' ),
				//'username' => $this->input->post ( 'username' ),
				'firstname' => $this->input->post ( 'firstname' ),
				'lastname' => $this->input->post ( 'lastname' ),
				'about' => $this->input->post ( 'about' ),
				'phone' => $this->input->post ( 'phone' ),
				'website' => $this->input->post ( 'website' ),
				'company' => $this->input->post ( 'company' ),
				'country' => $this->input->post ( 'country' ),
				'city' => $this->input->post ( 'city' ),
				'zip_code' => $this->input->post ( 'zip_code' ),
				'users_groups_id' => 10, //designer
				'password' => sha1 ( $this->input->post ( 'password' ) )
		);
		$this->db->insert ( $this->TABLENAME, $data );
	}
	public function get_by_popularity($offset = 0, $limit = 0, $order = 'users.users_id', $direction = 'desc'){
		$this->db->select('*,count(*)');
		$this->db->from($this->TABLENAME);
		$this->db->join('projects', "$this->TABLENAME.users_id = projects.projects_users_id");;
		$this->db->where('projects_project_state_id',2);
		$this->db->group_by('projects_users_id');
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
	
	public function get_by_schools($schools_id,$offset = 0, $limit = 0, $order = 'COUNT(*)', $direction = 'desc'){
		$this->db->select('*');
		$this->db->from($this->TABLENAME);
		$this->db->where('schools_id',$schools_id);
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
	
	public function get_followers_by_user_id($users_id, $offset = 0, $limit = 0, $order = 'users.users_id', $direction = 'desc'){
		$this->db->select('*');
		$this->db->from('followers');
		$this->db->join($this->TABLENAME, "$this->TABLENAME.users_id = followers.follower_id");;
		$this->db->where('follower_id',$users_id);
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
	
	/**
	 * input from form
	 * update the data to users(table)
	 *
	 * @access public
	 * @return null
	 */
	function update_profile($id) {
	
		$this->db->where('users_id', $id);
		
		$data = array(
				'firstname' => $this->input->post('firstname'),
				'lastname' => $this->input->post('lastname'),
				'phone' => $this->input->post('phone')
		);
		$this->db->update('users', $data);
	
		
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