/**
 * 项目很难-----每一行代码都写过   没办法把中文(注释,思路)转换成代码
 * 内容太多不会写-----------分治思维  (把代码看成一段段)
 * 
 * 
 * 注册功能:
 * 1. 检查手机号码是否已经注册
 * 2. 注册功能
 */


$(function () {
    var phoneNum=null;
    // 1. 检查手机号码是否已经注册
    $("#_js_checkBtn").click(function () {
        //  console.log(this);
        // 1.1  获取用户输入的手机号码
         phoneNum = $("#phoneNum").val().trim();
        // console.log(phoneNum);
        // 1.2 表单校验(原则上要用正则表达式,js高级讲)
        if (phoneNum) {
            $.ajax({
                url: "http://kumanxuan1.f3322.net:8809/users/checkPhone",
                type: "GET",
                data: {
                    phone: phoneNum
                },
                success(res) {
                    console.log(res);
                    // 1.3 响应处理
                    if (res.data) {
                        // 没注册-----弹出表单
                        $("#_j_login_box").hide().siblings().show();
                    } else {
                        // 已经注册
                        alert("宝贝,你直接登录吧!!!");
                        location.href = "./login.html"; // 相对html
                    }
                }
            })
        } else {
            alert("臭宝,你手机号输入没有呢!!!");
        }
    })

    // 2. 注册功能
    $("#registBtn").click(function (e) {
        // 2.1阻止事件的默认行为
        e.preventDefault();
        // console.log(this);
        // 2.2 获取用户输入的值(昵称 密码 验证码)
        var nickname = $('input[name="nickname"]').val().trim();
        var password = $('input[name="password"]').val().trim();
        var rpassword = $('input[name="rpassword"]').val().trim();
        var verifyCode = $('input[name="verifyCode"]').val().trim();
        console.log(phoneNum,nickname, password, rpassword, verifyCode);
        // 2.3 表单校验
        if (nickname && password && rpassword && verifyCode) {
            // 两次密码一致
            if(password==rpassword){
                // console.log("正常的业务逻辑");
                // 2.4 真..注册功能
                // 常识问题: get携带参数,放在url上,post放在请求体------原则上**只有post才有请求体**
                $.ajax({
                    url:"http://kumanxuan1.f3322.net:8809/users/regist",
                    type:"POST",
                    data:{
                        phone:phoneNum,
                        nickname:nickname,
                        password:password,
                        rpassword:rpassword,
                        verifyCode:verifyCode
                    },
                    success(res){
                        // console.log(res);
                        // 2.5 响应处理
                        if(res.code==200){
                            location.href = "./login.html";
                        }
                        alert(res.msg);
                    }
                })
            }else{
                // 弹框 是 交互体验
                alert("两次输入密码不一致");
            }
        }else{
            alert("输入框不允许为空!!!");
        }
    })
})