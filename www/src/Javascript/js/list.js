/**
 * Created by my on 2016/10/1.
 */
var mainUlIndex = 0;
getUlJson(mainUlIndex);
function getUlJson(mainUlIndex){
    $.getJSON("../Javascript/js/ulList.json",function(json){
        creatUlList(mainUlIndex,json);
    });
}
function creatUlList(mainUlIndex,json){
    for(var i = 0 ; i<16 ; i++) {
        var currentIndex = mainUlIndex * 16  + i;
        //console.log(currentIndex);
        var $leftLi = $("<li><a href='#' >"+json[currentIndex].kind+"</a></li>");
        $("#main .left ul").append($leftLi);
        var $rightLi = $("<li><img src='"+ json[currentIndex].imgSrc+"'/><a href='#'>"+json[currentIndex].kind+"</a></li>");
        $("#main .rightUl .currentUl").append($rightLi);
    }
}
//page Right last 改变当前页
$("#main .right .last li").bind("click",function(){
    //alert(1)
    var currentULIndex = $(this).index()-1;
    //alert(currentULIndex)
    $("#main .right .last li").removeClass("current");
    $(this).addClass("current");
    $("#main  .left ul li").hide();
    $("#main  .right .currentUl li").hide();
    getUlJson(currentULIndex);
});
//main事件;
$("#main  .left ul li").live("mouseenter",function(){
    var currentIndex = $(this).index();
    $("#main .right ul li").eq(currentIndex).fadeTo("fast",0.3);
});
$("#main  .left ul li").live("mouseleave",function(){
    var currentIndex = $(this).index();
    $("#main .right ul li").eq(currentIndex).fadeTo("fast",1);
});
$("#main  .right ul li").live("mouseenter",function(){
    var currentIndex = $(this).index();
    $("#main .left ul li a").eq(currentIndex).css("color","red");
});
$("#main .right ul li").live("mouseleave",function(){
    var currentIndex = $(this).index();
    $("#main .left ul li a").eq(currentIndex).css("color","black");
});

$(".list ul li").live("mouseover",function(){
    $(this).css("border-color","red");
});
$(".list ul li").live("mouseleave",function(){
        $(this).css("border-color","#ffffff");
    });
//获取加入json数据;
var index = 0;
getListJson(index);
function getListJson(index){
    $.getJSON("../Javascript/js/list.json",function(json){
        creatList(index,json);
    });
}

function creatList(index,json){
    for(var i = 0 ; i < 4;i++){
        var $div = $("<div class='list'></div>");
        $("#main").after($div);
        var $ul = $("<ul></ul>");
        $($div).append($ul);
        for(var j = 0 ;j<3  ; j++) {
            var currentIndex = index * 12 + 3 * i + j;
            //console.log(currentIndex)
            $li = $("<li></li>");
            $ul.append($li);
            var $imgLis = $("<img src='' class='lis'/>");
            $imgLis.attr("src", json[currentIndex].imgSrc);
            $li.append($imgLis);
            var $pBlank = $("<p class='blank'></p>");
            $li.append($pBlank);
            var $h4 = $("<h4></h4>");
            $h4.html(json[currentIndex].h4);
            $li.append($h4);
            var $h3 = $("<h3></h3>");
            $h3.html(json[currentIndex].h3);
            $li.append($h3);
            $context = $("<span><img src='" + json[currentIndex].spanImg + "'/>" + json[currentIndex].spanImgHTML + "</span>");
            $li.append($context);
            var $del = $("<h4><del>" + json[currentIndex].h4del + "</del></h4>");
            $li.append($del);
            var $super = $("<h3 class='super'>"+json[currentIndex].super+"</h3>");
            $li.append($super);
            var $btn = $("<button>加入购物车</button>");
            $li.append($btn);
        }
    }
}
//page 换页
$(".page ul li").bind("click",function(){
    $index = $(this).index();
    $(".list").hide();
    getListJson($index);
    $(".page ul li").removeClass("current");
    $(this).addClass("current");
});
//加入购物车
$(".list ul li button").live("click",function(){
    var flag = true;
    var value = null;
    var $_this = $(this);
    var cookie = getCookie("goods");
    var cookies = cookie.split('$');
    //console.log(cookies);
    for (var i = 0; i < cookies.length; i++) {
        var values = cookies[i].split("&");
        console.log(values[0].split(":")[1]);
        if (values[0].split(":")[1] == $_this.parent().children().eq(3).html()) {
            flag = false;
        }
    }
    if (flag) {
        var pName = $_this.parent().children().eq(3).html();
        var imgSrc = $_this.parent().children().eq(0).attr("src");
        var pRice = $_this.parent().children().eq(6).html();
        var count = 1;
        value = "pName:" + pName + "&imgSrc:" + imgSrc + "&pRice:" + pRice + "&count:" + count;
        if (!cookie) {
            value = value;
        } else {
            value = cookie + "$" + value;
            setCookie("goods", value, 7);
        }
        window.open("cart.html");
    }
});
//移到侧边购物车事件;
$("#sidebar #tocart").bind("mouseenter",function(){
    $(this).children().attr("src","../images/redcart.jpg");
});
$("#sidebar #tocart").bind("mouseleave",function(){
    $(this).children().attr("src","../images/blackcart.jpg");
});
//tocart
$("#sidebar #tocart").bind("click",function(){
    window.open("cart.html");
});