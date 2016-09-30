/**
 * Created by my on 2016/9/28.
 */
//滚动条滚动
$(window).scroll(function(){
    var _top = 75 + $(window).scrollTop();
    $("#sidebar .tag").css("top",130+$(window).scrollTop());
    $("#ad").css("top",_top)
})
//菜单中className含有more鼠标移上显示
$("#menu ul .more").bind("mouseenter",function(){
    $(this).children().last().slideDown(0.2*1000)
})
$("#menu ul .more").bind("mouseleave",function(){
    //alert(1)
    $(this).children().last().slideUp("fast")
})
//设置sidebar的高度
$("#sidebar").css("height",$(document).height());
