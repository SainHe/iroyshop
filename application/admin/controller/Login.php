<?php

namespace app\admin\controller;
use think\Controller;
use app\admin\model\Admin as AdminModel;
use think\captcha\Captcha;

class Login extends Controller
{
    public function index()
    {

        return view();
    }
    public function login()
    {
        $captcha = new Captcha();
        $admin = new AdminModel();
        if (request()->isPost()) {
            $data = input('post.');
            if (!$captcha->check($data['verifyCode'])) {
                // 校验失败
                return json_encode(['code' => 201, 'message' => '验证码不正确']);
            } else {
                // 验证码正确
                $res = $admin->where(['username' => $data['username']])->find();
                if ($res) {
                    if ($res['password'] == md5($data['password'])) {
                        if ($res['status']) {
                            session('id', $res['id']);
                            session('username', $res['username']);
                            session('name', $res['name']);
                            $admin->where('id',$res['id'])->update(['lastLoginTime'=>date('Y-m-d H:i:s',time()),'lastLoginIp'=>request()->ip()]);
                            return json_encode(['code' => 200, 'message' => '登录成功']);
                        } else {
                            return json_encode(['code' => 204, 'message' => '账号已被禁用']);
                        }
                    } else {
                        return json_encode(['code' => 203, 'message' => '密码错误']);
                    }
                } else {
                    return json_encode(['code' => 202, 'message' => '用户名不存在']);
                }
            }
        }
    }
    // 退出登录
	public function logout()
	{
        session(null);
        $this->success('退出登录成功','Login/index');
	}
}
