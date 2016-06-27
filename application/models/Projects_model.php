<?php
/**
 * Created by PhpStorm.
 * User: jackie
 * Date: 23/3/2016
 * Time: 12:26 AM
 */

class Projects_model extends CI_Model
{
    private $TABLENAME = 'projects';
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Get total count of projects table
     *
     * @access public
     * @return integer count
     */
    public function get_all_count()
    {
        $query = $this->db->count_all($this->TABLENAME);
        return $query;
    }

    /**
     * Get all records of projects
     *
     * @access public
     * @param integer $offset
     * @param integer $limit
     * @param string $order
     * @param string $direction
     * @return array records
     */
    public function get_all($offset = 0, $limit = 0, $order = 'projects.projects_id', $direction = 'desc')
    {
        $this->db->select('*');
        $this->db->from($this->TABLENAME);
        $this->db->join('users', "users.users_id = $this->TABLENAME.projects_users_id");
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
    
    public function get_by_users_id($projects_users_id, $limit = 0, $order = 'projects.date_publish', $direction = 'asc')
    {
    	$this->db->select('*');
    	$this->db->from($this->TABLENAME);
    	$this->db->join('users', "users.users_id = $this->TABLENAME.projects_users_id");
    	$this->db->where('projects_users_id',$projects_users_id);
    	$this->db->where('projects_project_state_id',2);
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
    
    public function get_by_related($projects_id, $limit = 0, $order = 'projects.date_publish', $direction = 'asc'){
    	$str = 'select projects_users_id from projects where projects_id = '.$projects_id;
    	$result = $this->db->query($str);
    	$this->db->select('*');
    	$this->db->from($this->TABLENAME);
    	$this->db->join('users', "users.users_id = $this->TABLENAME.projects_users_id");
    	$this->db->where('projects_users_id',$result->row()->projects_users_id);
    	$this->db->where('projects_id !=',$projects_id);
    	$this->db->where('projects_project_state_id',2);
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
    
    public function get_last_chance( $limit = 0, $order = 'projects.date_publish', $direction = 'asc')
    {
    	$this->db->select('*');
    	$this->db->from($this->TABLENAME);
    	$this->db->join('users', "users.users_id = $this->TABLENAME.projects_users_id");
    	$this->db->where('projects_project_state_id',2);
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
    
    public function get_new_arrivals($offset = 0, $limit = 0, $order = 'projects.date_publish', $direction = 'desc')
    {
    	$this->db->select('*');
    	$this->db->from($this->TABLENAME);
    	$this->db->join('users', "users.users_id = $this->TABLENAME.projects_users_id");
    	$this->db->where('projects_project_state_id',2);
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
    
    public function get_by_popularity($offset = 0, $limit = 0, $order = 'projects.sale_current', $direction = 'desc')
    {
    	$this->db->select('*');
    	$this->db->from($this->TABLENAME);
    	$this->db->join('users', "users.users_id = $this->TABLENAME.projects_users_id");
    	$this->db->where('projects_project_state_id',2);
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
     * Get a record of projects which id
     * is $id
     *
     * @access public
     * @param integer $id
     * @return array records
     */
    public function get_by_id($id)
    {
        if ($id <= 0)
        {
            return -1;
        }
        $this->db->select('*');
        $this->db->from($this->TABLENAME);
        $this->db->join('users', "users.users_id = $this->TABLENAME.projects_users_id");
        $this->db->where("$this->TABLENAME.projects_id", $id);
        $query = $this->db->get();
        return $query->result();
    }

    /**
     * Get all records of projects by specific user id
     *
     * @access public
     * @param integer $user_id
     * @return array records
     */
//     public function get_by_users_id($users_id)
//     {
//         if ($users_id <= 0)
//         {
//             return -1;
//         }
//         $this->db->select('*');
//         $this->db->from($this->TABLENAME);
//         $this->db->where("$this->TABLENAME.projects_users_id", $users_id);
//         $query = $this->db->get();
//         return $query->result();
//     }
	
    public function get_by_gender($gender = 0,$sort = -1,$offset = 0, $limit = 0, $order = 'projects.date_publish', $direction = 'asc')
    {
    	if($sort == 1){
    		$order = 'projects.date_publish';
    		$direction = 'asc';
    	}
    	elseif($sort == 2){
    		$order = 'projects.date_publish';
    		$direction = 'desc';
    	}
    	elseif($sort == 3){
    		$order = 'projects.sale_current';
    		$direction = 'desc';
    	}
    	$this->db->select('*');
    	$this->db->from($this->TABLENAME);
    	$this->db->join('users', "users.users_id = $this->TABLENAME.projects_users_id");
    	$this->db->where('gender', $gender);
    	$this->db->where('projects_project_state_id',2);
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
    
    public function get_by_type($type_id = 0,$sort, $offset = 0, $limit = 0, $order = 'projects.date_publish', $direction = 'asc')
    {
    	if($sort == 1){
    		$order = 'projects.date_publish';
    		$direction = 'asc';
    	}
    	elseif($sort == 2){
    		$order = 'projects.date_publish';
    		$direction = 'desc';
    	}
    	elseif($sort == 3){
    		$order = 'projects.sale_current';
    		$direction = 'desc';
    	}
    	$this->db->select('*');
    	$this->db->from($this->TABLENAME);
    	$this->db->join('users', "users.users_id = $this->TABLENAME.projects_users_id");
    	$this->db->where('projects_type_id', $type_id);
    	$this->db->where('projects_project_state_id',2);
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
    public function get_by_color($color_id = 0,$sort,$offset = 0, $limit = 0, $order = 'projects.date_publish', $direction = 'asc'){
    	if($sort == 1){
    		$order = 'projects.date_publish';
    		$direction = 'asc';
    	}
    	elseif($sort == 2){
    		$order = 'projects.date_publish';
    		$direction = 'desc';
    	}
    	elseif($sort == 3){
    		$order = 'projects.sale_current';
    		$direction = 'desc';
    	}
    	$this->db->select('*');
    	$this->db->from($this->TABLENAME);
    	$this->db->join('users', "users.users_id = $this->TABLENAME.projects_users_id");
    	$this->db->where('color_id', $color_id);
    	$this->db->where('projects_project_state_id',2);
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
    public function get_by_gender_color($gender = 0,$color_id,$sort,$offset = 0, $limit = 0, $order = 'projects.date_publish', $direction = 'asc')
    {
    	if($sort == 1){
    		$order = 'projects.date_publish';
    		$direction = 'asc';
    	}
    	elseif($sort == 2){
    		$order = 'projects.date_publish';
    		$direction = 'desc';
    	}
    	elseif($sort == 3){
    		$order = 'projects.sale_current';
    		$direction = 'desc';
    	}
    	$this->db->select('*');
    	$this->db->from($this->TABLENAME);
    	$this->db->join('users', "users.users_id = $this->TABLENAME.projects_users_id");
    	$this->db->where('gender', $gender);
    	$this->db->where('color_id', $color_id);
    	$this->db->where('projects_project_state_id',2);
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
    public function get_by_type_color($type_id = 0,$color_id,$sort,$offset = 0, $limit = 0, $order = 'projects.date_publish', $direction = 'asc')
    {
    	if($sort == 1){
    		$order = 'projects.date_publish';
    		$direction = 'asc';
    	}
    	elseif($sort == 2){
    		$order = 'projects.date_publish';
    		$direction = 'desc';
    	}
    	elseif($sort == 3){
    		$order = 'projects.sale_current';
    		$direction = 'desc';
    	}
    	$this->db->select('*');
    	$this->db->from($this->TABLENAME);
    	$this->db->join('users', "users.users_id = $this->TABLENAME.projects_users_id");
    	$this->db->where('projects_type_id', $type_id);
    	$this->db->where('color_id', $color_id);
    	$this->db->where('projects_project_state_id',2);
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
    
    public function get_by_sort($sort=0,$offset = 0, $limit = 0, $order = 'projects.date_publish', $direction = 'asc'){
    	if($sort == 1){
    		$order = 'projects.date_publish';
    		$direction = 'asc';
    	}
    	elseif($sort == 2){
    		$order = 'projects.date_publish';
    		$direction = 'desc';
    	}
    	elseif($sort == 3){
    		$order = 'projects.sale_current';
    		$direction = 'desc';
    	}
    	$this->db->select('*');
    	$this->db->from($this->TABLENAME);
    	$this->db->join('users', "users.users_id = $this->TABLENAME.projects_users_id");
    	$this->db->where('projects_project_state_id',2);
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
    public function get_by_type_gender($type_id = 0,$gender,$sort=0,$offset = 0, $limit = 0, $order = 'projects.date_publish', $direction = 'asc')
    {
    	if($sort == 1){
    		$order = 'projects.date_publish';
    		$direction = 'asc';
    	}
    	elseif($sort == 2){
    		$order = 'projects.date_publish';
    		$direction = 'desc';
    	}
    	elseif($sort == 3){
    		$order = 'projects.sale_current';
    		$direction = 'desc';
    	}
    	$this->db->select('*');
    	$this->db->from($this->TABLENAME);
    	$this->db->join('users', "users.users_id = $this->TABLENAME.projects_users_id");
    	$this->db->where('projects_type_id', $type_id);
    	$this->db->where('gender', $gender);
    	$this->db->where('projects_project_state_id',2);
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
    
    public function get_by_type_gender_color($type_id = 0,$gender,$color_id,$sort,$offset = 0, $limit = 0, $order = 'projects.date_publish', $direction = 'asc'){
    	if($sort == 1){
    		$order = 'projects.date_publish';
    		$direction = 'asc';
    	}
    	elseif($sort == 2){
    		$order = 'projects.date_publish';
    		$direction = 'desc';
    	}
    	elseif($sort == 3){
    		$order = 'projects.sale_current';
    		$direction = 'desc';
    	}
    	$this->db->select('*');
    	$this->db->from($this->TABLENAME);
    	$this->db->join('users', "users.users_id = $this->TABLENAME.projects_users_id");
    	$this->db->where('projects_type_id', $type_id);
    	$this->db->where('gender', $gender);
    	$this->db->where('projects_project_state_id',2);
    	$this->db->where('color_id',1);
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
    
    public function insert_project($users_id){
    	$data = array (
    			'projects_users_id' => $users_id,
    			'title' => $this->input->post ( 'title' ),
    			'description' => $this->input->post ( 'description' ),
    			'projects_project_state_id' => 1
    	);
    	$this->db->insert ( $this->TABLENAME, $data );
    	return $this->db->insert_id();
    }
    
}

?>