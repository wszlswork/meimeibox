/**
 * Created by my on 2016/9/28.
 */
//滚动条滚动
$(window).scroll(function(){
    $("#sidebar").css("height",$(document).height());
    var _top = 75 + $(window).scrollTop();
    $("#sidebar #tocart").css("top",130+$(window).scrollTop());
      $("#personCenter").css("top",300+$(window).scrollTop());
    $("#ad").css("top",_top);
});
//菜单中className含有more鼠标移上显示
$("#menu ul .more").bind("mouseenter",function(){
    $(this).children().stop().last().slideDown(0.2*1000);
});
$("#menu ul .more").bind("mouseleave",function(){
    //alert(1)
    $(this).children().last().slideUp("fast");
});
//设置sidebar的高度
$("#sidebar").css("height",$(document).height());
//设置sidebar的事件
$("#sidebar #personCenter ul li").bind("mouseenter",function(){
    $(this).children().show();
    $(this).children().animate({
        left: -100
    },1.5*1000);
});
$("#sidebar #personCenter ul li").bind("mouseleave",function(){
    $(this).children().hide();
    $(this).children().animate({
        left: -200
    },1.5*1000);
});

//搜索框的数据
var availableTags = [
    "鱼子精华",
    "PONY",
    "雪花秀",
    "礼盒",
    "眼影",
    "保湿++",
    "悦诗风铃",
    "面膜",
    "补水",
    "BB",
    "礼盒",
    "眼影",
    "保湿",
    "睫毛膏",
    "韩国人气品牌",
    "韩国化妆品牌",
    "韩束",
    "兰芝",
    "兰蔻",
    "超特价",
    "兰蔻",
    "购物车",
    "首页",
    "水密码洗面奶"
];

$( "#tags" ).autocomplete({
    source: availableTags
});
//搜索功能中的回车
$("#tags").bind("keydown",function(eve){
    eve = eve || event;
    if(eve.which == 13 && $(this).val()=="韩国化妆品牌"){
        window.open("../html/list.html","_self");
        //alert(1)
    }if(eve.which == 13 && $(this).val()=="购物车"){
        window.open("../html/cart.html","_self");
        //alert(1)
    }if(eve.which == 13 && $(this).val()=="首页"){
        window.open("../index.html","_self");
    }if(eve.which == 13 && $(this).val()=="水密码洗面奶"){
        window.open("../html/detail.html","_self");
    }
});
//
$("#search .btnsearch").bind("click",function(){
    if( $("#tags").val()=="首页"){
        window.open("../index.html","_self");
    }else if($("#tags").val()=="韩国化妆品牌"){
        window.open("../html/list.html","_self");
    }else if($("#tags").val()=="购物车"){
        window.open("../html/cart.html","_self");
    }else if($("#tags").val()=="首页"){
        window.open("../index.html","_self");
    }else if($("#tags").val()=="水密码洗面奶"){
        window.open("../html/detail.html","_self");
    }
});