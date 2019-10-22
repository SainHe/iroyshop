<?php
namespace app\admin\controller;
use think\Controller;
class Common extends Controller
{
	public function initialize()
	{
		if (!session('id') || !session('username')) {
			$this->error('您尚未登录系统，请登录后进行操作。', '/admin/login');
		}
		// 网站配置
		// $system = new \app\admin\model\System();
		// $systemRes = $system->getAllConf();
		// $confres = array();
		// foreach($systemRes as $k => $v){
		// 	$confres[$v['tag']] = $v['value'];
		// }
		// $this->assign('confres',$confres);
	}
}
