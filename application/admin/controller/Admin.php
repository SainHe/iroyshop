<?php
namespace app\admin\controller;
use app\admin\model\Admin as AdminModel;
use app\admin\model\Role as RoleModel;
use app\admin\controller\Common;
class Admin extends Common
{
    public function index()
    {
        return view();
    }
    public function listView()
    {
        $admin = new AdminModel();
        $res = $admin->select();
        foreach($res as $k => $v){
            if($res[$k]['status'] == 1){
                $res[$k]['status'] = '启用';
            }else if($res[$k]['status'] == 0)
                $res[$k]['status'] = '停用';{
            }
        }
        return $res->toJson();
    }
    // 添加管理员
    public function add()
    {
        if(request()->isPost()){
            $admin = new AdminModel();
            $data = input('post.');
            if($admin::get(['username'=>$data['username']])){
                $this->error('添加失败,用户名已存在！');
            }
            $data['password'] = md5($data['password']);
            $data['lastLoginTime'] = date('Y-m-d H:i:s', time());
            $data['lastLoginIp'] = request()->ip();
            $data['createTime'] = date('Y-m-d H:i:s', time());
            if($admin->save($data)){
                $this->success('管理员添加成功','/admin/admin/');
            }else{
                $this->error('管理员添加失败');
            }
            
        }
        $role = new RoleModel();
        $roleRes = $role->select();
        $this->assign('role',$roleRes);
        return view();
    }
    // 编辑管理员
    public function edit($id)
    {
        $admin = new AdminModel();
        $adminRes = $admin->get($id);
        $this->assign('admin',$adminRes);
        if(request()->isPost()){
            $data = input('post.');
            if(empty($data['password'])){
                $data['password'] = $adminRes['password'];
            }else{
                $data['password'] = md5($data['password']);
            }
            $res = $admin->where('id',$id)->update($data);
            if($res){
                $this->success('修改成功！','admin/admin/index');
            }else{
                $this->error('修改失败！');
            }
        }
        $role = new RoleModel();
        $roleRes = $role->select();
        $this->assign('role',$roleRes);
        return view();
    }
    // 删除管理员
    public function del($id)
    {
        $admin = new AdminModel();
        $res = $admin::destroy($id);
        if($res){
            $this->success('删除成功！','admin/admin/index');
        }else{
            $this->error('删除失败！');
        }
    }
}
