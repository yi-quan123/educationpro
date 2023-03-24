/**
 * 
 *  游记详情:
 * 注意点: 详情页只能通过列表点击跳转,不能直接进入!!!!
 * 
 * 重点: url携带参数(带到下一个页面)格式: url?currentPage=1&orderType=2-----------页面(首页)和页面(详情页)之间传递参数
 *      ?拼接url和参数
 *      &拼接多个参数(键值对)
 *      =拼接key value
 * 
 * 
 * 
 * 业务逻辑----游记列表跳转游记详情-------类比-同学信息跳转同学的档案
 *  游记列表id ----  类似于 身份证号码
 *  轮播图-------类似于优秀学员------优秀学员也有编号id,优秀学员的档案查询,也需要他的身份证号码refId(游记列表id)
 */


// 难点: 在详情页获取url参数------难(达到看懂的程度,***一定会用***)
// 函数封装的目的: 以后获取url参数都可以使用
// 设计思想: 通过某个key得到对应的value
//         参数:key   返回值:value
/* function getUrlVal(key) {
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
 */

// 常识问题: 中文乱码
// decodeURI 解决中文乱码(纯中文)
// decodeURIComponent 解决中文乱码(强大,解决 字符+中文)
// console.log(decodeURI(getUrlVal("name")));


$(function(){
    $.ajax({
        url:"http://kumanxuan1.f3322.net:8809/travels/detail",
        data:{
            id:getUrlVal("id")
        },
        type:"GET",
        success(res){
            // console.log(res);
            if(res.code==200){
                $(".headtext").text(res.data.title);

                console.log($("._j_load_cover"));
                $("._j_load_cover").css("background",'url('+res.data.coverUrl+')')
            }
        }
    })
})