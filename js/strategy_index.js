/**
 * 攻略列表
 * 
 * 1. 主题列表
 */


 $(function(){
     $.ajax({
         url:"http://kumanxuan1.f3322.net:8809/strategies/themes",
         success(res){
            console.log(res);
            if(res.code==200){
                // console.log();
                $("._j_tag:not(:eq(0))").remove();
                res.data.forEach(function(item,index){
                    $(".filter-tag").append(`
                    <li tid="${item.id}" class="_j_tag"><a href="javascript:;">.${item.name}</a></li>
                    `)
                })
            }
         }
     })

     $(".filter-tag").on("click","._j_tag",function(){
         console.log($(this).attr("tid"));
     })

 })