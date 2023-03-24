/**
 * 旅游日记模块(列表渲染)
 * 
 * 难点: 四个ajax参数的条件切换------------全局变量
 * 
 */



function getTravelList(currentPage, orderType, perExpendType, dayType) {
    console.log(currentPage, orderType, perExpendType, dayType);
}


$(function () {
    var currentPage=1, orderType=1, perExpendType=-1, dayType=-1
    // 初始化
    getTravelList(currentPage, orderType, perExpendType, dayType);

    // tab切换
    $(".tab-item").click(function () {
        // 判断 perExpendType,dayType
        orderType = $(this).index();
        getTravelList(currentPage, orderType, perExpendType, dayType);
    })


    // 下拉框 change 
    $('select[name="dayType"]').change(function(){
        // console.log(this);
        dayType = $(this).val();
        getTravelList(currentPage, orderType, perExpendType, dayType);
    })
})