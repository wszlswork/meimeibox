/**
 * Created by my on 2016/10/3.
 */
$(function(){
    var cookie = getCookie("goods");
    //如果有商品
    if(cookie) {
        var $img = null;
        var $pname = null;
        var $price = null;
        var $count = null;
        var sum = 0;
        $("#cart").css("display","block");
        $("#empty").css("display","none");
        //切割每一个商品
        var cookies = cookie.split("$");
        //重新写入全部商品
        Whole();
        //console.log(cookies)
        for( var i = 0 ; i<cookies.length; i++ ) {
            //切割某一个商品的每一个信息
            var _values = cookies[i].split("&");
            //console.log(_values.length)
            //创建一个tr加入到table
            var $tr = $("<tr></tr>");
            $("#cart table").append($tr);
            for (var k = 0; k < _values.length; k++) {
                var _infos = _values[k].split(":");
                //获取每一个值添加到元素中
                switch (_infos[0]) {
                    case "imgSrc":
                        $img = $("<img src='" + _infos[1] + "'>");
                        break;
                    case "pName":
                        $pname = ("<p>" + _infos[1] + "</p>");
                        break;
                    case "pRice":
                        $price = _infos[1];
                        //console.log($price)
                        break;
                    case "count":
                        $count = _infos[1];
                        break;
                }
            }
            for (var n = 0; n < 5; n++) {
                //创建td
                var $td = $('<td></td>');
                $tr.append($td);
                if (n === 0) {
                    $input=("<input type='checkbox'/>");
                    $td.append($img);
                    $td.append($pname);
                    $td.append($input);
                } else if (n == 1) {
                    $td.html($price);
                } else if (n == 2) {
                    $td.html($count);
                } else if (n == 3) {
                    $td.addClass("total");
                    var total1="￥" + parseInt($price.split("￥")[1]) * parseInt($count);
                    $td.html(total1);
                }else{
                    var $btn1= $("<button id='add'>增加</button>");
                    $td.append($btn1);
                    var $btn2= $("<button id='del'>减少</button>");
                    $td.append($btn2);
                }
            }
        }
    }
    $("#allselect").attr("checked",false);
});
//增加事件
$("#add").live("click",function(){
    //var total = 0;
    //获取数量
   var $tdCount =  $(this).parent().parent().children().eq(2);
    $tdCount.html(parseInt($tdCount.html())+1);
    //获取单个间隔
    var $tdPrice = $(this).parent().parent().children().eq(3);
    var price = parseInt($tdPrice.html().split("￥")[1]);
    //获取name为重新写入cookie做准备
    var _name = $(this).parent().parent().children().eq(0).children().eq(1).html();
    //计算价格
    $tdPrice.html("￥"+(parseInt($tdCount.html()))*($(this).parent().parent().children().eq(1).html().split("￥")[1]));
    Sum();
    writeCookie( parseInt($tdCount.html()),_name);
});
$("#del").live("click",function(){
    var $this = $(this);
    //获取数量
    var $tdCount =  $(this).parent().parent().children().eq(2);
    //改变数量
    $tdCount.html(parseInt($tdCount.html())-1);
    var $tdPrice = $(this).parent().parent().children().eq(3);
    //获取单价
    var price = parseInt($tdPrice.html().split("￥")[1]);
    //计算价格
    $tdPrice.html("￥"+(parseInt($tdCount.html()))*($(this).parent().parent().children().eq(1).html().split("￥")[1]));
    if(parseInt($tdCount.html())<1){
        if(confirm("确认要删除吗?")){
            var flag = false;
            var num = null;
            $this.parent().parent().remove();
            //获取要删除的那个商品的那一条cookie
            var _name = $this.parent().parent().children().eq(0).children().eq(1).html();
            var cookie = getCookie("goods");
            var cookies = cookie.split("$");
            for( var i = 0 ; i<cookies.length; i++ ) {
                var _values = cookies[i].split("&");
                for (var j = 0; j < _values.length; j++) {
                    var _infos = _values[j].split(":");
                    if(_infos[0] == "pName"){
                        if(_name == _infos[1]){
                            flag = true;
                            num = i;
                        }
                    }
                }
            }
            var value = null;
            for(var m = 0 ; m<cookies.length; m++ ){
                if( num ) {
                    if (m === 0) {
                        value = cookies[0];
                    } else {
                        if (m != num) {
                            value += "$" + cookies[m];
                        }
                    }
                }else{
                    if( m == 1){
                        value = cookies[1];
                    }else if(m>1){
                        value += "$" + cookies[i];
                    }
                }
            }
            if(value){
                setCookie("goods",value,7);
            }else{
                removeCookie("goods");
            }

        }else{
            $tdCount.html("1");
            $tdPrice.html("￥"+(parseInt($tdCount.html()))*($(this).parent().parent().children().eq(1).html().split("￥")[1]));
        }

    }
    //获取要改变的那个商品的那一条cookie
    var _name1 = $(this).parent().parent().children().eq(0).children().eq(1).html();
    //数量改变时写入cookie
    writeCookie( parseInt($tdCount.html()),_name1);
    //改变全部商品个数
    Whole();
    Sum();
});
//复选框中的改变事件
$("#cart table td input:checkbox").live("click",function(){
    //遍历每一个
    $("#cart table td input:checkbox").each(function() {
        //如果有一个没选中全选框取消
        if(!$(this).is(":checked")){
            $("#allselect").attr("checked",false);
            return false;
        }else if($(this).is(":checked")){//如果都选中了全选勾上
            $("#allselect").attr("checked",true);
        }
    });

    Sum();
});
//全选事件
$("#allselect").live("click",function(){
    //如果选中全选框则全部选中否则全部不选计算结果
    if($("#allselect").is(":checked")){
        $("#cart table td input:checkbox").attr("checked",true);
        Sum();
    }else{
        $("#cart table td input:checkbox").attr("checked",false);
        Sum();
    }
});
//计算总和
function Sum(){
    var sum = 0;
    $("#cart table td input:checked").each(function(){
        sum += parseInt($(this).parent().parent().children().eq(3).html().split("￥")[1]);
    });
    $("#money").html("￥"+sum);
}
//数量改变时写入cookie
function writeCookie(_count,_name){
    var cookie = getCookie("goods");
    var cookies = cookie.split("$");
    var value=null;
    var flag = false;
    var pName = null;
    var pRice = null;
    var imgSrc = null;
    var count = null;
    for( var i = 0 ; i<cookies.length; i++ ) {
        var _values = cookies[i].split("&");
        flag = false;
        for (var j = 0; j < _values.length; j++) {
            var _infos = _values[j].split(":");
            //判断pName是不是要改变的那个
            if (_infos[0] == "pName"&&_infos[1] == _name) {
                flag = true;
            }
            //如果为真改变值
            if (flag ){
                switch (_infos[0]) {
                    case "imgSrc":
                        imgSrc = _infos[1] ;
                        break;
                    case "pName":
                        pName = _infos[1];
                        break;
                    case "pRice":
                        pRice = _infos[1];
                        break;
                    case "count":
                        count = _count;
                        break;
                }
                cookies[i] = "pName:"+pName+"&imgSrc:" + imgSrc + "&pRice:" + pRice + "&count:" + count ;
            }
        }
        if (i === 0) {
            value = cookies[0];
        } else{
            value += "$" + cookies[i];
        }
    }
    setCookie("goods",value,7);
}
//全部商品的个数
function Whole(){
    var cookie = getCookie("goods");
    if( cookie ){
        var cookies = cookie.split("$");
        //console.log(cookies.length)
        $("#whole").html(cookies.length);
    }else{
        $("#whole").html("0");
        window.location.reload();
    }
}
//移到侧边购物车事件
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