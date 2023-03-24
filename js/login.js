/**
 * 登录功能
 * 
 */

$(function () {
    //  1. 绑定事件
    $("#_js_loginBtn").click(function () {
        //  console.log(this);
        // 2.获取输入框的值
        var user = $("input[name='username']").val().trim();
        var psd = $("input[name='password']").val().trim();
        // console.log(user,psd);
        // 3. 非空校验
        if (user && psd) {
            $.ajax({
                url:"http://kumanxuan1.f3322.net:8809/users/login",
                type:"POST",
                data:{
                    username:user,
                    password:psd
                },
                success(res){
                    // console.log(res);
                    // 4. 响应处理
                    if(res.code==200){
                        alert("欢迎亲人回家!!!");
                        location.href = "./index.html";
                        // 5. 重点: 登录认证
                        /*
                            有驾照  不会开车-----不道德
                            没有驾照  会开车-----违法
                        
                            开车--------账号密码--------会不会登录
                            驾照--------token(登录凭证,关联权限的问题)----------有照登录


                            有token意味着此时处于登录状态-------后台验证状态
                            token有时效性--------会有失效时间
                        */
                        /*
                            真 重点: 本地存储------同源域名都可以访问(本项目任何页面都可以访问)
                                从 对象 有三个常用的方法: 
                                ---------- 永久存储 除非主动删除
                                    setItem("key","value")   设置
                                    getItem("key")           获取
                                    removeItem("key")        删除

                                sessionStorage 对象 语法同上 
                                ---------- 临时会话 关闭浏览器将不再存在
                        */ 
                        
                       localStorage.setItem("token",res.data.token);
                        

                    }else{
                        alert(res.msg);
                        $("input[name='username']").val("");
                        $("input[name='password']").val("");
                    }
                }
            })
        }else{
            // 页面文本信息-----专业的文案(运营)
            alert("宝贝,用户名和密码不能为空!!!");
        }
    })
})