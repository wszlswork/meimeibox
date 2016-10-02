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