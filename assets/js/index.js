// 先写个入口函数
$(function() {
        var layer = layui.layer;
        getUserInfo()
            // 点击按钮 实现退出功能
        $('#btnlogout').on('click', function() {
            console.log('ok');
            layer.confirm('确定退出码？', { icon: 3, title: '提示' }, function(index) {
                //do something
                // 清空本地存储中的token
                localStorage.removeItem('token');
                // 跳转到登录页面
                location.href = "/login.html"
                    // 关闭弹出层
                layer.close(index);
            });
        })
    })
    //获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')

            }
            // 调用renderAvatar用户的头像
            renderAvatar(res.data)
        },
        // 不论成功还是失败 最终都会调用complete回调函数
        complete: function(res) {
            // console.log(res);
            // 在complete回调函数中，res.responseJSON可以得到服务器响应回来的数据
            if (res.responseJSON === 1 && res.responseJSON.message === "身份认证失败！") {
                // 强行清除token
                localStorage.removeItem('token');
                // 强制跳转到登陆页面
                location.href = "/login.html"
            }
        }
    });
}
// 渲染用户的头像
function renderAvatar(user) {
    // 获取用户的名称
    var name = user.nickname || user.username
        // 设置欢迎文本
        // console.log(name);

    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        // 按需渲染用户的头像
    if (user.user_pic !== null) {
        // 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();

    }
}