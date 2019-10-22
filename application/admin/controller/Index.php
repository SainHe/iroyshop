<?php

namespace app\admin\controller;

use app\admin\controller\Common;
use think\Request;
use think\facade\Env;
class Index extends Common
{
    public function index()
    {
        return view();
    }
    public function uploadImg()
    {
        $file = request()->file('file');
        $path = Env::get('root_path') . '/public/static/uploads/tinymce/';
        if($file){
            $info = $file->move($path);
            if($info){
                $url = $path.$info->getSaveName();// 成功上传后 获取上传信息
                $location = $info->getSaveName();
            }else{
                //$error = $file->getError();
            }
            $url = str_replace('\\','/',$url);//把url的\换成/
            return json(['uploaded'=>true,'location'=>$location]);
        }else{
            return json(['uploaded'=>false,'massage'=>'上传失败']);
        }
    }
}
