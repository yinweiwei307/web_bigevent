// 每次掉用$get(),$post(),$.ajax()之前
// 都要先调用 $.ajaxPrefilte这个函数
// 在这个函数中我们会拿到ajax给我们的配置对象
$.ajaxPrefilter(function(options) {
    console.log(options.url);
    // options.url = "http://ajax.frontend.itheima.net" + options.url;
    // console.log(options.url);
})