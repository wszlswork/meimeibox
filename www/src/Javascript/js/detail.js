/**
 * Created by my on 2016/10/2.
 */
//放大镜的功能
$("#detail .left .imgbox").mousemove(function(event){
    var _left = event.pageX - $("#detail .left .imgbox").offset().left- $("#detail .left .imgbox span").height()/2;
    var _top = event.pageY - $("#detail .left .imgbox").offset().top- $("#detail .left .imgbox span").height()/2;;
    if(_left <= 0){
        _left = 0;
    }else if(_left >= 330){
        _left = 330;
    }
    if(_top <= 0){
        _top = 0;
    }else if(_top >= 330){
        _top = 330;
    }

    $("#detail .left .imgbox span").css({
        top:_top,
        left:_left
    })
    $("#detail .left .bigImg img").css({
        top: -_top*4.3,
        left: -_left*4.3
    })
})
$("#detail .left .imgbox").mouseleave(function(event){
    $("#detail .left .bigImg").hide()
    $("#detail .left .imgbox span").hide()
})
$("#detail .left .imgbox").mouseenter(function(event){
    $("#detail .left .imgbox span").show()
    $("#detail .left .bigImg").show()
})
//切换图片
$("#detail .left ul li").mouseenter(function(){
    $("#detail .left ul li").removeClass("current");
    $(this).addClass("current");
    $("#detail .left .imgbox img").attr("src",$(this).children().first().attr("src"));
    $("#detail .left .bigImg img").attr("src",$(this).children().first().attr("src"));
})
//切换套餐
$("#meal .choose").bind("click",function(){
    $("#meal .choose").removeClass("selected");
    $(this).addClass("selected");
    $("#meal .combo").removeClass("show");
    $("#meal .combo").eq($(this).index()).addClass("show")
})
//切换规格
$("#detail .right .size input").click(function(){
    $("#detail .right .size input").removeClass("btn");
    $(this).addClass("btn");
})
//count加减
$("#detail .right .count .up").click(function(){
  var count = Number($("#detail .right .count input:text").val());
    if(count >= 9){
        count =9
    }
    $("#detail .right .count input:text").val(count+1);
})
$("#detail .right .count .down").click(function(){
    var count = Number($("#detail .right .count input:text").val());
    if(count == 1){
        count =2
    }
    $("#detail .right .count input:text").val(count-1);

})
//加入购物车
$("#detail .right .btn_join").bind("click",function(){
    var value = null;
    var flag = true;
    var $_this = $(this)
    var cookie = getCookie("goods");
    var cookies = cookie.split('$');
    console.log(cookies);
    for( var i = 0 ; i<cookies.length ; i++){
        var values= cookies[i].split("&")
        console.log(values[0].split(":")[1])
        if( values[0].split(":")[1] == $("#detail .right h3").html()){
            flag = false;
        }
    }
    if( flag){
        var imgSrc = $("#detail .left .imgbox img").attr("src");
        var count =$("#detail .right .count input:text").val();
        var pName = $("#detail .right h3").html();
        var pRice = $("#detail .right .price .p_cuxiao").html();
        value = "pName:"+pName+"&imgSrc:" + imgSrc + "&pRice:" + pRice + "&count:" + count ;
        if(cookie == ""){
            value = value;
        }else{
            value = cookie+"$" + value;
        }
        setCookie("goods",value,7);
    }

});
