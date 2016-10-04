/**
 * Created by my on 2016/9/28.
 */
//滚动条滚动
$(window).scroll(function(){
    //获取滚动条的高度值
    var _top = 75 + $(window).scrollTop();
    $("#sidebar .tag").css("top",130+$(window).scrollTop());
    $("#ad").css("top",_top)
})
//菜单中className含有more鼠标移上显示
$("#menu ul .more").bind("mouseenter",function(){
    $(this).children().stop().last().slideDown(0.2*1000)
})
$("#menu ul .more").bind("mouseleave",function(){
    //alert(1)
    $(this).children().last().slideUp("fast")
})
//设置sidebar的高度
$("#sidebar").css("height",$(document).height());
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
    "韩束",
    "兰芝",
    "兰蔻",
    "超特价",
    "兰蔻",
    "Scala",
    "Scheme"
];

$( "#tags" ).autocomplete({
    source: availableTags
});
