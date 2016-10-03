/**
 * Created by my on 2016/10/1.
 */
//main事件
$("#main  .left ul li:not('#finally')").bind("mouseenter",function(){
    var currentIndex = $(this).index();
    $("#main .right ul li").eq(currentIndex).fadeTo("fast",0.3)
})
$("#main  .left ul li:not('#finally')").bind("mouseleave",function(){
    var currentIndex = $(this).index();
    $("#main .right ul li").eq(currentIndex).fadeTo("fast",1)
})
$("#main  .right ul li").bind("mouseenter",function(){
    var currentIndex = $(this).index();
    $("#main .left ul li a").eq(currentIndex).css("color","red")
})
$("#main .right ul li").bind("mouseleave",function(){
    var currentIndex = $(this).index();
    $("#main .left ul li a").eq(currentIndex).css("color","black")
})
//page Right last 改变当前页
$("#main .right .last li").bind("click",function(){
    //alert(1)
    $("#main .right .last li").removeClass("current");
    $(this).addClass("current");
    $("#main  .left ul").slideUp("slow",function(){
        $("#main  .left ul").slideDown("slow")
    })
    $("#main  .right .currentUl").stop().fadeOut("slow",function(){
        $("#main  .right .currentUl").fadeIn(3*1000)
    })
})
    $(".list ul li").bind("mouseover",function(){
        //alert(1)
        $(this).css("border-color","red")
    })
    $(".list ul li").bind("mouseleave",function(){
        //alert(1)
        $(this).css("border-color","#ffffff")
    })
    //page 换页
    $(".page ul li").bind("click",function(){
        $(".list ul").stop().fadeOut("fast",function(){
            $(".list ul").fadeIn(2*1000)
        })
        $(".page ul li").removeClass("current")
        $(this).addClass("current")
    })
//$(function(){
//    var currentUl = 0;
//    showMainRightUl(currentUl);
//    $("#main .right ")
//
//})
//function showMainRightUl(currentUl){
//    $("#main .right ul").eq(currentUl).fadeOut()
//}