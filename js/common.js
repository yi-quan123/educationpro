/**
 * 公共js文件
 * --------------所有文件都有可能使用
 */

function getUrlVal(key) {
    var h = location.href;
    // 1. 判断 有没有参数 (基础day06)
    // h.indexOf("?")===-1 没有问号
    if (h.indexOf("?") !== -1) {
        // 2. 获取?后面的参数集合
        var vals = h.split("?")[1];
        // console.log(vals);
        // 3. 多个参数的切割
        var valTrue = vals.split("&");
        // console.log(valTrue);
        for (var i = 0; i < valTrue.length; i++) {
            // 4. key 和 value 的切割
            var pair = valTrue[i].split("=");
            // console.log(pair);
            // 5. 判断 key 是否对应
            if(pair[0]===key){
                return pair[1];
            }
        }
    } else {
        // 不是业务逻辑,怕你是写错 羞辱
        alert("宝贝,你啥也不是!!!");
    }
    // return value;
}

// 重点: 每个页面都要验证登录状态------后台验证
$(function(){
    // 1. 获取token
    var _token = localStorage.getItem("token");
    // console.log(_token);
    // 2. 判断 有没有 _token
    if(_token){
        // 3. 登录认证-----发送ajax
        $.ajax({
            url:"http://kumanxuan1.f3322.net:8809/users/currentUser",
            // headers    设置请求头    h小写   有s
            headers:{
                "x-authorization":_token
            },
            success(res){
                // console.log(res);
                if(res.code == 200){
                    // console.log("此时是登录状态");
                    $(".login-out").html("<span class='login-out-btn'>退出登录</span>");
                }else{
                    // 有可能token失效
                    localStorage.removeItem("token");
                }
            }
        })
    }

    // 4. 退出登录
    $(".login-out").on("click",".login-out-btn",function(){
        // console.log(this);
        localStorage.removeItem("token");
        location.reload();
    })

})



/**
 * 评论流程:
 * 1. 渲染评论列表-----封装函数
 * 2. 发表评论(类似微博发布)-------请求头和请求体
 * 3. 再次调用渲染评论列表的函数
 */