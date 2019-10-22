/*
 * @Author: NOIC.hexinyu 
 * @Date: 2019-07-10 11:00:58 
 * @Last Modified by: NOIC.hexinyu
 * @Last Modified time: 2019-10-21 16:16:53
 */
var __init = {
    init: function () {
        // this.checkNav();
        layui.use('layer', function () {
            var layer = layui.layer;
        });

        this.checkNav();

        // 全屏代码
        $('#full').on('click', function () {
            if (__fullScreen.isFullscreenEnabled()) {
                if (__fullScreen.isFullScreen()) {
                    __fullScreen.exitFullscreen();
                } else {
                    __fullScreen.full(document.body);
                }
            } else {
                layer.msg('很抱歉，当前浏览器不支持全屏操作！');
            }
        });

        // 左侧伸缩
        $('#leftSide').on('click', function () {
            if(parseInt($('.layui-layout-admin .layui-body').css('left')) == 0){
                $('.layui-layout-admin .layui-side').css({'transform':'translate3d(0px, 0, 0)','-webkit-transform':'translate3d(0px, 0, 0)','width':'auto'});
                $('.layadmin-pagetabs, .layui-layout-admin .layui-body, .layui-layout-admin .layui-footer, .layui-layout-admin .layui-layout-left').css('left','220px');
                $(this).find('i').addClass('layui-icon-shrink-right').removeClass('layui-icon-spread-left');
            }else{
                $('.layui-side').addClass('layui-side-off');
                $('.layui-layout-admin .layui-side').css({'transform':'translate3d(-220px, 0, 0)','-webkit-transform':'translate3d(-220px, 0, 0)','width':'220px'});
                $('.layadmin-pagetabs, .layui-layout-admin .layui-body, .layui-layout-admin .layui-footer, .layui-layout-admin .layui-layout-left').css('left',0);
                $(this).find('i').addClass('layui-icon-spread-left').removeClass('layui-icon-shrink-right');
            }
        })
    },
    checkNav: function () {
        if (window.location.href.indexOf('admin/index') > -1) {
            // 首页
            $('#leftNav-1').addClass('layui-nav-itemed');
        } else if (window.location.href.indexOf('admin/admin') > -1) {
            // 用户管理-管理员管理
            $('#leftNav-2').addClass('layui-nav-itemed');
            $('#leftNav-2-1').addClass('layui-this');
        } else if (window.location.href.indexOf('/admin/role') > -1) {
            // 权限管理-角色管理
            $('#leftNav-3').addClass('layui-nav-itemed');
            $('#leftNav-3-2').addClass('layui-this');
        } else if (window.location.href.indexOf('admin/article') > -1) {
            // 内容管理-文章列表
            $('#leftNav-4').addClass('layui-nav-itemed');
            $('#leftNav-4-2').addClass('layui-this');
        } else if (window.location.href.indexOf('admin/course/') > -1) {
            // 课程管理-课程
            $('#leftNav-6').addClass('layui-nav-itemed');
            $('#leftNav-6-1').addClass('layui-this');
        } else if (window.location.href.indexOf('admin/courselist') > -1) {
            // 课程管理-课程表
            $('#leftNav-6').addClass('layui-nav-itemed');
            $('#leftNav-6-2').addClass('layui-this');
        } else if (window.location.href.indexOf('admin/teacher') > -1) {
            // 课程管理-教师列表
            $('#leftNav-6').addClass('layui-nav-itemed');
            $('#leftNav-6-3').addClass('layui-this');
        } else if (window.location.href.indexOf('admin/system') > -1) {
            // 系统管理
            $('#leftNav-5').addClass('layui-nav-itemed');
        } else if (window.location.href.indexOf('admin/order') > -1) {
            // 订单管理
            $('#leftNav-7').addClass('layui-nav-itemed');
        } else if (window.location.href.indexOf('admin/sms') > -1) {
            // 推广管理-短信推广
            $('#leftNav-8').addClass('layui-nav-itemed');
            $('#leftNav-8-1').addClass('layui-this');
        }
    }
}
var __tree = {
    // 获取栏目列表
    getCatelist: function () {
        var $data = null;
        $.ajax({
            type: 'POST',
            url: '/admin/cate/ajaxcate',
            data: {},
            dataType: 'json',
            async: false,
            success: function (res) {
                $data = JSON.parse(res);
            }
        });
        return $data;
    },
    // 递归遍历无限极栏目
    cateTree: function (data, pid) {
        var result = [], temp;
        for (var i = 0; i < data.length; i++) {
            if (data[i].pid == pid) {
                var obj = { "title": data[i].catename, "id": data[i].id };
                temp = __tree.cateTree(data, data[i].id);
                if (temp.length > 0) {
                    obj.children = temp;
                }
                result.push(obj);
            }
        }
        return result;
    }
}
var __treeCourse = {
    // 获取课程列表
    getCourseList: function () {
        var $data = null;
        $.ajax({
            type: 'POST',
            url: '/admin/course/ajaxcourse',
            data: {},
            dataType: 'json',
            async: false,
            success: function (res) {
                $data = JSON.parse(res);
            }
        });
        return $data;
    },
    // 递归遍历无限极栏目
    cateTree: function (data, pid) {
        var result = [], temp;
        for (var i = 0; i < data.length; i++) {
            if (data[i].pid == pid) {
                var obj = { "title": data[i].name, "id": data[i].id };
                temp = __treeCourse.cateTree(data, data[i].id);
                if (temp.length > 0) {
                    obj.children = temp;
                }
                result.push(obj);
            }
        }
        return result;
    }
}
var __cookies = {
    /*
    ** setCookie("name","hayden");
    ** getCookie("name");
    ** delCookie("name");
    */
    // 设置cookie
    setCookie: function (name, value) {
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    },
    // 获取cookie
    getCookie: function (name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    },
    // 删除cookie
    delCookie: function (name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = this.getCookie(name);
        if (cval != null) {
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
        }
    }
}
var __fullScreen = {
    // 全屏
    full: function (ele) {
        if (ele.requestFullscreen) {
            ele.requestFullscreen();
        } else if (ele.mozRequestFullScreen) {
            ele.mozRequestFullScreen();
        } else if (ele.webkitRequestFullscreen) {
            ele.webkitRequestFullscreen();
        } else if (ele.msRequestFullscreen) {
            ele.msRequestFullscreen();
        }
    },
    // 退出全屏
    exitFullscreen: function () {
        if (document.exitFullScreen) {
            document.exitFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    },
    // 判断当前是否全屏
    isFullScreen: function () {
        return (
            document.fullscreenElement ||
            document.msFullscreenElement ||
            document.mozFullScreenElement ||
            document.webkitFullscreenElement || false
        );
    },
    // 判断当前浏览器是否支持全屏
    isFullscreenEnabled: function () {
        return (
            document.fullscreenEnabled ||
            document.mozFullScreenEnabled ||
            document.webkitFullscreenEnabled ||
            document.msFullscreenEnabled || false
        );
    }
}
var __upload = {

    // 上传图片
    uploadImg: function (e, inputId, imgId) {
        var animateimg = $(inputId).val(); //获取上传的图片名带//
        var imgarr = animateimg.split('\\'); //分割
        var myimg = imgarr[imgarr.length - 1]; //去掉 // 获取图片名
        var houzui = myimg.lastIndexOf('.'); //获取 . 出现的位置
        var ext = myimg.substring(houzui, myimg.length).toUpperCase();  //切割 . 获取文件后缀
        var file = $(inputId).get(0).files[0]; //获取上传的文件
        var fileSize = file.size;           //获取上传的文件大小
        var maxSize = 2097152;              //最大2MB

        var imgBox = e.target;
        uploadImg($(imgId), imgBox);

        function uploadImg(element, tag) {
            // 判断图片类型
            if (ext != '.PNG' && ext != '.GIF' && ext != '.JPG' && ext != '.JPEG' && ext != '.BMP') {
                layer.msg('文件类型错误,请上传图片类型', function () {
                    $(inputId).val('');
                });
                return false;
            } else if (parseInt(fileSize) >= parseInt(maxSize)) {
                // 判断图片大小
                layer.msg('上传的图片不能超过2MB', function () {
                    $(inputId).val('');
                });
                return false;
            }
            // 上传图片预览
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                imgSrc = this.result;
                element.show().find('img').attr("src", this.result);
            };
        }
    }
}
$(function () {
    __init.init();
});