// 每次掉用$get(),$post(),$.ajax()之前
// 都要先调用 $.ajaxPrefilte这个函数
// 在这个函数中我们会拿到ajax给我们的配置对象
$.ajaxPrefilter(function(options) {
    // console.log(options.url);
    options.url = "http://api-breakingnews-web.itheima.net" + options.url;
    // console.log(options.url);
    if (options.url.indexOf("/my") !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    options.complete = function(res) {
        // console.log(res);
        // 在complete回调函数中，res.responseJSON可以得到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            // 强行清除token
            localStorage.removeItem('token');
            // 强制跳转到登陆页面
            location.href = "/login.html"
        }
    }
})