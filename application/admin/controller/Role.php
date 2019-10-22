<?php
namespace app\admin\controller;
use app\admin\model\Admin as AdminModel;
use app\admin\model\Role as RoleModel;
use app\admin\controller\Common;
class Role extends Common
{
    public function index()
    {
        $role = new RoleModel();
        $roleRes = $role->select();
        $this->assign('role',$roleRes);
        return view();
    }
    public function add()
    {
        if(request()->isPost()){
            $role = new RoleModel();
            $data = input('post.');
            if($role::get(['name'=>$data['name']])){
                $this->error('添加失败,角色已存在！');
            }
            $data['createTime'] = date('Y-m-d H:i:s', time());
            $data['updateTime'] = date('Y-m-d H:i:s', time());
            if($role->save($data)){
                $this->success('角色添加成功','/admin/role/');
            }else{
                $this->error('角色添加失败');
            }
        }
        return view();
    }
    
}
