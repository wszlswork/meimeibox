/**
 * Created by my on 2016/9/29.
 */
//banner轮播
$(function(){
    var index = 0;
    //增加一个li
    $("#banner ul li:first-child").clone().appendTo("#banner ul")
    var timer = setInterval(show,3*1000)
    //鼠标移上停止定时器
    $("#banner ul").mouseenter(function(){
        clearInterval(timer)
    })
    //鼠标离开开启定时器
    $("#banner ul").mouseleave(function(){
        timer = setInterval(show,3*1000);
    })
    //span 鼠标移上
    $("#banner span").mouseover(function(){
        //清楚在执行的轮播图定时器
        $("#banner ul").clearQueue()
        clearInterval(timer)
        //如果index是创建的那一个恢复到第一个
        if(index == 5){
            index =0;
            $("#banner ul").css("left","0px")
        }
        //获取当前的index 轮播到index li
        index =$(this).index()
        play(index);
    })
    $("span").mouseout(function(){
        clearInterval(timer)
        timer = setInterval(show,3*1000);
    })
    //bannershubiaoy
    //show函数
    function show(){
        index++;
        if(index>5){
            $("ul").css("left","0px")
            index =1;
        }
        play(index);
    }
    //播放
    function play(index){
        //设置动画跳转的距离是li的距离乘以index
        $("#banner ul").stop().animate({left: '-'+index*$("#banner ul li:first-child").width()+'px'}, 1.5*1000);
        $("#banner span").removeClass('current');
        //如果index是创建的那一个的下表 跳到第0个li 设置样式为当前的
        if(index == 5){
            $("#banner span").eq(0).addClass('current')
            return ;
        }
        //设置鼠标移上效果
        $("#banner span").eq(index).addClass('current')
    }
})
$("#banner ol li").mouseenter(function(){
    $(this).children().show("fast");
})
$("#banner ol li").mouseleave(function(){
    $(this).children().hide()
})
