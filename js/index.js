/**
 * 项目阶段重点: ****搞懂每一行代码的意思,为什么写在这一行***--------------套用思维
 * 做的最多的事情:将静态 死数据 变成后台数据库的 活数据
 * 
 * 首页模块
 * 功能一: 轮播图功能(活数据替换死数据)
 *  1. 发送ajax,获取后台数据库数据
 *  2. 响应处理
 *  3. DOM操作(先清再加)
 *  4. tab切换
 *  5. 自动轮播(拓展)
 */

$(function () {
    // 1. 发送ajax,获取后台数据库数据
    $.ajax({
        url: "http://kumanxuan1.f3322.net:8809/index/banners/travel", // 首页-游记推荐
        type: "GET",
        success: function (res) {
            // console.log(res);
            // 2. 响应处理
            if (res.code == 200) {
                // 3. DOM操作(先清再加)
                $("ul.show-image").empty();
                $("ul.show-nav").empty();
                res.data.forEach(function (item, index) {
                    // console.log(item,index);
                    // 子元素添加
                    $("ul.show-image").append(`
                    <li data-id="0" class="show_image first" style="">
                        <a href="./traveldetail.html?id=${item.refId}&name=张三" class="show-pic">
                            <img src="${item.coverUrl}">
                        </a>
                        <a href="javascript:void(0);" class="show-title dark">
                            <div class="date">
                                <span class="day">15</span>
                                /Oct.2020
                            </div>
                            <h3>${item.title}</h3>
                        </a>
                    </li>`)
                    // 4.1 事件绑定
                    $("ul.show-nav").append(`
                    <li class="show_nav" onclick="checkImg(${index})">
                        <a href="javascript:">
                            <img src="${item.coverUrl}" height="62" width="110">
                            <span></span>
                        </a>
                    </li>
                    `)
                })
                // 4.3 dom操作做完,模拟点击第0张
                checkImg(0);
            }
        }
    })
})

// 4. tab切换
function checkImg(i) {
    // 5.3 点击开始清除定时器
    clearInterval(timer);
    // 4.2 索引的获取
    // console.log(i);
    $("li.show_nav").eq(i).addClass("active").siblings().removeClass("active");
    $("li.show_image").eq(i).fadeIn().siblings().hide();
    // 5.4 点击最后开启定时器
    autoplayFn(i);
}


// 5. 自动轮播(拓展)
var timer = null;
// 5.1 定时器 3s之后模拟点击下一张
function autoplayFn(n) {
    var num = n;
    timer = setInterval(function () {
        // num++;
        // 5.2 需要边界判断------num 0~4
        // if(num>=$("li.show_nav").length-1){
        //     num = 0;
        // }else{
        //     num++;
        // }

        /*
            1 % 5 = 1
            2 % 5 = 2
            3 % 5 = 3
            4 % 5 = 4
            5 % 5 = 0
        */
        num = ++num % $("li.show_nav").length;
        // console.log(num);
        // checkImg(num);
    }, 3000)
}



/**
 * 首页游记列表
 * 1. 发送ajax,获取后台数据库数据------旅游日记-游记列表
 * 2. 响应处理
 * 3. DOM操作(先清再加)
 * 4. tab切换-----orderType 1 最新发表 2 热门游记
 */

$(function () {
    // 1. 发送ajax
    // 已经丢到 getTravelList 函数中

    // 页面初始化
    getTravelList(1, 2);
    // 4.3 ajax 请求的 函数封装 
    function getTravelList(currentPage, orderType) {
        $.ajax({
            url: "http://kumanxuan1.f3322.net:8809/travels/query",
            // type:"GET",
            data: {
                currentPage: currentPage,
                orderType: orderType
            },
            success(res) {
                // console.log(res);
                // 2. 响应处理
                if (res.code == 200) {
                    // 3. DOM操作(先清再加)
                    $(".tn-list").empty();
                    res.data.content.forEach(function (item, index) {
                        // console.log(item,index);
                        $(".tn-list").append(`
                        <div class="tn-item clearfix">
                            <div class="tn-image">
                                <a href="javascript:void(0);" target="_blank">
                                    <img src="${item.coverUrl}" style="display: inline;">
                                </a>
                            </div>
                            <div class="tn-wrapper">
                                <dl>
                                    <dt>
                                        <a href="./traveldetail.html?id=${item.id}" target="_blank">${item.title}...</a>
                                    </dt>
                                    <dd>
                                        <a class="tn-wrapper-summary" href="./traveldetail.html?id=${item.id}" target="_blank">
                                            ${item.summary}
                                        </a>
                                    </dd>
                                </dl>
                                <div class="tn-extra">
                                    <span class="tn-ding">
                                        <a href="javascript:void(0);" data-japp="articleding" data-iid="12451790" data-vote="2157"
                                            rel="nofollow" class="btn-ding"></a>
                                        <em id="topvote12451790">${item.thumbsupnum}</em>
                                    </span> <span class="tn-place"><i></i>
                                        <a href="javascript:void(0);" rel="nofollow" class="_j_gs_item">
                                            ${item.author.city}
                                        </a>，by
                                    </span>
                                    <span class="tn-user">
                                        <a href="javascript:void(0);" target="_blank" rel="nofollow">
                                            <img src="./images/default.jpg">
                                            ${item.author.nickname}
                                        </a>
                                    </span>
                                    <span class="tn-nums"><i></i>${item.favornum}/${item.viewnum}</span>
                                </div>
                            </div>
                        </div>
                        `)
                    })
                }
            }
        })
    }

    // 4. tab切换-----orderType  2 热门游记  1 最新发表
    $("._j_gs_tab").click(function () {
        // 4.4 防止误触(重复无效点击)
        // console.log($(this).hasClass("active"));// 当前元素拥有这个类名,显示true 反之false
        if (!$(this).hasClass("active")) {
            // 4.1 按钮的排他
            $(this).addClass("active").siblings().removeClass("active");
            // 4.2 对应列表的展示
            var index = $(this).index();
            // console.log(index);
            if (index == 0) { //热门游记
                getTravelList(1, 2);
            } else { //最新发表
                getTravelList(1, 1);
            }
        }
    })

})