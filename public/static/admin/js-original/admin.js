/*
 * @Author: NOIC.hexinyu 
 * @Date: 2019-07-10 11:00:58 
 * @Last Modified by: NOIC.hexinyu
 * @Last Modified time: 2019-10-21 16:44:18
 */
const __admin = {
    init() {
        this.getList();
    },
    getList() {
        // 获取列表
        layui.use(['table', 'layer'], function(){
            let layer = layui.layer,
            table = layui.table,
            $adminRes = null,
            $adminList = [];
            $.ajax({
                type: 'POST',
                url: '/admin/admin/listView',
                data: {},
                dataType:'json',
                async: false,
                success: function(res){
                    $adminRes = JSON.parse(res);
                    console.log($adminRes);
                }
            });
            for(let i = 0; i < $adminRes.length; i++) {
                $adminList.push({
                    'id':$adminRes[i]['id'],
                    'name':$adminRes[i]['name'],
                    'username':$adminRes[i]['username'],
                    'role':$adminRes[i]['role'],
                    'status':$adminRes[i]['status'],
                    'lastLoginTime':$adminRes[i]['lastLoginTime'],
                    'lastLoginIp':$adminRes[i]['lastLoginIp'],
                    'caozuo':'<a href="/admin/admin/edit?id='+$adminRes[i]['id']+'" class="layui-btn layui-btn-sm">编辑</a><a href="/admin/admin/del?id='+$adminRes[i]['id']+'" class="layui-btn layui-btn-danger layui-btn-sm">删除</a>'
                });
            }
            table.render({
                elem: '#list',
                data: $adminList,
                cols: [[
                    {type:'checkbox'},
                    {field:'id', width:50, title: 'ID', sort: true, align: 'center'},
                    {field:'name', title: '姓名'},
                    {field:'username', title: '账号'},
                    {field:'role', title: '角色'},
                    {field:'status', title: '状态'},
                    {field:'lastLoginTime', width:180, align: 'center', title: '最后登录时间'},
                    {field:'lastLoginIp', width:150, align: 'center', title: '最后登录IP'},
                    {field:'caozuo', title: '操作', align: 'center', width:150}
                ]],
                page: true
            });
        });
    }
}
function __del() {
    // 删除管理员
    let _this = $(this);
    layui.use(['layer', 'form'], function () {
        layer.confirm('确认要删除吗？', {
            btn: ['确定', '取消']//按钮
        }, function (index) {
            // 确认删除
            $.ajax({
                type: 'POST',
                url: '/admin/admin/del',
                data: { 'uid': _this.attr('uid') },
                dataType: 'json',
                success: function (res) {
                    let $res = JSON.parse(res);
                    if ($res['code']) {
                        layer.msg($res['message'], { icon: 6, time: 500 }, function () {
                            window.location.href = '/admin/admin/';
                        });
                    } else {
                        layer.msg('删除失败', { icon: 5, time: 500 });
                    }

                },
                error: function (err) {
                    layer.msg('删除失败', { icon: 5, time: 500 });
                    console.log(err);
                }
            });
            layer.close(index);
        });
    });
}
// 删除图片
function __delImg(){
    let formData = new FormData($('#addAdminForm')[0]);
    $.ajax({
        url: '/admin/admin/delimg',
        type: 'post',
        async: true,
        data: formData,
        contentType: false,
        processData: false,
    }).done(function(res){
        let $res = JSON.parse(res);
        $("#thumb").val('');
        $('#thumbImg').hide().find('img').attr('src', '');
        layer.msg($res['message'], {icon:6}, function(){});
    });
}
$(function () {
    __admin.init();
});