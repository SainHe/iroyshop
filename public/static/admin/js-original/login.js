/*
 * @Author: NOIC.hexinyu 
 * @Date: 2019-07-10 11:00:58 
 * @Last Modified by: NOIC.hexinyu
 * @Last Modified time: 2019-10-22 15:33:46
 */
const __login = {
    init() {
        layui.use(['layer', 'form'], function () {
            var layer = layui.layer;
            var form = layui.form;
            form.on('submit(form)', function (data) {
                var $data = data.field;
                if (!$data.username) {
                    $('input[name=username]').addClass('layui-form-danger').focus();
                    layer.msg('请输入用户名', function () { });
                } else if (!$data.password) {
                    $('input[name=password]').addClass('layui-form-danger').focus();
                    layer.msg('请输入密码', function () { });
                } else if (!$data.verifyCode) {
                    $('input[name=verifyCode]').addClass('layui-form-danger').focus();
                    layer.msg('请输入验证码', function () { });
                } else if ($data.verifyCode.length != 4) {
                    $('input[name=verifyCode]').addClass('layui-form-danger').focus();
                    layer.msg('验证码格式不正确', function () { });
                } else {
                    $.ajax({
                        type: 'POST',
                        url: '/admin/login/login',
                        data: $data,
                        dataType: 'json',
                        async: false,
                        success: function (res) {
                            $res = JSON.parse(res);
                            if ($res['code'] == 200) {
                                // 登录成功
                                if ($data.remember == 'on') {
                                    // 记录账号密码
                                    __cookies.setCookie('username', $data.username);
                                    __cookies.setCookie('password', $data.password);
                                }
                                layer.msg($res['message'], { icon: 6, time:500 }, function () {
                                    window.location.href = '/admin/index';
                                });
                            } else if ($res['code'] == 201) {
                                $('#verify_img').click();
                                layer.msg($res['message'], { icon: 5});
                            } else {
                                layer.msg($res['message'], { icon: 5 });
                            }
                        }
                    });
                }

                return false;
            })
            $('input[name=username]').val(__cookies.getCookie('username'));
            $('input[name=password]').val(__cookies.getCookie('password'));
        });
    },

}

$(function () {
    __login.init();
});