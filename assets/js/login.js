$(function() {
    $('#link_reg').on('click', function() {
        $('.login_box').hide();
        $('.reg_box').show();
    })
    $('#link_login').on('click', function() {
        $('.login_box').show();
        $('.reg_box').hide();
    })


    // 从layui中获取form表单
    var form = layui.form
    var layer = layui.layer
    form.verify({
            pwd: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            repwd: function(value) {
                var psw = $('.reg_box [name=password]').val()
                if (psw !== value) {
                    return "两次密码输入不一致"
                }
            }
        })
        // 监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
        // 组织form表单的默认提交
        e.preventDefault();
        // 发起Ajax的post请求
        $.post('/api/reguser', {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()

            },
            function(res) {
                if (res.status !== 0) {
                    // return console.log(res.message);
                    return layer.msg(res.message);
                }
                // console.log('注册成功！');
                layer.msg('大声喊出:"肖战好帅！！！"，就可以注册成功啦！')
                    // 模拟人的点击事件
                $('#link_login').click()
            })
    })
    $('#form_login').submit(function(e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    // console.log(res.status);
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                    // 将成功得到的token字符串 保存localStorage中
                localStorage.setItem('token', res.token);
                // console.log(res.token);
                // 跳转到后台主页
                location.href = "/index.html"
            }
        })
    })
})